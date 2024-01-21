import axios from "axios";
import { getHeaders } from "./utils";
import { headerName } from "./constants";

export async function getFavorites() {
    const headers = getHeaders(headerName)
    const response = await axios.get('/favorites', {
        headers
          
    });
    return response.data;
}


const addToFavorites = async (productId: string) => {
  const headers = getHeaders(headerName)
  return await axios.post(`/favorites/${productId}`, {}, { 
      headers: headers
    });
}

const removeFromFavorites = async (productId: string) => {
  const headers = getHeaders(headerName)
  return await axios.delete(`/favorites/${productId}`, { 
      headers: headers
    });
}




export {addToFavorites, removeFromFavorites}
