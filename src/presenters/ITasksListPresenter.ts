import * as Rx from 'rxjs';
import { Task } from '../models/Task';

export interface ITasksListPresenter
{
    Filter$: Rx.BehaviorSubject<string>;
    Items$: Rx.BehaviorSubject<Task[]>;
    Items: Task[];
    SetFilter(text: string): void;
    Dispose(): void;
}