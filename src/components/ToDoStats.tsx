import { LazyInject } from "../IoC/IoC";
import { ToDoListService } from "../services/toDoList/ToDoListService";
import * as React from "react";
import { Types } from '../IoC/Types';
import { ToDoTask } from "../models/ToDoTask";
import { ToDoTaskComponent } from "./ToDoTaskComponent";
import { TextField } from 'material-ui';
import { IToDoListService } from "../services/toDoList/IToDoListService";
import { Subscription } from 'rxjs/Subscription';
import { IToDoListPresenter } from "../presenters/IToDoListPresenter";

export class ToDoListStats extends React.Component<{}, {}>
{
    @LazyInject(Types.IToDoListPresenter)
    private _listPresenter: IToDoListPresenter;

    @LazyInject(Types.IToDoListService)
    private _listService: IToDoListService;

    private toDoListServiceSubscription: Subscription;
    private toDoListPresenterSubscription: Subscription;

    componentDidMount()
    {
        this.toDoListServiceSubscription = this._listService.Items$.subscribe((items: ToDoTask[]) =>
        {
            this.forceUpdate();
        });

        this.toDoListPresenterSubscription = this._listPresenter.Items$.subscribe((items: ToDoTask[]) =>
        {
            this.forceUpdate();
        });
    }

    componentWillUnmount()
    {
        this.toDoListServiceSubscription.unsubscribe();
        this.toDoListPresenterSubscription.unsubscribe();
    }

    render()
    {
        return (
            <div>
                Total: { this._listService.Items$.value.length } |
                Filtered: { this._listPresenter.Items$.value.length } |
                Done: { this._listPresenter.Items$.value.filter((i: ToDoTask) => i.isDone).length }
            </div>
        );
    }
}