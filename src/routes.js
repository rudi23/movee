import App from './components/App';
import Home from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import SearchPage from './pages/SearchPage';
import FavouritesPage from './pages/FavouritesPage';
import TVShowPage from './pages/TvShowPage';
import NotFoundPage from './pages/NotFoundPage';

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
            ...SchedulePage,
            path: '/',
          },
        ],
      },
      {
        ...SearchPage,
        path: '/search',
      },
      {
        ...SearchPage,
        path: '/search/:query',
      },
      {
        ...FavouritesPage,
        path: '/favourites',
      },
      {
        ...TVShowPage,
        path: '/show/:showId',
      },
      {
        ...TVShowPage,
        path: '/show/:showId/seasons',
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
