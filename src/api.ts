const baseURL = 'https://mono-digital.ru/rl-stat/api';

export const API_ROUTES = {
    users: `${baseURL}/users`,
    stats: (id: number) => `${baseURL}/users/${id}/stats`,
}