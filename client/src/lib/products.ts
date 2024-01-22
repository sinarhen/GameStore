import http from './fetcher'

async function getAllProducts () {
    return await http.get('/products', true);
}
async function createProduct (product: any) {
    return await http.post('/products', product, true);
}

async function getProductById(id: string | undefined){
    if (!id) throw new Error('id required')
    return await http.get(`/products/${id}`, true);
}
export {
    getAllProducts,
    getProductById,
    createProduct
}