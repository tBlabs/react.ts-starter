import { BehaviorSubject } from 'rxjs';
import { Task } from "../../models/Task";
import { guid } from '../../types/guid';

export interface ITasksListService
{
    Items$: BehaviorSubject<Task[]>;
    Items: Task[];
    Add(taskText: string): Promise<void>;
    AddExisting(task: Task): Promise<void>;
    Toggle(id: guid): Promise<void>;
    Delete(id: guid): Promise<void>;
    SetText(id: guid, newName: string): Promise<void>;
}