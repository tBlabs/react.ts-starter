import { LazyInject } from "../IoC/IoC";
import { ToDoListService } from "../services/toDoList/ToDoListService";
import * as React from "react";
import { Types } from '../IoC/Types';
import { ToDoTask } from "../models/ToDoTask";
import { ToDoTaskComponent } from "./ToDoTaskComponent";
import { TextField } from 'material-ui';
import { IToDoListService } from "../services/toDoList/IToDoListService";
import { Subscription } from 'rxjs/Subscription';

interface ToDoListComponentState
{
    list: ToDoTask[];
}

export class ToDoListComponent extends React.Component<{}, ToDoListComponentState>
{
    @LazyInject(Types.IToDoListService)
    private _toDoList: IToDoListService;

    filter: TextField;
    private toDoListSubscription: Subscription;

    private initialState = { list: [] };

    constructor(props: {})
    {
        super(props);

        this.state = this.initialState;
    }

    componentDidMount()
    {
        this.toDoListSubscription = this._toDoList.Items$.subscribe((items: ToDoTask[]) =>
        {
            const filter = this.filter.getValue();

            this.setState({ list: items.filter((i: ToDoTask) => i.text.includes(filter)) });
        });
    }

    componentWillUnmount()
    {
        this.toDoListSubscription.unsubscribe();
    }

    private FilterTextField_Changed(filter: string): void
    {
        const items = this._toDoList.Items.filter((i: ToDoTask) => i.text.includes(filter));

        this.setState({ list: items });
    }

    render()
    {
        return (
            <div>
                <TextField
                    name="filter"
                    ref={ (input: TextField) => this.filter = input }
                    hintText="Filter"
                    onChange={ (event) => this.FilterTextField_Changed((event.target as any).value) }
                />
                { this.state.list.map((t: ToDoTask) => <ToDoTaskComponent key={ t.id } task={ t } />) }
            </div>
        );
    }
}