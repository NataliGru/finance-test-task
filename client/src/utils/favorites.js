export const addToFavorites = (ticker) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites.push(ticker);

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const isFavorite = (ticker) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.includes(ticker);
};

export const removeFromFavorites = (ticker) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const updatedFavorites = favorites.filter((fav) => fav !== ticker);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};