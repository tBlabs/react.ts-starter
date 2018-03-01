import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import 'reflect-metadata';
import { Types } from '../IoC/Types';
import { ITasksListService } from '../services/toDoList/ITasksListService';
import { injectable, inject } from 'inversify';
import * as Rx from 'rxjs';
import { LazyInject } from '../IoC/IoC';
import { ITasksListPresenter } from './ITasksListPresenter';
import { Task } from '../models/Task';
import { ILocatorParams } from '../services/locator/ILocatorParams';

export class TasksListComponentLocatorParams
{
    filter: string;
}

@injectable()
export class TasksListPresenter implements ITasksListPresenter
{
    private filter$: Rx.BehaviorSubject<string> = new Rx.BehaviorSubject<string>('');
    private items$: Rx.BehaviorSubject<Task[]> = new Rx.BehaviorSubject<Task[]>([]);
    private tasksListSubscription: Subscription;
    private locatorParamsSubscription: Subscription;

    constructor(
        @inject(Types.ITasksListService) private _tasksListService: ITasksListService,
        @inject(Types.ILocatorParams) private _locatorParams: ILocatorParams<TasksListComponentLocatorParams>)
    {
        this.tasksListSubscription = this._tasksListService.Items$.subscribe((items: Task[]) =>
        {
            this.FilterItemsAndPush(items, this.Filter$.value);
        });

        this.locatorParamsSubscription = this._locatorParams.Params$.subscribe((params: TasksListComponentLocatorParams) =>
        {
            if (this._locatorParams.Params$.value)
            {
                this.SetFilter(this._locatorParams.Params$.value.filter);
            }
        });
    }

    public Dispose()
    {
        this.tasksListSubscription.unsubscribe();
        this.locatorParamsSubscription.unsubscribe();
    }

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

    public SetFilter(text: string): void
    {
        if (text === this.Filter$.value)
        {
            return;
        }

        this.Filter$.next(text);
        this.FilterItemsAndPush(this._tasksListService.Items$.value, text);
        this._locatorParams.UpdateParam('filter', text);
    }

    private FilterItemsAndPush(items: Task[], filter: string)
    {
        const filteredItems = items.filter(i => i.text.includes(filter));

        this.Items$.next(filteredItems);
    }
}