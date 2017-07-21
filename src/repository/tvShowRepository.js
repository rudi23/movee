import fetchJson from './fetchJson';
import transformer from '../transformer/tvShowTransformer';

const API_BASE_URL = 'http://api.tvmaze.com';

const tvShowRepository = {
  search: query => fetchJson(`${API_BASE_URL}/search/shows?q=${query}`).then(transformer.transformCollection),
  findById: id => fetchJson(`${API_BASE_URL}/shows/${id}`).then(transformer.transformItem),
};

export default tvShowRepository;
