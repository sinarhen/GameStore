import axios from "axios"
import { getHeadersWithCookiesByHeaderName } from "./utils";
import { headerName } from "./constants";

async function getAllProducts () {
    const response = await axios.get('/products')
    return response;
}


async function getProductById(id: string | undefined){
    if (!id) throw new Error('id required')
    const headers = getHeadersWithCookiesByHeaderName()
    const response = await axios.get('/products/' + id, {
        headers
    })
    return response;
}
export {
    getAllProducts,
    getProductById
}