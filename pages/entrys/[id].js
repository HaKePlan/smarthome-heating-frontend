import axios from 'axios';
import cookie from 'js-cookie';
import React, { useState } from 'react';

import Layout from '../../components/layout';

async function submit(val, id) {
  const token = cookie.get('token');
  const res = await axios
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
    .then((r) => {
      return r;
    })
    .catch((err) => {
      return err;
    });

  if (res.data) {
    console.log('success');
    return 'success';
  } else {
    console.log(`ERROR: ${res.response.status}, ${res.response.data.message}`);
    return res.response.data.message;
  }
}

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

function Entry({ ent }) {
  const [showMe, setShowMe] = useState('');

  let message = '';

  const postEntry = () => {
    const [value, setValue] = useState(ent.value);

    return (
      <div className="absolute border-2 border-red-500 rounded-md p-8  bg-gray-50 shadow-2xl flex-col flex space-y-5 bg-gray-50">
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
          <button className="font-bold text-red-700 bg-red-100 rounded-md h-10 w-20 hover:bg-red-300 flex-grow">
            cancle
          </button>
          <button
            className="font-bold text-green-700 bg-green-100 rounded-md h-10 w-20 hover:bg-green-300 flex-grow"
            type="submit"
            onClick={() => {
              message = submit(value, ent._id);
            }}
          >
            submit
          </button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="relative w-screen h-screen flex justify-center">
        <div className="absolute w-screen flex justify-center">
          <div className="mt-8 flex justify-center">
            <div className="w-96 relative" id="errorBanner">
              <button className="absolute -right-2 -top-2">
                <img src="/closeButton.svg" />
              </button>
              <p className="font-light text-base w-full bg-red-200 rounded-md p-2 text-red-800">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-screen mt-24 justify-center">{postEntry()}</div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_APIHOST}/id/${params.id}`
  );
  const ent = await res.json();

  // pass data to the page via props
  return { props: { ent: ent.data } };
}

export default Entry;
