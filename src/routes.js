import App from './components/app';
import Home from './components/home/homeContainer';
import ScheduleContainer from './components/schedule/scheduleContainer';
import Search from './components/search/searchContainer';
import Favourites from './components/favourites/favouriteContainer';
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
        ...Favourites,
        path: '/favourites',
      },
      {
        ...NotFound,
      },
    ],
  },
];
