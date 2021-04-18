import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import Banner from '../../components/banner2';
import Layout from '../../components/layout';
import fetcher from '../../lib/fetcher';

export default function Domain() {
  const router = useRouter();
  const { id } = router.query;

  let { data, error } = useSWR(
    `http://127.0.0.1:3000/api/v1/modbus/domain/${id}`,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 5000, // 5s
    }
  );

  let element = 'Loading...';

  if (!data && error) {
    // element = `${error.statusCode} ${error.message}`;
    element = (
      <div>
        <a>{error.statusCode} nothing to see here</a>
      </div>
    );
  }

  if (data) {
    data.data.data.map((doc) => {
      if (doc.unit === 'signedValue') {
        doc.unit = '';
        const val = doc.value;
        doc.value = doc.valueAssignation.assignment[val];
      }
      return doc;
    });
  }

  return (
    <Layout>
      <Head>
        <title>heating client | {id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Banner />
        <div>
          {data ? (
            <ul>
              {data.data.data.map(({ name, value, unit, _id }) => (
                <li class="listItem" key={_id}>
                  <a>{name}: </a>
                  <a>
                    {value} {unit}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            element
          )}
        </div>
      </body>
    </Layout>
  );
}
