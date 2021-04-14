import axios from 'axios';

const authfetcher = (url, token) =>
  fetch(url, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      Bearer: token,
    },
  })
    .then((r) => {
      console.log(r);
      return r.json();
    })
    .then((data) => {
      return data;
    });

export default authfetcher;
