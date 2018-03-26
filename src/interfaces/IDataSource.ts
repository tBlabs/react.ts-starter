import { BehaviorSubject } from 'rxjs';
export interface IDataSource<T>
{
    Items$: BehaviorSubject<T[]>;
    FetchAll(): Promise<void>;
}
