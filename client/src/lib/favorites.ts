import http from "./fetcher"; 
export async function getFavorites() {
    return await http.get('/favorites', true);
}

const addToFavorites = async (productId: string) => {
  return await http.post(`/favorites/${productId}`, {}, true);
}

const removeFromFavorites = async (productId: string) => {
  return await http.delete(`/favorites/${productId}`, true);
}

export {addToFavorites, removeFromFavorites}