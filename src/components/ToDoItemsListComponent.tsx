import { LazyInject } from "../IoC/IoC";
import { ToDoListService } from "../services/toDoList/ToDoListService";
import * as React from "react";
import { Types } from './../IoC/Types';

interface ToDoListComponentState
{
    list: string[];
}

export class ToDoListComponent extends React.Component<{}, ToDoListComponentState>
{
    @LazyInject(Types.IToDoListService)
    private _toDoList: ToDoListService;

    private initialState = { list: [] };

    constructor(props: {})
    {
        super(props);

        this.state = this.initialState;

        this._toDoList.Items.subscribe((items) =>
        {
            this.setState({ list: items });
        });
    }

    render()
    {
        return (
            <div>
                { this.state.list.map(i => (<p key={ i }>{ i }</p>)) }
            </div>
        );
    }
}