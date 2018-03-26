import { IListPresenter } from './../IListPresenter';
import { BehaviorSubject } from 'rxjs';
import { User } from './../../models/User';

export interface IUsersPresenter extends IListPresenter<User>
{
    Init(): Promise<void>;
    FilterByName(name: string): void;
}
