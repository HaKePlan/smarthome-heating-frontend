import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layout';
import Banner from '../../components/banner';

function Home({ data }) {
  return (
    <Layout>
      <Head>
        <title>heating client | Heizgruppe 1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Banner />
        <ul class="list">
          {data.map(({ name, value, unit, _id }) => (
            <li class="listItem" key={_id}>
              <a class="entry">{name}: </a>
              <a class="value">
                {value} {unit}
              </a>
            </li>
          ))}
        </ul>
        <Link href="/">
          <a class="link">back to home</a>
        </Link>
      </body>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await (
    await fetch('http://127.0.0.1:3000/api/v1/modbus/domain/Heizgruppe_1')
  ).json();
  const data = res.data.doc;

  data.map((doc) => {
    if (doc.unit === 'object') {
      doc.unit = '';
      const val = doc.value;
      doc.value = doc.signedValue[val];
    }
    return doc;
  });

  // console.log(data);

  return { props: { data } };
}

export default Home;
