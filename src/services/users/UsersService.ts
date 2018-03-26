import { guid } from './../../types/guid';
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

    public async Update(user: User): Promise<void>
    {
        console.log(user);
        const index: number = this.Items$.value.findIndex((u: User) => u.id === user.id);
        if (index !== (-1))
        {
            console.log(index);
            const items = this.Items$.value;
            items[index] = user;
            console.log(items);
            this.Items$.next(items);
            console.log(this.Items$.value);

        }
    }

    public async GetOne(id: guid): Promise<User | null>
    {
        const user: User | undefined = this.Items$.value.find((u: User) => u.id === id);

        if (user === undefined) return null;

        return user;
    }

    public async FetchAll(): Promise<void>
    {
        this.Items$.next([
            new User('1234', 'januszek' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
            new User('1234' + Math.random().toString(), 'janusz' + Math.random().toString(), 'jan@com', new Date()),
        ]);
    }

}