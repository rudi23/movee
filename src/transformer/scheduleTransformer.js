import tvShowTransformer from './tvShowTransformer';

const createEpisode = apiEpisode => ({
  id: apiEpisode.id,
  title: apiEpisode.name,
  season: apiEpisode.season,
  number: apiEpisode.number,
  airDate: apiEpisode.airdate,
  airTime: apiEpisode.airtime,
  airTimestamp: apiEpisode.airstamp,
  runtime: apiEpisode.runtime,
  summary: apiEpisode.summary,
  show: tvShowTransformer.transformShow(apiEpisode.show),
});

const scheduleTransformer = {
  transform: apiData => {
    const channels = [];

    apiData.forEach(el => {
      const channel = el.show.network ? el.show.network : el.show.webChannel;
      const channelId = channel.id;

      let foundedChannel = channels.find(item => item.id === channelId);
      if (foundedChannel === undefined) {
        foundedChannel = Object.assign({}, channel, { episodes: [] });
        channels.push(foundedChannel);
      }

      foundedChannel.episodes.push(createEpisode(el));
    });

    return channels.sort((a, b) => a.name.localeCompare(b.name));
  },
};

export default scheduleTransformer;
