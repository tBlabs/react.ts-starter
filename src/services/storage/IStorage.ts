import { AuthToken } from './../../models/auth/AuthToken';
export interface IStorage
{
    AuthToken: string;
    DestroyAuthToken(): void;
}