import { ToDoTask } from './../../models/ToDoTask';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface IToDoListService
{
    Items: ToDoTask[];
    Items$: BehaviorSubject<ToDoTask[]>;
    Add(item: string): Promise<void>;
    Toggle(id: number): Promise<void>;
    Delete(id: number): Promise<void>;
    SetText(id: number, newName: string): Promise<void>;
    TotalCount: number;
}