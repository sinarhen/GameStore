import http from "./fetcher";

export async function getFavorites() {
  return await http.get('/favorites', true);
}

const addToFavorites = async (product: string) => {
  return await http.post(`/favorites/${product}`, {}, true);
}

const removeFromFavorites = async (product: string) => {
  return await http.delete(`/favorites/${product}`, true);
}

export {addToFavorites, removeFromFavorites}