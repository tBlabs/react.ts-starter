import { IUsersService } from './../../services/users/IUsersService';
import { ExceptionCode } from './../../exceptions/ExceptionCode';
import { guid } from './../../types/guid';
import { Types } from './../../IoC/Types';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IUsersPresenter } from './IUsersPresenter';
import { UsersService } from './../../services/users/UsersService';
import { User } from './../../models/User';
import { Subject } from 'rxjs';
import { IUserEditPresenter } from './IUserEditPresenter';
import { Exception } from '../../exceptions/Exception';

@injectable()
export class UserEditPresenter implements IUserEditPresenter
{
    public IsVisible: Subject<boolean> = new Subject<boolean>();
    public EditedItem: User;

    constructor(@inject(Types.IUsersService) private _usersService: IUsersService)
    { }

    public async Open(userId: guid): Promise<void>
    {
        const user: User | null = await this._usersService.GetOne(userId);
        if (user === null) throw new Exception(ExceptionCode.NotFound);
        this.EditedItem = user;
        console.log('OPEN', user);
        this.IsVisible.next(true);
    }

    public async SaveChanges(): Promise<void>
    {
        this._usersService.Update(this.EditedItem);
    }

    public Close(): void
    {
        console.log('CLOSE');
        this.IsVisible.next(false);
    }
}
