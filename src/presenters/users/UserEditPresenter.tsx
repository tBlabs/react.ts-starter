import { Types } from './../../IoC/Types';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IUsersPresenter } from './IUsersPresenter';
import { UsersService } from './../../services/users/UsersService';
import { User } from './../../models/User';

@injectable()
export class UserEditPresenter 
{
    constructor(@inject(Types.IUsersService) private _usersService: UsersService)
    { }

}
