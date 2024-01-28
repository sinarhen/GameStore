import axios from "axios";
import {getHeadersWithCookiesByHeaderName} from "./utils";

async function request(method: 'get' | 'post' | 'put' | 'delete', url: string, data: any = null, withAuth: boolean = false) {
  const config = {
    method,
    url,
    ...(data && {data}),
    ...(withAuth && {headers: getHeadersWithCookiesByHeaderName()}),
  };

  return await axios(config);
}

export default {
  get: (url: string, withAuth: boolean = false) => request('get', url, null, withAuth),
  post: (url: string, data: any, withAuth: boolean = false) => request('post', url, data, withAuth),
  put: (url: string, data: any, withAuth: boolean = false) => request('put', url, data, withAuth),
  delete: (url: string, withAuth: boolean = false) => request('delete', url, null, withAuth),
};