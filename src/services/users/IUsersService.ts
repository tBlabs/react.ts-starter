import { User } from './../../models/User';
import { IDataSource } from './../../interfaces/IDataSource';

export interface IUsersService extends IDataSource<User>
{
}
