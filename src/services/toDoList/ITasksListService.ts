import { BehaviorSubject } from 'rxjs';
import { Task } from "../../models/Task";

export interface ITasksListService
{
    Items$: BehaviorSubject<Task[]>;
    Items: Task[];
    Add(taskText: string): Promise<void>;
    AddExisting(task: Task): Promise<void>;
    Toggle(id: number): Promise<void>;
    Delete(id: number): Promise<void>;
    SetText(id: number, newName: string): Promise<void>;
}