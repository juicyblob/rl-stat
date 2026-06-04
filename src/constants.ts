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
export type ModalMode = 'add' | 'edit' | null;
export type ButtonConfirmBackground = 'muted' | 'red' | 'blue';

export const DEFAULT_CONFIRM: {
    title: string,
    text: string,
    buttons: { text: string, bg: ButtonConfirmBackground }[]
} = {
    title: 'Confirm title',
    text: 'Confirm default text',
    buttons: [
        { text: 'Cancel', bg: 'muted' },
        { text: 'Ok', bg: 'red' }
    ]
}