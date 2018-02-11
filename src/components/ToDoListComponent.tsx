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

export class ToDoListComponent extends React.Component<{}, {}>
{
    @LazyInject(Types.IToDoListPresenter)
    private _list: IToDoListPresenter;

    private listSubscription: Subscription;

    componentDidMount()
    {
        this.listSubscription = this._list.Items$.subscribe((items: ToDoTask[]) =>
        {
            this.forceUpdate();
        })
    }

    componentWillUnmount()
    {
        this.listSubscription.unsubscribe();
    }

    render()
    {
        return (
            <div>
                <TextField
                    name="filter"
                    hintText="Filter"
                    onChange={ (event) => this._list.SetFilter((event.target as any).value) }
                />
                { this._list.Items$.value.map((t: ToDoTask) => <ToDoTaskComponent key={ t.id } task={ t } />) }
            </div>
        );
    }
}