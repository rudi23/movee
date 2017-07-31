import fetchJson from './fetchJson';
import transformer from '../transformer/tvShowTransformer';

const API_BASE_URL = 'http://api.tvmaze.com';

const findById = id => fetchJson(`${API_BASE_URL}/shows/${id}`).then(transformer.transformShow);
const findSeasons = id => fetchJson(`${API_BASE_URL}/shows/${id}/seasons`);
const findEpisodes = id => fetchJson(`${API_BASE_URL}/shows/${id}/episodes`);

const tvShowRepository = {
  search: query => fetchJson(`${API_BASE_URL}/search/shows?q=${query}`).then(transformer.transformShowCollection),
  findById,
  findByIds: ids => Promise.all(ids.map(findById)),
  findSeasons,
  findEpisodes,
  findSeasonsWithEpisodes: id => Promise.all([findSeasons(id), findEpisodes(id)])
    .then(transformer.transformSeasonEpisodes),
};

export default tvShowRepository;
