const IMAGE_SIZE_LANDSCAPE = 'landscape';
const IMAGE_SIZE_PORTRAIT = 'portrait';

const getImage = (image, size = IMAGE_SIZE_PORTRAIT) => {
  if (image !== null && image.medium) {
    return image.medium;
  }

  return `//static.tvmaze.com/images/no-img/no-img-${size}-text.png`;
};

const transformShow = apiShow => ({
  id: apiShow.id,
  title: apiShow.name,
  premiered: apiShow.premiered,
  language: apiShow.language,
  image: getImage(apiShow.image),
  status: apiShow.status,
  type: apiShow.type,
  summary: apiShow.summary,
  officialSite: apiShow.officialSite,
  genres: apiShow.genres,
  rating: apiShow.rating.average,
  runtime: apiShow.runtime,
});

const transformSeasonEpisodes = ([seasons, episodes]) => {
  const filteredSeasons = seasons.filter(season => season.premiereDate !== null);

  const seasonsWithEpisodes =
    filteredSeasons.map(season => Object.assign({}, season, { episodes: [] }));

  episodes.forEach((episode) => {
    const season = seasonsWithEpisodes.find(seasonItem => seasonItem.number === episode.season);
    if (season !== undefined) {
      season.episodes.push(Object.assign(
        {},
        episode,
        { image: getImage(episode.image, IMAGE_SIZE_LANDSCAPE) }
      ));
    }
  });

  return seasonsWithEpisodes;
};

const tvShowTransformer = {
  transformShow,
  transformShowCollection: apiData => apiData.map(apiShow => transformShow(apiShow.show)),
  transformSeasonEpisodes,
};

export default tvShowTransformer;
