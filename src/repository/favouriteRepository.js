const favouriteRepository = storage => ({
  findAll: () => {
    const encodedFavourites = storage.get('favourites');
    if (encodedFavourites !== null) {
      return new Set(JSON.parse(encodedFavourites));
    }

    return new Set();
  },
  save: favourites => {
    storage.set('favourites', JSON.stringify([...favourites]));
  },
});

export default favouriteRepository;
