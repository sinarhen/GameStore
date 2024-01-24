import http from './fetcher';

export async function getAllCategories() {
    return await http.get('/category', true);
};