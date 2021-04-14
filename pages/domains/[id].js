import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout';
import 'tailwindcss/tailwind.css';
import getAllDomains from '../../lib/domain';
import getApiData from '../../lib/domain';
import { useRouter } from 'next/router';

export default function Domain() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <div>this is a site with id {id}</div>
    </Layout>
  );
}
