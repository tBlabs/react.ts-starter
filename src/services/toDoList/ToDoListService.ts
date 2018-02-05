import { ToDoTask } from './../../models/ToDoTask';
import { guid } from './../../types/guid';
import { injectable } from "inversify";
import 'reflect-metadata';
import * as Rx from 'rxjs';
import { IToDoListService } from "./IToDoListService";

@injectable()
export class ToDoListService implements IToDoListService
{
    private items: ToDoTask[] = [];
    private items$: Rx.Subject<ToDoTask[]> = new Rx.Subject();

    public get Items(): Rx.Subject<ToDoTask[]>
    {
        return this.items$;
    }

    public Add(itemName: string): void
    {
        const task: ToDoTask = new ToDoTask(itemName);

        this.items.push(task);
        this.items$.next(this.items);
    }

    public Toggle(id: number): void
    {
        const task: ToDoTask | undefined = this.items.find((i: ToDoTask) => i.id === id);
        if (task === undefined) throw new Error('Data corruption');

        task.isDone = !task.isDone;

        this.items$.next(this.items);
    }
}