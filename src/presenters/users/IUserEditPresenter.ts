import { User } from './../../models/User';
import { guid } from './../../types/guid';
import { Subject } from "rxjs";

export interface IUserEditPresenter
{
    IsVisible: Subject<boolean>;
    Open(userId: guid): Promise<void>
    Close(): void;
    EditedItem: User;
    SaveChanges(): Promise<void>;
}
