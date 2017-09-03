import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './menu';
import HomeContainer from '../home/homeContainer';
import SearchContainer from '../search/searchContainer';
import TVShowContainer from '../tvShow/tvShowContainer';
import Footer from './footer';
import NotFound from '../notFound';
import FavouriteContainer from '../favourites/favouriteContainer';

const Layout = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/search/:query" component={SearchContainer} />
      <Route path="/search" component={SearchContainer} />
      <Route path="/show/:showId" component={TVShowContainer} />
      <Route path="/favourites" component={FavouriteContainer} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </div>
);

export default Layout;
