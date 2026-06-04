const baseURL = 'https://mono-digital.ru/rl-stat/api';

export const API_ROUTES = {
    users: `${baseURL}/users`,
    stats: (id: number) => `${baseURL}/users/${id}/stats`,
    ranks: (id: number) => `${baseURL}/users/${id}/rank-history`,
    matches: (id: number) => `${baseURL}/users/${id}/matches`,
    matchesLast: (id: number) => `${baseURL}/users/${id}/matches/last`,
    matchesTop: (id: number) => `${baseURL}/users/${id}/matches/top`,
    match: (id: number) => `${baseURL}/matches/${id}`,
}