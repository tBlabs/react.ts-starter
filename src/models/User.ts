import { IStorable } from './../interfaces/IStorable';
import { guid } from './../types/guid';

export class User implements IStorable
{
    constructor(
        public id: guid,
        public name: string,
        public email: string,
        public lastLoginTime: Date)
    { }
}
