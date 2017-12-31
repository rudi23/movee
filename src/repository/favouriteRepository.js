const favouriteRepository = storage => ({
  findAll: () => {
    const encodedFavourites = storage.getItem('favourites');
    if (encodedFavourites !== null) {
      return new Set(JSON.parse(encodedFavourites));
    }

    return new Set();
  },
  save: (favourites) => {
    storage.setItem('favourites', JSON.stringify([...favourites]));
  },
});

export default favouriteRepository;
