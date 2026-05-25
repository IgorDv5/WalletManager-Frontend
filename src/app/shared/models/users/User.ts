import { UserRole } from "./enums/UserRole";

export interface User {
    id?: number;
    nome: string;
    email: string;
    deletedAt: string | null;
    role: UserRole;
}