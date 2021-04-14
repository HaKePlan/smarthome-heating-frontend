import Link from 'next/link';
import Head from 'next/head';
import loginStyles from '../../styles/Login.module.css';
import Layout from '../../components/layout';
import Banner from '../../components/banner';

function Login() {
  const registerUser = async (event) => {
    event.preventDefault();
    console.log('post');
    const res = await fetch('http://127.0.0.1:3000/api/v1/user/login', {
      body: JSON.stringify({
        name: event.target.name.value,
        password: event.target.password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('success', data);
      })
      .catch((error) => {
        console.error('ERROR: ', error);
      });
    // const result = await res.json();
    // console.log(result);
    // console.log(res);
  };

  return (
    <Layout>
      <Head>
        <title>heating client | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Banner />
        <div class="h-screen w-screen content-center" id={loginStyles.loginBox}>
          <div class="font-bold bg-gray-100 w-4/5 h-4/5 justify-center flex flex-wrap content-center">
            <div class="w-2/4 h-2/4 space-y-4 relative">
              <form onSubmit={registerUser}>
                <div
                  class="justify-center py-1 rounded-md bg-blue-200"
                  id={loginStyles.loginBox}
                >
                  <span class="mx-4">username:</span>
                  <input
                    class="placeholder-gray-500 form-input mx-10 bg-gray-200 rounded-md"
                    type="text"
                    id="name"
                    autoComplete="name"
                    placeholder="username"
                  ></input>
                </div>
                <div
                  class="justify-center py-1 rounded-md bg-blue-200"
                  id={loginStyles.loginBox}
                >
                  <a class="mx-4">password:</a>
                  <input
                    class="placeholder-gray-500 form-input mx-10 bg-gray-200 rounded-md"
                    type="password"
                    placeholder="password"
                    id="password"
                  ></input>
                </div>
                <button
                  class="bg-green-200 rounded-md h-10 w-16 absolute right-0 bottom-0 font-bold"
                  type="submit"
                >
                  login
                </button>
              </form>
            </div>
          </div>
        </div>
      </body>
    </Layout>
  );
}

export default Login;
