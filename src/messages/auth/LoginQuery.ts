import { IQuery } from './../IQuery';
import { Credentials } from 'google-cloud__storage';

export class LoginQuery implements IQuery
{
    constructor(
        public email: string,
        public password: string)
    { }
}
