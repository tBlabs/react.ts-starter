import * as Rx from 'rxjs';

export interface IToDoListService
{
    Items: Rx.Subject<string[]>;
    Add(item: string): void;
}