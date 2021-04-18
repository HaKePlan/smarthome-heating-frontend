import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import cookie from 'js-cookie';
import Head from 'next/head';
import Layout from '../../components/layout';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    axios
      .post('http://127.0.0.1:3000/api/v1/user/login', {
        name,
        password,
      })
      .then((res) => {
        // console.log(res);
        cookie.set('token', res.data.token, { expires: 2 });
        Router.push('/');
      })
      .catch((err) => {
        console.log(err.response);
        setLoginError(err.response.data.message);
      });
  }

  let displayError;
  if (loginError) {
    displayError = (
      <div class="absolute left-0 flex items-center h-10 w-4/6 rounded-lg flex-auto text-base uppercase">
        <p class="font-bold absolute left-3 text-red-700">{loginError}</p>
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>heating client | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div class="static w-screen h-screen flex items-center justify-center">
        <div class="w-3/5 h-2/4 flex flex-col items-center justify-center bg-gray-100 rounded-md">
          <div class="w-full h-20 flex"></div>
          <div class="w-3/4 border-b-2 border-red-400"></div>
          <div class="w-full h-20 flex"></div>
        </div>
      </div>
      {/* <div class="w-screen h-screen flex flex-row relative">
          <div class="flex-non w-1/5 h-screen relative"></div>
          <div class="flex-none w-3/5 h-screen rleative">
            <div calss="relative">
              <div class="w-full h-24"></div>
              <form onSubmit={handleSubmit} class="w-full h-64 space-y-6">
                <div class="bg-red-100 w-full h-16 rounded-lg relative flex items-center justify-center space-x-4 shadow-lg">
                  <p class="font-bold">username:</p>
                  <input
                    class="placeholder-gray-500 form-input bg-gray-200 rounded-lg h-10 w-60"
                    type="text"
                    id="name"
                    value={name}
                    name="name"
                    placeholder="username"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class="bg-red-100 w-full h-16 rounded-lg relative flex items-center justify-center space-x-4 shadow-lg">
                  <p class="font-bold text-center">password:</p>
                  <input
                    class="placeholder-gray-500 form-input bg-gray-200 rounded-lg h-10 w-60"
                    type="password"
                    id="password"
                    value={password}
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="relative h-16 w-full flex items-center">
                  <div class="flex items-center bg-green-100 h-10 w-1/6 rounded-lg absolute right-0 flex-none shadow-lg hover:bg-green-300">
                    <button
                      class="font-bold text-green-700 absolute right-4"
                      type="submit"
                      value="submit"
                    >
                      login
                    </button>
                  </div>
                  {!loginError ? (
                    <div class="absolute left-0 flex items-center h-10 w-4/6 rounded-lg"></div>
                  ) : (
                    displayError
                  )}
                </div>
              </form>
            </div>
          </div>
          <div class=" flex-none w-1/5 h-screen"></div>
        </div> */}
    </Layout>
  );
};

export default Login;
