import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import React, { useState } from 'react';

import Layout from '../../components/layout';
import fetcher from '../../lib/fetcher';
import swrFetch from '../../lib/fetcher';

export default function Domain() {
  const router = useRouter();
  const { id } = router.query;
  const [showMe, setShowMe] = useState(false);

  let { data, error } = swrFetch(`domain/${id}`);

  if (data) {
    data.data.data.map((doc) => {
      if (doc.unit === 'signedValue') {
        doc.unit = '';
        const val = doc.value;
        doc.value = doc.valueAssignation.assignment[val];
      }
    });
  }

  const container = () => {
    const divArr = [];

    let i = 1;
    data.data.data.forEach((element) => {
      divArr.push(
        <div>
          <div
            className="flex flex-row relative space-x-36 p-6 hover:bg-gray-50 hover:shadow-md rounded-md border border-transparent hover:border-gray-200"
            onClick={(value) => {
              toggle();
              setID(value);
            }}
            value={element._id}
          >
            <div className="flex-grow">{element.name}</div>
            <div className="flex felx-row space-x-1 relative">
              <div>{element.value}</div>
              <div>{element.unit}</div>
            </div>
          </div>
          {i === data.data.data.length ? (
            ''
          ) : (
            <div className="w-auto border-b-2 border-red-200 mx-6" />
          )}
        </div>
      );
      i++;
    });

    return divArr.map((el) => {
      return el;
    });
  };

  function setID(el) {
    console.log(el);
    console.log(el.target);
  }

  function toggle() {
    setShowMe(!showMe);
  }

  function submit() {
    console.log('monog');
    setShowMe(!showMe);
  }
  return (
    <Layout>
      <Head>
        <title>heating client | {id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-screen h-screen flex justify-center">
        <div className="flex flex-col justify-center absolute mt-24 border-2 border-red-200 rounded-md">
          {!data ? (
            <div className="w-60 h-60 flex justify-center items-center">
              <p>loading...</p>
            </div>
          ) : (
            container()
          )}
        </div>
        <div
          className="absolute h-72 w-72 bg-gray-100 bg-opacity-70"
          style={{
            display: showMe ? 'block' : 'none',
          }}
        >
          <div className="absolute bottom-0">
            <button
              className="font-bold text-red-700 bg-red-100 rounded-md h-10 w-20 hover:bg-red-300"
              onClick={toggle}
            >
              cancle
            </button>
            <button
              className="font-bold text-green-700 bg-green-100 rounded-md h-10 w-20 hover:bg-green-300"
              type="submit"
              value="submit"
              onClick={submit}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
