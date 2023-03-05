export interface User {
    _id: string;
    username: string;
    email: string;
    admin: boolean;
    password: string;
    refreshToken: string;
}