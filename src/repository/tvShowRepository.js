import fetch from 'node-fetch';
import showListFactory from '../factory/tvShowListFactory';

const API_BASE_URL = 'http://api.tvmaze.com';

const showRepository = {
    search: (query) => {
        return fetch(`${API_BASE_URL}/search/shows?q=${query}`)
        .then(res => res.json())
        .then(showListFactory)
    }
};

export default showRepository;
