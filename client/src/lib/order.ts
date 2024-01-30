import http from './fetcher';

export async function getOrder(id: string) {
  return await http.get(`/orders/${id}`, true);
}

export async function getAllOrders() {
  return await http.get(`/orders/all`, true);
}

export async function deleteOrder(orderId: string) {
  return await http.delete(`/orders/${orderId}`, true);
}

export async function updateOrderStatus(orderId: string, status: string) {
  return await http.put(`/orders/${orderId}`, {status}, true);
}

export async function addToOrder(productId: string, quantity: number) {
  return await http.post(`/orders/${productId}`, {quantity}, true);
}

export async function changeProductQuantityInOrder(orderId: string, product: string, quantity?: number) {
  return await http.put(`/orders/${orderId}/${product}`, {quantity}, true);
}

export async function getUserOrdersById() {
  return await http.get(`/orders`, true);
}

export async function deleteProductFromOrder(orderId: string, product: string) {
  return await http.delete(`/orders/${orderId}/${product}`, true);
}

export async function updateIsPaid(orderId: string, isPaid: boolean) {
  return await http.put(`/orders/${orderId}`, {isPaid}, true);

}

export async function confirmOrder(orderId: string, login: string, password: string)
{
  return await http.put(`/orders/${orderId}/confirm`, {login, password}, true);
}