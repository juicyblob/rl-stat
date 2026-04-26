export const ROOT_DIR = 'https://mono-digital.ru/rl-stat';

export const DEFAULT_USER = {
    id: 0,
    nickname: 'unnamed',
    email: 'example@gmail.com',
    age: 12,
    firebase_uid: '',
    xp: 23,
    user_image: 'users/images/similar.png',
    previous_rank: 'bronze 1',
    current_rank: 'bronze 1',
    highest_rank: 'bronze 1',
};

export const DEV_USER_ID = 1;

export type MatchesSort = 'date' | 'result' | 'mode';
export type RankStat = 'up' | 'down';