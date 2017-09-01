import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './menu';
import Home from '../home';
import Search from '../search/search';
import TVShow from '../tvShow/tvShowContainer';
import Footer from './footer';
import NotFound from '../notFound';
import FavouriteContainer from '../favourites/favouriteContainer';

const Layout = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search/:query" component={Search} />
      <Route path="/search" component={Search} />
      <Route path="/show/:showId" component={TVShow} />
      <Route path="/favourites" component={FavouriteContainer} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </div>
);

export default Layout;
