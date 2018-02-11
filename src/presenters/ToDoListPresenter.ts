import { BehaviorSubject } from 'rxjs';
import 'reflect-metadata';
import { Types } from './../IoC/Types';
import { IToDoListService } from './../services/toDoList/IToDoListService';
import { injectable, inject } from 'inversify';
import { ToDoTask } from './../models/ToDoTask';
import * as Rx from 'rxjs';
import { LazyInject } from '../IoC/IoC';
import { IToDoListPresenter } from './IToDoListPresenter';

@injectable()
export class ToDoListPresenter implements IToDoListPresenter
{
    private filter$: Rx.BehaviorSubject<string> = new Rx.BehaviorSubject<string>('');
    private items$: Rx.BehaviorSubject<ToDoTask[]> = new Rx.BehaviorSubject<ToDoTask[]>([]);

    public get Filter$(): Rx.BehaviorSubject<string>
    {
        return this.filter$;
    }

    public get Items$(): Rx.BehaviorSubject<ToDoTask[]>
    {
        return this.items$;
    }

    constructor( @inject(Types.IToDoListService) private _toDoList: IToDoListService)
    {
        this._toDoList.Items$.subscribe((items: ToDoTask[]) =>
        {
            this.FilterItemsAndPush(items, this.Filter$.value);
        });
    }

    private FilterItemsAndPush(items: ToDoTask[], filter: string)
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