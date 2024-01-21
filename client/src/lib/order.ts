import axios from "axios";
import { getHeadersWithCookiesByHeaderName } from "./utils";

export async function getOrder(id: string) {
  return await axios.get(`/orders/${id}`, {headers: getHeadersWithCookiesByHeaderName()})
}