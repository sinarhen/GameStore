import http from './fetcher'; // Assuming http is the module where you've defined your methods

export async function getOrder(id: string) {
  return await http.get(`/orders/${id}`, true);
}

export async function getAllOrders() {
  return await http.get(`/orders/all`, true);
}

export async function deleteOrder(orderId: string){
  return await http.delete(`/orders/${orderId}`, true);
}

export async function updateOrderStatus(orderId: string, status: string){
  return await http.put(`/orders/${orderId}`, { status }, true);
}

export async function updateOrderPaymentStatus(orderId: string, status: string){
  return await http.put(`/orders/payment/${orderId}`, { paymentStatus: status }, true);
}

export async function addToOrder(productId: string, quantity: number){
  return await http.post(`/orders/${productId}`, { quantity }, true);
}

export async function removeFromOrder(productId: string, quantity?: number){
  return await http.put(`/orders/${productId}`, { quantity }, true);
}

export async function getUserOrdersById(){
  return await http.get(`/orders`, true);
}

export async function deleteProductFromOrder(orderId: string | undefined, productId: string){
  return await http.delete(`/orders/${orderId}/${productId}`, true);
}