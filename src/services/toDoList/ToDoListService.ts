import { ToDoTask } from './../../models/ToDoTask';
import { guid } from './../../types/guid';
import { injectable } from "inversify";
import 'reflect-metadata';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IToDoListService } from "./IToDoListService";

@injectable()
export class ToDoListService implements IToDoListService
{
    private items: ToDoTask[] = [new ToDoTask('aaa'), new ToDoTask('bbb')];
    public items$: BehaviorSubject<ToDoTask[]> = new BehaviorSubject(this.items);

    public get Items(): ToDoTask[]
    {
        return this.items;
    }

    public get Items$(): BehaviorSubject<ToDoTask[]>
    {
        return this.items$;
    }

    public async Add(itemName: string): Promise<void>
    {
        const task: ToDoTask = new ToDoTask(itemName);

        this.items.push(task);
        this.items$.next(this.items);
    }

    public async Toggle(id: number): Promise<void>
    {
        const task: ToDoTask | undefined = this.items.find((i: ToDoTask) => i.id === id);
        if (task === undefined) throw new Error('Data corruption');

        task.isDone = !task.isDone;

        this.items$.next(this.items);
    }

    public async Delete(id: number): Promise<void>
    {
        const taskIndex: number = this.items.findIndex((i: ToDoTask) => i.id === id);
        if (taskIndex === (-1)) throw new Error('Data corruption');

        this.items.splice(taskIndex, 1);

        this.items$.next(this.items);
    }

    public async SetText(id: number, newName: string): Promise<void>
    {
        const task: ToDoTask | undefined = this.items.find((i: ToDoTask) => i.id === id);
        if (task === undefined) throw new Error('Data corruption');

        task.text = newName;

        this.items$.next(this.items);
    }

    public get TotalCount(): number
    {
        return this.items.length;
    }
}