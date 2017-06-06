import fetch from 'node-fetch';
import transformer from '../transformer/tvShowListTransformer';

const API_BASE_URL = 'http://api.tvmaze.com';

const tvShowRepository = {
    search: (query) => {
        return fetch(`${API_BASE_URL}/search/shows?q=${query}`)
            .then(res => res.json())
            .then(transformer)
    }
};

export default tvShowRepository;
