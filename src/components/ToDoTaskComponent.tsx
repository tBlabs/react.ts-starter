import { LazyInject } from "../IoC/IoC";
import { ToDoListService } from "../services/toDoList/ToDoListService";
import * as React from "react";
import { Types } from './../IoC/Types';
import { ToDoTask } from "../models/ToDoTask";
import { TextField, Checkbox, IconButton } from 'material-ui';
import { IToDoListService } from "../services/toDoList/IToDoListService";
import { ActionGrade, ActionDelete } from "material-ui/svg-icons";

interface ToDoTaskComponentProps
{
    task: ToDoTask;
}

export class ToDoTaskComponent extends React.Component<ToDoTaskComponentProps, {}>
{
    @LazyInject(Types.IToDoListService)
    private _toDoList: IToDoListService;

    render()
    {
        const controlStyle = { display: "inline-block", width: "200px" };

        return (
            <div>
                <TextField
                    name="aaa"
                    style={ controlStyle }
                    value={ this.props.task.text }
                    onChange={ async (event) => await this._toDoList.SetText(this.props.task.id, (event.target as HTMLInputElement).value) }
                />
                <Checkbox
                    label={ this.props.task.isDone ? "done" : "undone yet" } style={ controlStyle }
                    checked={ this.props.task.isDone }
                    onCheck={ async () => await this._toDoList.Toggle(this.props.task.id) }
                />
                <IconButton
                    tooltip="Delete"
                    touch={ true }
                    tooltipPosition="top-center"
                    onClick={ async () => await this._toDoList.Delete(this.props.task.id) }
                >
                    <ActionDelete />
                </IconButton>
            </div>
        );
    }
}