import { ToDoTask } from './../../models/ToDoTask';
import * as Rx from 'rxjs';

export interface IToDoListService
{
    Items: Rx.Subject<ToDoTask[]>;
    Add(item: string): void;
    SetText(id: number, newName: string): void;
}