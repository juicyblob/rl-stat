const baseURL = 'https://mono-digital.ru/rl-stat/api';

export const API_ROUTES = {
    users: `${baseURL}/users`,
    stats: (id: number) => `${baseURL}/users/${id}/stats`,
    matches: (id: number) => `${baseURL}/users/${id}/matches`,
    matchesLast: (id: number) => `${baseURL}/users/${id}/matches`,
    matchesTop: (id: number) => `${baseURL}/users/${id}/matches/top`,
}