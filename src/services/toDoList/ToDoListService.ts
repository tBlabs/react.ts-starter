import { ToDoTask } from './../../models/ToDoTask';
import { guid } from './../../types/guid';
import { injectable } from "inversify";
import 'reflect-metadata';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IToDoListService } from "./IToDoListService";

@injectable()
export class ToDoListService implements IToDoListService
{
    public items$: BehaviorSubject<ToDoTask[]> = new BehaviorSubject([new ToDoTask('sample task #1', true), new ToDoTask('sample task #2')]);

    public get Items(): ToDoTask[]
    {
        return this.items$.value;
    }

    public get Items$(): BehaviorSubject<ToDoTask[]>
    {
        return this.items$;
    }

    public async AddExisting(task: ToDoTask): Promise<void>
    {
        this.items$.next([...this.Items, task]);
    }

    public async Add(itemName: string): Promise<void>
    {
        const task: ToDoTask = new ToDoTask(itemName);

        this.AddExisting(task);
    }

    private FindByIdOrThrow(id: number): ToDoTask
    {
        const task: ToDoTask | undefined = this.Items.find((i: ToDoTask) => i.id === id);

        if (task === undefined) 
        {
            throw new Error('Not found');
        }

        return task;
    }

    public async Toggle(id: number): Promise<void>
    {
        const task = this.FindByIdOrThrow(id);

        task.isDone = !task.isDone;

        this.items$.next(this.Items);
    }

    public async Delete(id: number): Promise<void>
    {
        const taskIndex: number = this.Items.findIndex((i: ToDoTask) => i.id === id);
        if (taskIndex === (-1))
        {
            throw new Error('Not found');
        }

        this.Items.splice(taskIndex, 1);

        this.items$.next(this.Items);
    }

    public async SetText(id: number, newName: string): Promise<void>
    {
        const task = this.FindByIdOrThrow(id);

        task.text = newName;

        this.items$.next(this.Items);
    }
}