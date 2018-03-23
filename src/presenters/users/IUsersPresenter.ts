import { User } from './../../models/User';

export interface IUsersPresenter extends ITablePresenter<User>
{
    Init(): Promise<void>;
}
