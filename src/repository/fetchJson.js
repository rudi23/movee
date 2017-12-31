import fetch from 'isomorphic-fetch';

const fetchJson = (url, options = {}) => fetch(url, options)
  .then((res) => {
    if (res.status === 200) {
      return res;
    }

    throw new Error(res.statusText);
  })
  .then(res => res.text())
  .then(body => (body ? JSON.parse(body) : body));

export default fetchJson;
