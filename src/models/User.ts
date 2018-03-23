import { guid } from './../types/guid';

export class User
{
    constructor(
        public id: guid,
        public name: string,
        public email: string,
        public lastLoginTime: Date)
    { }
}