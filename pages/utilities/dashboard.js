import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';

export default function Alarm() {
  return (
    <Layout>
      <Head>
        <title>heating client | dashboard</title>
      </Head>
      <div class="h-screen w-screen relative">
        <div class="h-min w-screen flex flex-row flex-wrap absolute top-24">
          <div class="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/heizgruppe_1">
              <div class="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p class="">heizgruppe 1</p>
              </div>
            </Link>
          </div>
          <div class="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/heizgruppe_2">
              <div class="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p class="">heizgruppe 2</p>
              </div>
            </Link>
          </div>
          <div class="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/vorregler">
              <div class="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p class="">vorregler</p>
              </div>
            </Link>
          </div>
          <div class="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/allgemein">
              <div class="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p class="">allgemein</p>
              </div>
            </Link>
          </div>
          <div class="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/brauchwasser">
              <div class="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p class="">brauchwasser</p>
              </div>
            </Link>
          </div>
          <div class="h-72 w-1/3 flex justify-center items-center">
            <Link href="/domains/alarme">
              <div class="cursor-pointer w-48 h-48 bg-red-50 flex justify-center items-center">
                <p class="">alarme</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
