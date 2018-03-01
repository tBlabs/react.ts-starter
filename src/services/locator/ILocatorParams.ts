import { BehaviorSubject } from 'rxjs';

export interface ILocatorParams<T>
{
    Params$: BehaviorSubject<T>;
    UpdateParam(key: keyof T, value: any): void;
}
