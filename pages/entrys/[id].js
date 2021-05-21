import axios from 'axios';
import cookie from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

import Layout from '../../components/layout';

async function submit(val, id, token) {
  await axios
    .patch(
      `http://${process.env.NEXT_PUBLIC_APIHOST}/id/${id}`,
      {
        value: Number(val),
      },
      {
        headers: {
          authorization: token,
        },
      }
    )
    .catch((err) => {
      console.log(
        `ERROR: ${err.response.status}, ${err.response.data.message}`
      );
      alert(`ERROR: ${err.response.status}, ${err.response.data.message}`);
    });
}

const options = (e) => {
  const keyName = Object.keys(e.valueAssignation.assignment);
  const opt = [];
  for (let i = 0; i < keyName.length; i += 1) {
    opt.push(
      <option value={keyName[i]} key={i}>
        {e.valueAssignation.assignment[keyName[i]]}
      </option>
    );
  }

  return opt.map((o) => {
    return o;
  });
};

function Entry({ ent, from }) {
  const [value, setValue] = useState(ent.value);
  const token = cookie.get('token');

  const postEntry = () => {
    return (
      <div className="absolute border-2 border-red-500 rounded-md  bg-gray-50 shadow-2xl bg-gray-50">
        <div className="absolute p-2">
          <Link href={`/domains/${from}`}>
            <div className="cursor-pointer">
              <img src="/arrow_back.svg" />
            </div>
          </Link>
        </div>
        <div className="flex-col flex space-y-5 p-8">
          <div className="flex flex-row relative space-x-36 p-6 font-semibold">
            <div className="flex-grow">{ent.name}</div>
            <div className="flex felx-row space-x-1 relative">
              <select
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              >
                {options(ent)}
              </select>
            </div>
          </div>
          <div className="w-auto border-b-2 border-red-500" />
          <div className="bottom-0 flex flex-row justify-center space-x-10">
            <Link href={`/domains/${from}`}>
              <button className="font-bold text-red-700 bg-red-100 rounded-md h-10 w-20 hover:bg-red-300 flex-grow">
                cancle
              </button>
            </Link>
            <Link href={`/domains/${from}`}>
              <button
                className="font-bold text-green-700 bg-green-100 rounded-md h-10 w-20 hover:bg-green-300 flex-grow"
                type="submit"
                onClick={() => {
                  submit(value, ent._id, token);
                }}
              >
                submit
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const permDenied = () => {
    return (
      <div className="absolute border-2 border-red-500 rounded-md p-8  bg-gray-50 shadow-2xl w-96 h-72 flex-col flex space-y-5 bg-gray-50">
        <div className="flex flex-row relative space-x-36 p-6 font-semibold">
          <p className="text-center">
            You do not have permission to preform this action
          </p>
        </div>
        <div className="w-auto border-b-2 border-red-500" />
        <Link href={`/domains/${from}`}>
          <button className="font-bold text-red-700 bg-red-100 rounded-md h-10 hover:bg-red-300 flex-grow">
            cancle
          </button>
        </Link>
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>heating client | {ent.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-screen h-screen flex justify-center">
        <div className="flex w-screen mt-24 justify-center">
          {token ? postEntry() : permDenied()}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params, query }) {
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_APIHOST}/id/${params.id}`
  );
  const ent = await res.json();

  // pass data to the page via props
  return { props: { ent: ent.data, from: query.source } };
}

export default Entry;
