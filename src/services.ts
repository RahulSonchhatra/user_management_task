export async function fetchUsers(page: number, limit: number, search: string) {
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${page * limit}&search=${search}`);
    const data = await response.json();
    return data; // Adjust based on API response structure
}