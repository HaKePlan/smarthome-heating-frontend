import axios from 'axios';
import useSWR from 'swr';

import AppError from './appError';

const fetcher = (url) =>
  axios
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new AppError(err.response.data.message, err.response.status);
    });

const swrFetch = (route) => {
  let { data, error } = useSWR(
    `http://${process.env.NEXT_PUBLIC_APIHOST}/${route}`,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: process.env.NEXT_PUBLIC_REFRESHINTERVAL, // 5s
    }
  );

  return { data, error };
};

export default swrFetch;
