import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout';
import Banner from '../components/banner';
import cookie from 'js-cookie';
import useSWR from 'swr';

const authfetcher = (url, token) =>
  fetch(url, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      Bearer: token,
    },
  })
    .then((r) => {
      console.log(r);
      return r.json();
    })
    .then((data) => {
      return data;
    });

function Home() {
  const token = cookie.get('token');

  let { data, error } = useSWR(
    ['http://127.0.0.1:3000/api/v1/modbus/domain/Allgemein', token],
    authfetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 5000, // 5s
    }
  );

  if (data) {
    data.data.doc.map((doc) => {
      if (doc.unit === 'object') {
        doc.unit = '';
        const val = doc.value;
        doc.value = doc.signedValue[val];
      }
      return doc;
    });
  }

  if (data) {
    console.log(data.data);
  }

  return (
    <Layout>
      <Head>
        <title>heating client | home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Banner />
        <div class="text-black container">
          {data ? (
            <ul>
              {data.data.doc.map(({ name, value, unit, _id }) => (
                <li class="listItem" key={_id}>
                  <a>{name}: </a>
                  <a>
                    {value} {unit}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            'Loading...'
          )}
        </div>
      </body>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await (
    await fetch('http://127.0.0.1:3000/api/v1/modbus/domain/Allgemein', {
      credentials: 'same-origin',
    })
  ).json();
  const data = res.data.doc;

  // console.log(data);

  return { props: { data } };
}

export default Home;
