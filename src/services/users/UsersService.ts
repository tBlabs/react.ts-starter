import { BehaviorSubject } from 'rxjs';
import { IUsersService } from './IUsersService';
import { IMessageBus } from './../messageBus/IMessageBus';
import { User } from './../../models/User';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UsersService implements IUsersService
{
    // constructor(private _messageBus: IMessageBus)
    // { }

    public Items$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    public async FetchAll(): Promise<void>
    {
        this.Items$.next([
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'pjoter@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'pjoter@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'tom@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
        ]);
    }

}