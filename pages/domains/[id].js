import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';

import Layout from '../../components/layout';
import swrFetch from '../../lib/fetcher';

export default function Domain() {
  const router = useRouter();
  const { id } = router.query;

  // 1) GET DATA FROM API SERVER
  let { data } = swrFetch('domain/allgemein');

  // 2) MAINIPULATE DATA TO SHOW CLEAN
  if (data) {
    data.data.data.map((doc) => {
      if (doc.unit === 'signedValue') {
        doc.showUnit = '';
        const val = doc.value;
        doc.showValue = doc.valueAssignation.assignment[val];
      } else {
        doc.showValue = doc.value;
        doc.showUnit = doc.unit;
      }
    });
  }

  // 3) SETUP CONTAINER (ALL ENTRYS)
  const container = () => {
    const divArr = [];
    let i = 1;

    // create for each entry a sub container and push it to an array
    data.data.data.forEach((element) => {
      divArr.push(
        <div>
          <div
            className="flex flex-row relative space-x-36 p-6 hover:bg-gray-50 hover:shadow-md rounded-md border border-transparent hover:border-gray-200 cursor-pointer"
            onClick={() => {
              if (element.register === 4 || element.register === 4) {
                Router.push(`../entrys/${element._id}`);
              }
            }}
          >
            <div className="flex-grow">{element.name}</div>
            <div className="flex felx-row space-x-1 relative">
              <div>{element.showValue}</div>
              <div>{element.showUnit}</div>
            </div>
          </div>
          {i === data.data.data.length ? (
            ''
          ) : (
            <div className="w-auto border-b-2 border-red-200 mx-6" />
          )}
        </div>
      );
      i += 1;
    });

    // return each sub container in array
    return divArr.map((el) => {
      return el;
    });
  };

  // 4) RENDER SITE
  return (
    <Layout>
      <Head>
        <title>heating client | {id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-screen h-screen flex justify-center">
        <div className="flex w-screen absolute mt-24 justify-center items-center">
          <div className="flex flex-col justify-center border-2 border-red-200 rounded-md">
            {data ? (
              container()
            ) : (
              <div className="w-60 h-60 flex justify-center items-center">
                <p>loading...</p>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </Layout>
  );
}
