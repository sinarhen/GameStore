import http from './fetcher'; // Assuming http is the module where you've defined your methods

export async function getOrder(id: string) {
  return await http.get(`/orders/${id}`, true);
}

export async function addToOrder(productId: string, quantity: number){
  return await http.post(`/orders/${productId}`, { quantity }, true);
}

export async function removeFromOrder(productId: string){
  return await http.delete(`/orders/${productId}`, true);
}

export async function getUserOrdersById(){
  return await http.get(`/orders`, true);
}