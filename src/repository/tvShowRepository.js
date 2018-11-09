import transformer from '../transformer/tvShowTransformer';
import fetchJson from './fetchJson';

const API_BASE_URL = 'http://api.tvmaze.com';

const search = query => fetchJson(`${API_BASE_URL}/search/shows?q=${query}`).then(transformer.transformShowCollection);
const findById = id => fetchJson(`${API_BASE_URL}/shows/${id}`).then(transformer.transformShow);
const findByIds = ids => Promise.all(ids.map(findById));
const findSeasons = id => fetchJson(`${API_BASE_URL}/shows/${id}/seasons`);
const findEpisodes = id => fetchJson(`${API_BASE_URL}/shows/${id}/episodes`);
const findSeasonsWithEpisodes = id =>
  Promise.all([findSeasons(id), findEpisodes(id)]).then(transformer.transformSeasonEpisodes);

const tvShowRepository = {
  search,
  findById,
  findByIds,
  findSeasons,
  findEpisodes,
  findSeasonsWithEpisodes,
};

export default tvShowRepository;
