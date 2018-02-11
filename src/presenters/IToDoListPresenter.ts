import { ToDoTask } from './../models/ToDoTask';
import * as Rx from 'rxjs';

export interface IToDoListPresenter
{
    Filter$: Rx.BehaviorSubject<string>;
    Items$: Rx.BehaviorSubject<ToDoTask[]>;
    SetFilter(text: string): void;
}