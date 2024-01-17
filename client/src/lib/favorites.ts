import axios from "axios";
import { getHeaders } from "./utils";
import { headerName } from "./constants";

export async function getFavorites() {
    const response = await axios.get('/favorites', {
      headers: getHeaders(headerName)
    });
    return response.data;  
}

