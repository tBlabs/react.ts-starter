import { Task } from './../../models/Task';
import { guid } from '../../types/guid';
import { injectable } from "inversify";
import 'reflect-metadata';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ITasksListService } from './ITasksListService';

@injectable()
export class TasksListService implements ITasksListService
{
    public items$: BehaviorSubject<Task[]> = new BehaviorSubject([new Task('sample task #1', true), new Task('sample task #2')]);

    public get Items(): Task[]
    {
        return this.items$.value;
    }

    public get Items$(): BehaviorSubject<Task[]>
    {
        return this.items$;
    }

    public async AddExisting(task: Task): Promise<void>
    {
        this.items$.next([...this.Items, task]);
    }

    public async Add(itemName: string): Promise<void>
    {
        const task: Task = new Task(itemName);

        this.AddExisting(task);
    }

    private FindByIdOrThrow(id: guid): Task
    {
        const task: Task | undefined = this.Items.find((i: Task) => i.id === id);

        if (task === undefined) 
        {
            throw new Error('Not found');
        }

        return task;
    }

    public async Toggle(id: guid): Promise<void>
    {
        const task = this.FindByIdOrThrow(id);

        task.isDone = !task.isDone;

        this.items$.next(this.Items);
    }

    public async Delete(id: guid): Promise<void>
    {
        const taskIndex: number = this.Items.findIndex((i: Task) => i.id === id);

        if (taskIndex === (-1))
        {
            throw new Error(`Task ${ id } not found`);
        }

        this.Items.splice(taskIndex, 1);

        this.items$.next(this.Items);
    }

    public async SetText(id: guid, newName: string): Promise<void>
    {
        const task = this.FindByIdOrThrow(id);

        task.text = newName;

        this.items$.next(this.Items);
    }
}