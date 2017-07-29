import 'whatwg-fetch';

const fetchJson = url => fetch(url)
  .then((res) => {
    if (res.status === 200) {
      return res;
    }

    throw new Error(res.statusText);
  })
  .then(res => res.json());

export default fetchJson;
