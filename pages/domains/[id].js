import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Layout from '../../components/layout';
import fetcher from '../../lib/fetcher';
import swrFetch from '../../lib/fetcher';

export default function Domain() {
  const router = useRouter();
  const { id } = router.query;
  const [entry, setEntry] = useState('');
  const [value, setValue] = useState('');
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
            className="flex flex-row relative space-x-36 p-6 hover:bg-gray-50 hover:shadow-md rounded-md border border-transparent hover:border-gray-200 cursor-pointer"
            onClick={() => {
              entryHandler(element);
            }}
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

  function submit(e) {
    e.preventDefault();
    console.log(value);
    // setValue('');
    // window.location.reload(true);
    setEntry('');
  }

  function entryHandler(el) {
    const options = (el) => {
      const keyName = Object.keys(el.valueAssignation.assignment);
      const opt = [];
      for (let i = 0; i < keyName.length; i++) {
        const element = el.valueAssignation.assignment[keyName[i]];
        if (element === el.value) {
          opt.push(
            <option selected value={element}>
              {element}
            </option>
          );
        } else {
          opt.push(<option value={element}>{element}</option>);
        }
      }

      return opt.map((el) => {
        return el;
      });
    };

    setEntry(
      <div className="absolute border-2 border-red-500 rounded-md p-8 flex-col flex space-y-5 bg-gray-50 shadow-2xl">
        <div className="flex flex-row relative space-x-36 p-6 font-semibold">
          <div className="flex-grow">{el.name}</div>
          <div className="flex felx-row space-x-1 relative">
            <select
              onChangeCapture={(e) => {
                console.log('trigger');
                console.log(e.currentTarget.value);
                setValue(e.currentTarget.value);
                console.log(value);
              }}
            >
              {options(el)}
            </select>
          </div>
        </div>
        <div className="w-auto border-b-2 border-red-500" />
        <div className="bottom-0 flex flex-row justify-center space-x-10">
          <button
            className="font-bold text-red-700 bg-red-100 rounded-md h-10 w-20 hover:bg-red-300 flex-grow"
            onClick={() => {
              setEntry('');
            }}
          >
            cancle
          </button>
          <button
            className="font-bold text-green-700 bg-green-100 rounded-md h-10 w-20 hover:bg-green-300 flex-grow"
            type="submit"
            value="submit"
            onClick={submit}
          >
            submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>heating client | {id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-screen h-screen flex justify-center">
        <div className="flex w-screen absolute mt-24 justify-center items-center">
          <div className="flex flex-col justify-center border-2 border-red-200 rounded-md">
            {!data ? (
              <div className="w-60 h-60 flex justify-center items-center">
                <p>loading...</p>
              </div>
            ) : (
              container()
            )}
          </div>
          {entry}
        </div>
      </div>
    </Layout>
  );
}
