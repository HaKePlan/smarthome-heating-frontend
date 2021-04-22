import axios from 'axios';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Router from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';

import Layout from '../../components/layout';
import AppError from '../../lib/appError';

const fetcher = (url) =>
  axios
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new AppError(err.response.data.message, err.response.status);
    });

const fetchData = () => {
  const router = useRouter();
  const { id } = router.query;
  let { data } = useSWR(
    `http://${process.env.NEXT_PUBLIC_APIHOST}/id/${id}`,
    fetcher
  );

  let value = '';
  if (data) {
    value = data.data.data.value;
  }

  return { data, value };
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
      <button className="font-bold text-red-700 bg-red-100 rounded-md h-10 hover:bg-red-300 flex-grow">
        cancle
      </button>
    </div>
  );
};

export default function Entry() {
  const [value, setValue] = useState(fetchData.value);

  const token = cookie.get('token');
  // const token = '';
  const from = 'allgemein';
  const data = fetchData().data;

  function submit() {
    console.log(value);
  }

  console.log(value);

  const postEntry = () => {
    const options = (e) => {
      const keyName = Object.keys(e.valueAssignation.assignment);
      const opt = [];
      for (let i = 0; i < keyName.length; i += 1) {
        opt.push(
          <option value={keyName[i]}>
            {e.valueAssignation.assignment[keyName[i]]}
          </option>
        );
      }

      return opt.map((o) => {
        return o;
      });
    };

    if (data) {
      return (
        <div className="absolute border-2 border-red-500 rounded-md p-8  bg-gray-50 shadow-2xl flex-col flex space-y-5 bg-gray-50">
          <div className="flex flex-row relative space-x-36 p-6 font-semibold">
            <div className="flex-grow">schnebi furz</div>
            <div className="flex felx-row space-x-1 relative">
              <select
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              >
                {options(data.data.data)}
              </select>
            </div>
          </div>
          <div className="w-auto border-b-2 border-red-500" />
          <div className="bottom-0 flex flex-row justify-center space-x-10">
            <button
              className="font-bold text-red-700 bg-red-100 rounded-md h-10 w-20 hover:bg-red-300 flex-grow"
              onClick={() => {
                Router.push(`../domains/${from}`);
              }}
            >
              cancle
            </button>
            <button
              className="font-bold text-green-700 bg-green-100 rounded-md h-10 w-20 hover:bg-green-300 flex-grow"
              type="submit"
              onClick={submit}
            >
              submit
            </button>
          </div>
        </div>
      );
    } else {
      return <p>loading...</p>;
    }
  };

  return (
    <Layout>
      <div className="relative w-screen h-screen flex justify-center">
        <div className="flex w-screen mt-24 justify-center">
          {token ? postEntry() : permDenied()}
        </div>
      </div>
    </Layout>
  );
}
