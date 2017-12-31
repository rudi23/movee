import App from './components/app';
import Home from './components/home/homeContainer';
import ScheduleContainer from './components/schedule/scheduleContainer';
import Search from './components/search/searchContainer';
import Favourites from './components/favourites/favouriteContainer';
import TVShow from './components/tvShow/tvShowContainer';
import NotFound from './components/notFound';

export default [
  {
    ...App,
    routes: [
      {
        ...Home,
        path: '/',
        exact: true,
        routes: [
          {
            ...ScheduleContainer,
            path: '/',
          },
        ],
      },
      {
        ...Search,
        path: '/search',
      },
      {
        ...Search,
        path: '/search/:query',
      },
      {
        ...Favourites,
        path: '/favourites',
      },
      {
        ...TVShow,
        path: '/show/:showId',
      },
      {
        ...TVShow,
        path: '/show/:showId/seasons',
      },
      {
        ...NotFound,
      },
    ],
  },
];
