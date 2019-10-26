import { IQuery } from './../IQuery';

export class LoginQuery implements IQuery
{
    constructor(
        public email: string,
        public password: string)
    { }
}
