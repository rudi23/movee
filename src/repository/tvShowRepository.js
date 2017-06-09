import fetch from 'node-fetch';
import transformer from '../transformer/tvShowTransformer';

const API_BASE_URL = 'http://api.tvmaze.com';

const tvShowRepository = {
  search: query =>
     fetch(`${API_BASE_URL}/search/shows?q=${query}`)
      .then(res => res.json())
      .then(transformer.transformCollection),
  findById: id =>
     fetch(`${API_BASE_URL}/shows/${id}`)
      .then(res => res.json())
      .then(transformer.transformItem)
  ,
};

export default tvShowRepository;
