import { IMessageBus } from './../messageBus/IMessageBus';
import { User } from './../../models/User';
import { IDataSource } from './../dataSource/IDataSource';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UsersService
{
    // constructor(private _messageBus: IMessageBus)
    // { }

    public Users: User[] = [];

    public async FetchAll(): Promise<User[]>
    {
        return [
            new User('1234', 'janusz', 'jan@com', new Date()),
            new User('12345', 'pjoter', 'pjo@com', new Date())
        ];
    }

}