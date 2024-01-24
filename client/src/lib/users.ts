import http from './fetcher';

export async function getAllUsers() {
    return await http.get('/users', true);
};

export async function deleteUserForAdmin(id: string) {
    return await http.delete(`/users/${id}`, true);
};