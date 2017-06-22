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
  show: tvShowTransformer.transformItem(apiEpisode.show),
});

const scheduleTransformer = {
  transform: (apiData) => {
    const channels = [];

    apiData.forEach((el) => {
      const channelId = el.show.network.id;
      if (!channels[channelId]) {
        channels[channelId] = el.show.network;
        channels[channelId].episodes = [];
      }

      channels[channelId].episodes.push(createEpisode(el));
    });

    return channels.sort((a, b) => a.name.localeCompare(b.name));
  },
};

export default scheduleTransformer;
