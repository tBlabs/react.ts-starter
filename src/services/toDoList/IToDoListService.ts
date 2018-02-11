import { ToDoTask } from './../../models/ToDoTask';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface IToDoListService
{
    Items: ToDoTask[];
    Items$: BehaviorSubject<ToDoTask[]>;
    Add(taskText: string): Promise<void>;
    AddExisting(task: ToDoTask): Promise<void>;
    Toggle(id: number): Promise<void>;
    Delete(id: number): Promise<void>;
    SetText(id: number, newName: string): Promise<void>;
}