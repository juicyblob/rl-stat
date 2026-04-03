export interface User {
    id: number;
    nickname: string;
    email: string;
    age: number;
    firebase_uid: string;
    xp: number;
    user_image: string;
    previous_rank: string;
    current_rank: string;
    highest_rank: string;
    created_at?: string;
}
export type UserResponse = {
    user: User;
}