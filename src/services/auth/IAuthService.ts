import { Credentials } from '../../models/Credentials';

export interface IAuthService
{
    Login(credentials: Credentials): Promise<void>;
}