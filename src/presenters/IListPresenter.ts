import { BehaviorSubject } from 'rxjs';

export interface IListPresenter<T>
{
    VisibleItems: BehaviorSubject<T[]>;
    Items: T[];
    Page: number;
    PageSize: number;
    Next(): void;
    Prev(): void;
    FirstVisibleItemIndex: number;
    LastVisibleItemIndex: number;
}
