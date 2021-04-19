import Head from 'next/head';
import Router from 'next/router';
import cookie from 'js-cookie';

import Layout from '../../components/layout';

export default function Alarm() {
  const logout = () => {
    cookie.remove('token');
    Router.push('/');
  };

  return (
    <Layout>
      <Head>
        <title>heating client | me</title>
      </Head>
      <div className="flex items-center justify-center">
        <div className="">
          nothing to see here, only the &quot;me&quot; site
        </div>
        <button
          className="font-bold text-red-700 bg-red-100 rounded-md h-10 w-60 hover:bg-red-300"
          type="button"
          value="button"
          onClick={logout}
        >
          logout
        </button>
      </div>
    </Layout>
  );
}
