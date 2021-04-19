import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/layout';

export default function Alarm() {
  return (
    <Layout>
      <Head>
        <title>heating client | dashboard</title>
      </Head>
      <div className="h-screen w-screen relative">
        <div className="h-min w-screen flex flex-row flex-wrap absolute top-24">
          <div className="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/heizgruppe_1">
              <div className="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p className="">heizgruppe 1</p>
              </div>
            </Link>
          </div>
          <div className="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/heizgruppe_2">
              <div className="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p className="">heizgruppe 2</p>
              </div>
            </Link>
          </div>
          <div className="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/vorregler">
              <div className="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p className="">vorregler</p>
              </div>
            </Link>
          </div>
          <div className="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/allgemein">
              <div className="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p className="">allgemein</p>
              </div>
            </Link>
          </div>
          <div className="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/brauchwasser">
              <div className="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p className="">brauchwasser</p>
              </div>
            </Link>
          </div>
          <div className="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/alarme">
              <div className="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p className="">alarme</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
