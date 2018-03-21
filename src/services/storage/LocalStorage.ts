import { injectable } from 'inversify';
import 'reflect-metadata';
import { IStorage } from './IStorage';

@injectable()
export class Storage implements IStorage
{
    private AUTH: string = 'auth';

    public set AuthToken(token: string)
    {
        window.localStorage.setItem(this.AUTH, token);
    }

    public get AuthToken(): string
    {
        const value: string | null = window.localStorage.getItem(this.AUTH);

        if (value === null) return '';

        return value;
    }
}