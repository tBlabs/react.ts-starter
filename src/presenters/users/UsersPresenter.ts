import { ListPresenter } from './../ListPresenter';
import { IUsersService } from './../../services/users/IUsersService';
import { IDataSource } from './../../interfaces/IDataSource';
import { IListPresenter } from './../IListPresenter';
import { BehaviorSubject } from 'rxjs';
import { Types } from './../../IoC/Types';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IUsersPresenter } from './IUsersPresenter';
import { UsersService } from './../../services/users/UsersService';
import { User } from './../../models/User';

@injectable()
export class UsersPresenter extends ListPresenter<User> implements IUsersPresenter
{
    constructor(@inject(Types.IUsersService) private _usersService: IUsersService)
    {
        super(_usersService);
    }

    public FilterByName(name: string): void
    {
        const filtered = this.Items.filter((u: User) => u.name.includes(name));
        this.Page = 0;
        this.VisibleItems.next(this.TakePageItems(filtered));
    }
}
