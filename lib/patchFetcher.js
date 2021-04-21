import axios from 'axios';

import AppError from './appError';

const patchFetcher = (id, value, token) => {
  axios
    .patch(
      `http://${process.env.NEXT_PUBLIC_APIHOST}/id/${id}`,
      { value },
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw new AppError(err.response.data.message, err.response.status);
    });
};

export default patchFetcher;
