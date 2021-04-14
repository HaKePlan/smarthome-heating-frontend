import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import Link from 'next/link';
import Head from 'next/head';
import loginStyles from '../../styles/Login.module.css';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  console.log('gigu');

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch('http://127.0.0.1:3000/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
      }),
    })
      .then((r) => {
        console.log(r);
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, { expires: 2 });
          Router.push('/');
        }
      });
  }
  return (
    <Layout>
      <Head>
        <title>heating client | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Banner />
        <div class="h-screen w-screen content-center" id={loginStyles.loginBox}>
          <div class="font-bold bg-gray-100 w-4/5 h-screen justify-center flex flex-wrap content-center">
            <div class="w-2/4 h-2/4 space-y-4 relative">
              <form onSubmit={handleSubmit}>
                <div
                  class="justify-center py-1 rounded-md bg-blue-200"
                  id={loginStyles.loginBox}
                >
                  <span class="mx-4">username:</span>
                  <input
                    class="placeholder-gray-500 form-input mx-10 bg-gray-200 rounded-md"
                    type="text"
                    id="name"
                    value={name}
                    name="name"
                    placeholder="username"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div
                  class="justify-center py-1 rounded-md bg-blue-200"
                  id={loginStyles.loginBox}
                >
                  <a class="mx-4">password:</a>
                  <input
                    class="placeholder-gray-500 form-input mx-10 bg-gray-200 rounded-md"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  class="bg-green-200 rounded-md h-10 w-16 absolute right-0 bottom-0 font-bold"
                  type="submit"
                  value="submit"
                >
                  login
                </button>
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
              </form>
            </div>
          </div>
        </div>
      </body>
    </Layout>
    /*
    <form onSubmit={handleSubmit}>
      <p>Login</p>
      <input
        name="name"
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Submit" />
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </form>
    */
  );
};

export default Login;
