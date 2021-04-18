import { Router, useRouter } from 'next/router';
import Link from 'next/link';
import swrFetch from '../lib/fetcher';

function Banner({ children }) {
  let { data, error } = swrFetch('alarm');

  const router = useRouter();
  const path = router.pathname.split('/')[2];

  const alarmCounter = () => {
    if (error) {
      return (
        <div class="w-6 absolute -right-4 -top-0 flex items-center justify-center">
          <img src="/alarmErr.svg" width="19" height="19" class="absolute" />
        </div>
      );
    } else if (!data || data.data.results === 0) {
      return;
    } else {
      return (
        <div class="w-6 absolute -right-4 -top-0 flex items-center justify-center">
          <img src="/alarmSign.svg" width="22" height="22" class="absolute" />
          <p class="absolute text-white font-bold text-sm">
            {data.data.results}
          </p>
        </div>
      );
    }
  };

  const showPlace = (place) => {
    if (path === place) {
      return (
        <div class="h-full w-min cursor-pointer border-b-2 border-red-400">
          <p class="px-2">{place}</p>
        </div>
      );
    } else {
      return (
        <div class="h-full w-min cursor-pointer border-b-2 border-transparent hover:border-gray-300">
          <p class="px-2">{place}</p>
        </div>
      );
    }
  };

  return (
    <div class="static w-screen h-24 bg-red-50 shadow bg-gradient-to-b from-red-400 font-light">
      <div class="flex w-full h-full flex-row items-end">
        <div class="flex-none h-full w-40 flex items-center justify-center">
          <div class="w-28">
            <Link href="/">
              <img
                src="/aenergie_logo.svg"
                width="100"
                class="cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div class="flex-grow h-10">
          <div class="w-min relative h-full">
            {alarmCounter()}
            <Link href="/utilities/alarm">{showPlace('alarm')}</Link>
          </div>
        </div>
        <div class="flex-grow h-10">
          <Link href="/utilities/dashboard">{showPlace('dashboard')}</Link>
        </div>
        <div class="flex-grow h-10">
          <Link href="/utilities/settings">{showPlace('settings')}</Link>
        </div>
        <div class="flex-grow h-10">
          <Link href="/utilities/login">{showPlace('login')}</Link>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Banner;
