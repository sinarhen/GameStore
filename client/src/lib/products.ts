import http from './fetcher'
import {TProductFormSchema} from './types';

async function getAllProducts() {
  return await http.get('/products', true);
}

async function createProduct(product: TProductFormSchema) {
  return await http.post('/products', product, true);
}

async function deleteProduct(productId: string) {
  return await http.delete(`/products/${productId}`, true);
}

async function updateProduct(productId: string, product: any) {
  return await http.put(`/products/${productId}`, product, true);
}

async function getProductById(id: string | undefined) {
  if (!id) throw new Error('id required')
  return await http.get(`/products/${id}`, true);
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
}