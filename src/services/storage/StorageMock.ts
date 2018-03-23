import { injectable } from 'inversify';
import 'reflect-metadata';
import { IStorage } from './IStorage';

@injectable()
export class StorageMock implements IStorage
{
    private authToken: string = '';

    public set AuthToken(token: string)
    {
        this.authToken = token;
    }

    public get AuthToken(): string
    {
        return this.authToken;
    }

    public DestroyAuthToken(): void
    {
        this.authToken = '';
    }
}