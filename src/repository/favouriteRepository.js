const favouriteRepository = {
  findAll: () => {
    if (typeof window.Storage !== 'undefined') {
      const encodedFavourites = window.localStorage.getItem('favourites');
      if (encodedFavourites !== null) {
        return JSON.parse(encodedFavourites);
      }
    }

    return [];
  },
  save: (favourites) => {
    if (typeof window.Storage !== 'undefined') {
      window.localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  },
};

export default favouriteRepository;
