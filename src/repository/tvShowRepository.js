import fetch from 'node-fetch';
import transformer from '../transformer/tvShowTransformer';

const API_BASE_URL = 'http://api.tvmaze.com';

const fetchJson = url => fetch(url).then(res => res.json());

const tvShowRepository = {
  search: query => fetchJson(`${API_BASE_URL}/search/shows?q=${query}`).then(transformer.transformCollection),
  findById: id => fetchJson(`${API_BASE_URL}/shows/${id}`).then(transformer.transformItem),
};

export default tvShowRepository;
