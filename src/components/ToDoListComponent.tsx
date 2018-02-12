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
    private _toDoListPresenter: IToDoListPresenter;

    private listSubscription: Subscription;

    componentDidMount()
    {
        // this._list.Filter$.subscribe((filter: string) =>
        // {
        //     console.log('filter sub');
        //     this.forceUpdate();
        // });
        this.listSubscription = this._toDoListPresenter.Items$.subscribe((items: ToDoTask[]) =>
        {
            this.forceUpdate();
        });

    }

    componentWillUnmount()
    {
        this.listSubscription.unsubscribe();
    }

    render()
    {

        console.log('todolist cmp. render filter', this._toDoListPresenter.Filter$.value.length, '.');
        return (
            <div>
                <TextField
                    name="filter"
                    hintText="Filter"
                    value={ this._toDoListPresenter.Filter$.value }
                    onChange={ (event) => this._toDoListPresenter.SetFilter((event.target as any).value) }
                />
                { this._toDoListPresenter.Items$.value.map((t: ToDoTask) => <ToDoTaskComponent key={ t.id } task={ t } />) }
            </div>
        );
    }
}