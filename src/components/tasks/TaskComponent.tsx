import { LazyInject } from "../../IoC/IoC";
import { TasksListService } from "../../services/toDoList/TasksListService";
import * as React from "react";
import { Types } from '../../IoC/Types';
import { TextField, Checkbox, IconButton } from 'material-ui';
import { ITasksListService } from "../../services/toDoList/ITasksListService";
import { ActionGrade, ActionDelete } from "material-ui/svg-icons";
import { ISnackBar } from "../../services/snackBar/ISnackBar";
import { Task } from "../../models/Task";

interface TaskComponentProps
{
    task: Task;
}

export class TaskComponent extends React.Component<TaskComponentProps, {}>
{
    @LazyInject(Types.ITasksListService) private _tasksList: ITasksListService;
    @LazyInject(Types.ISnackBar) private _snack: ISnackBar;

    private async DeleteButton_Clicked(): Promise<void>
    {
        try
        {
            const thisTaskCopy = this.props.task;
            await this._tasksList.Delete(this.props.task.id);

            this._snack.Info('Task deleted', "UNDO", async () => { await this._tasksList.AddExisting(thisTaskCopy as Task) });
        }
        catch (ex)
        {
            console.log('Task delete ex:', ex);
        }
    }

    render()
    {
        const controlStyle = { display: "inline-block", width: "200px" };

        if (0) return (
            <div>
                <TextField
                    name="toDoText"
                    value={ this.props.task.text }
                    onChange={ async (event) => await this._tasksList.SetText(this.props.task.id, (event.target as HTMLInputElement).value) }
                    style={ controlStyle }
                />
                <Checkbox
                    label={ this.props.task.isDone ? "done" : "undone yet" } style={ controlStyle }
                    checked={ this.props.task.isDone }
                    onCheck={ async () => await this._tasksList.Toggle(this.props.task.id) }
                />
                <IconButton
                    tooltip="Delete"
                    touch={ true }
                    tooltipPosition="top-center"
                    onClick={ async () => await this.DeleteButton_Clicked() }
                >
                    <ActionDelete />
                </IconButton>
            </div>
        );
        return (
            <div>
                aaaaaaaaaaaaaaaaaaaaaaaaa
            </div>
        );
    }
}