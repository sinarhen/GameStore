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




const toggleFavs = async (productId: string, method: string) => {
  const headers = getHeaders(headerName)
  let response;
  console.log("toggleFavs", method, productId)
  if (method === 'post') {
    console.log("post with headers", headers)
    response = await axios.post(`/favorites/${productId}`, { 
      headers 
    });
  } else if (method === 'delete') {
    response = await axios.delete(`/favorites/${productId}`, { headers });
  }
  return response?.data;
}

export {toggleFavs}
