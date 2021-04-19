import axios from 'axios';
import cookie from 'js-cookie';
import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';

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
        setLoginError(err.response.data.message);
      });
  }

  function remove(el) {
    var element = el;
    element.remove(el);
  }

  const errMess = () => {
    if (loginError) {
      console.log('here');
      return (
        <div className="w-60 relative " id="errorBanner">
          <button
            className="absolute -right-2 -top-2"
            onClick={() => {
              remove(errorBanner);
            }}
          >
            <img src="/closeButton.svg" />
          </button>
          <p className="font-light text-base w-full bg-red-200 rounded-md p-2 text-red-800">
            {loginError}
          </p>
        </div>
      );
    }
  };

  return (
    <Layout>
      <Head>
        <title>heating client | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-screen h-screen flex justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 absolute w-64">
          <div className="h-20 w-full mt-8 flex justify-center">
            {errMess()}
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center space-y-4 "
          >
            <div className="flex flex-col items-center">
              <input
                className="placeholder-gray-500 form-input bg-gray-50 rounded-t-md border-gray-300 h-10 w-60"
                type="text"
                id="name"
                value={name}
                name="name"
                placeholder="username"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="placeholder-gray-500 border-t-0 form-input bg-gray-50 rounded-b-md border-gray-300 h-10 w-60"
                type="password"
                id="password"
                value={password}
                name="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full border-b-2 border-red-200" />
            <button
              className="font-bold text-green-700 bg-green-100 rounded-md h-10 w-60 hover:bg-green-300"
              type="submit"
              value="submit"
            >
              login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
