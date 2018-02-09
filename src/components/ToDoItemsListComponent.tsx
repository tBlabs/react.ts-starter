import { LazyInject } from "../IoC/IoC";
import { ToDoListService } from "../services/toDoList/ToDoListService";
import * as React from "react";
import { Types } from './../IoC/Types';
import { ToDoTask } from "../models/ToDoTask";
import { ToDoTaskComponent } from "./ToDoTaskComponent";

interface ToDoListComponentState
{
    list: ToDoTask[];
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
    }

    componentDidMount()
    {
        this._toDoList.Items.subscribe((items) =>
        {
            this.setState({ list: items });
        });
    }

    render()
    {
        return (
            <div>
                { this.state.list.map((t: ToDoTask) => <ToDoTaskComponent key={ t.id } task={ t } />) }
            </div>
        );
    }
}