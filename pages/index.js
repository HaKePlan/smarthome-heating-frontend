import Head from 'next/head';
import cookie from 'js-cookie';
import Layout from '../components/layout';
import swrFetch from '../lib/fetcher';

function Home() {
  // get token
  // const token = cookie.get('token');
  // console.log(token);

  let { data, error } = swrFetch('home');

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
        <title>heating client | home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <div class="absolute h-3/4 w-screen">
          <div class="text-black absolute left-64 top-64">
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
              'Loading...'
            )}
          </div>
        </div>
      </body>
    </Layout>
  );
}

export default Home;
