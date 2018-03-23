import { AuthToken } from './../../models/auth/AuthToken';
import { IMessageBus } from './../messageBus/IMessageBus';
import { IStorage } from './../storage/IStorage';
import { Types } from './../../IoC/Types';
import { IAuthService } from './IAuthService';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { Credentials } from '../../models/Credentials';
import { LoginQuery } from './../../messages/auth/LoginQuery';
import { token } from './../../types/token';

@injectable()
export class AuthService implements IAuthService
{
    constructor(
        @inject(Types.IMessageBus) private _messageBus: IMessageBus,
        @inject(Types.IStorage) private _storage: IStorage)
    { }

    public async Login(credentials: Credentials): Promise<void>
    {
        const loginQuery: LoginQuery = new LoginQuery(credentials.email, credentials.password);

        const authToken: AuthToken = await this._messageBus.Send(loginQuery);

        this._storage.AuthToken = authToken.token;
    }

    public Logout(): void
    {
        this._storage.DestroyAuthToken();
    }

    public get IsLoggedIn(): boolean
    {
        return this._storage.AuthToken !== '';
    }
}