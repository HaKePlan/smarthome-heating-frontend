import cookie from 'js-cookie';
import Head from 'next/head';

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
        <div className="absolute h-3/4 w-screen">
          <div className="text-black absolute left-64 top-64">
            {data ? (
              <ul>
                {data.data.data.map(({ name, value, unit, _id }) => (
                  <li className="listItem" key={_id}>
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
