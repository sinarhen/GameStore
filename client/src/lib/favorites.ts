import axios from "axios";
import { getHeadersWithCookiesByHeaderName } from "./utils";
import { headerName } from "./constants";

export async function getFavorites() {
    const headers = getHeadersWithCookiesByHeaderName()
    const response = await axios.get('/favorites', {
        headers
          
    });
    return response.data;
}


const addToFavorites = async (productId: string) => {
  const headers = getHeadersWithCookiesByHeaderName()
  return await axios.post(`/favorites/${productId}`, {}, { 
      headers: headers
    });
}

const removeFromFavorites = async (productId: string) => {
  const headers = getHeadersWithCookiesByHeaderName()
  return await axios.delete(`/favorites/${productId}`, { 
      headers: headers
    });
}




export {addToFavorites, removeFromFavorites}
