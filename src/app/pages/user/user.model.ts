export interface User {
    id?: number;
    username: string;
    password?: string;
    role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_CONSULTA';
}