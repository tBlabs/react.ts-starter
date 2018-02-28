import { BehaviorSubject } from 'rxjs';
import 'reflect-metadata';
import { Types } from './../IoC/Types';
import { ITasksListService } from '../services/toDoList/ITasksListService';
import { injectable, inject } from 'inversify';
import * as Rx from 'rxjs';
import { LazyInject } from '../IoC/IoC';
import { ITasksListPresenter } from './IToDoListPresenter';
import { Task } from '../models/Task';

@injectable()
export class ToDoListPresenter implements ITasksListPresenter
{
    private filter$: Rx.BehaviorSubject<string> = new Rx.BehaviorSubject<string>('');
    private items$: Rx.BehaviorSubject<Task[]> = new Rx.BehaviorSubject<Task[]>([]);

    public get Filter$(): Rx.BehaviorSubject<string>
    {
        return this.filter$;
    }

    public get Items$(): Rx.BehaviorSubject<Task[]>
    {
        return this.items$;
    }

    public get Items(): Task[]
    {
        return this.items$.value;
    }

    constructor( @inject(Types.ITasksListService) private _toDoList: ITasksListService)
    {
        this._toDoList.Items$.subscribe((items: Task[]) =>
        {
            this.FilterItemsAndPush(items, this.Filter$.value);
        });
    }

    private FilterItemsAndPush(items: Task[], filter: string)
    {
        const filtered = items.filter(i => i.text.includes(filter));

        this.Items$.next(filtered);
    }

    public SetFilter(text: string): void
    {
        this.Filter$.next(text);

        this.FilterItemsAndPush(this._toDoList.Items$.value, text);
    }
}