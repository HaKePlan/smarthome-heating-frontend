import Link from 'next/link';
import cookie from 'js-cookie';
import { Router, useRouter } from 'next/router';

import swrFetch from '../lib/fetcher';

function Banner({ children }) {
  let { data, error } = swrFetch('alarm');
  const token = cookie.get('token');

  // const link = "/utilities/login"

  const router = useRouter();
  const path = router.pathname.split('/')[2];

  // const showMe = () => {
  //   if (!token) {

  //   }
  // }

  const alarmCounter = () => {
    if (error) {
      return (
        <div className="w-6 absolute -right-4 -top-0 flex items-center justify-center">
          <img
            src="/alarmErr.svg"
            width="19"
            height="19"
            className="absolute"
          />
        </div>
      );
    } else if (!data || data.data.results === 0) {
      return;
    } else {
      return (
        <div className="w-6 absolute -right-4 -top-0 flex items-center justify-center">
          <img
            src="/alarmSign.svg"
            width="22"
            height="22"
            className="absolute"
          />
          <p className="absolute text-white font-bold text-sm">
            {data.data.results}
          </p>
        </div>
      );
    }
  };

  const showPlace = (place) => {
    if (path === place) {
      return (
        <div className="h-full w-min cursor-pointer border-b-2 border-red-400">
          <p className="px-2">{place}</p>
        </div>
      );
    } else {
      return (
        <div className="h-full w-min cursor-pointer border-b-2 border-transparent hover:border-gray-300">
          <p className="px-2">{place}</p>
        </div>
      );
    }
  };

  return (
    <div className="static w-screen h-24 bg-red-50 shadow bg-gradient-to-b from-red-400 font-light">
      <div className="flex w-full h-full flex-row items-end">
        <div className="flex-none h-full w-40 flex items-center justify-center">
          <div className="w-28">
            <Link href="/">
              <img
                src="/aenergie_logo.svg"
                width="100"
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div className="flex-grow h-10">
          <div className="w-min relative h-full">
            {alarmCounter()}
            <Link href="/utilities/alarm">{showPlace('alarm')}</Link>
          </div>
        </div>
        <div className="flex-grow h-10">
          <Link href="/utilities/dashboard">{showPlace('dashboard')}</Link>
        </div>
        <div className="flex-grow h-10">
          <Link href="/utilities/settings">{showPlace('settings')}</Link>
        </div>
        <div className="flex-none w-20 h-10">
          <Link href={token ? '/utilities/me' : '/utilities/login'}>
            {path === 'me' || path === 'login' ? (
              <div className="h-full w-full cursor-pointer border-b-2 border-red-400">
                <img src="/me.svg" width="30" height="30" className="ml-7" />
              </div>
            ) : (
              <div className="h-full w-full cursor-pointer border-b-2 border-transparent hover:border-gray-300">
                <img src="/me.svg" width="30" height="30" className="ml-7" />
              </div>
            )}
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Banner;
