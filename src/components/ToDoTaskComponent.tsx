import { LazyInject } from "../IoC/IoC";
import { ToDoListService } from "../services/toDoList/ToDoListService";
import * as React from "react";
import { Types } from './../IoC/Types';
import { ToDoTask } from "../models/ToDoTask";
import { TextField, Checkbox } from 'material-ui';

interface ToDoTaskComponentProps
{
    task: ToDoTask;
}

export class ToDoTaskComponent extends React.Component<ToDoTaskComponentProps, {}>
{
    @LazyInject(Types.IToDoListService)
    private _toDoList: ToDoListService;

    render()
    {
        const controlStyle = { display: "inline-block", width: "200px" };

        return (
            <div>
                <TextField style={ controlStyle }
                    value={ this.props.task.text }
                    onChange={ (event) => this._toDoList.SetText(this.props.task.id, (event.target as HTMLInputElement).value) }
                />
                <Checkbox
                    label={ this.props.task.isDone ? "done" : "undone yet" } style={ controlStyle }
                    checked={ this.props.task.isDone }
                    onCheck={ () => this._toDoList.Toggle(this.props.task.id) }
                />
            </div>
        );
    }
}