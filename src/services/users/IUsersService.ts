import { guid } from './../../types/guid';
import { User } from './../../models/User';
import { IDataSource } from './../../interfaces/IDataSource';

export interface IUsersService extends IDataSource<User>
{
    GetOne(id: guid): Promise<User | null>
    Update(user: User): Promise<void>;
}
