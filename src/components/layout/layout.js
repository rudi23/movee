import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './menu';
import Home from '../home';
import Search from '../search/search';
import TVShow from '../tvShow/tvShow';
import Footer from './footer';
import NotFound from '../notFound';
import FavouriteContainer from '../favourites/favouriteContainer';
import favouriteRepository from '../../repository/favouriteRepository';

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      favourites: new Set(),
    };
    this.toggleFavourite = this.toggleFavourite.bind(this);
  }

  componentDidMount() {
    this.setState({ favourites: favouriteRepository.findAll() });
  }

  toggleFavourite(tvShowId) {
    const favourites = new Set([...this.state.favourites]);

    if (favourites.has(tvShowId)) {
      favourites.delete(tvShowId);
    } else {
      favourites.add(tvShowId);
    }
    this.setState({ favourites });
    favouriteRepository.save(favourites);
  }

  render() {
    const { favourites } = this.state;
    const toggleFavourite = this.toggleFavourite;

    return (
      <div>
        <Menu />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                favourites={favourites}
                toggleFavourite={toggleFavourite}
                {...props}
              />
            )}
          />
          <Route
            path="/search/:query"
            render={props => (
              <Search
                favourites={favourites}
                toggleFavourite={toggleFavourite}
                {...props}
              />
            )}
          />
          <Route
            path="/search"
            render={props => (
              <Search
                favourites={favourites}
                toggleFavourite={toggleFavourite}
                {...props}
              />
            )}
          />
          <Route
            path="/show/:showId"
            render={props => (
              <TVShow
                isFavourite={favourites.has(parseInt(props.match.params.showId, 10))}
                toggleFavourite={toggleFavourite}
                {...props}
              />
            )}
          />
          <Route
            path="/favourites"
            render={props => (
              <FavouriteContainer
                favourites={favourites}
                toggleFavourite={toggleFavourite}
                {...props}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Layout;
