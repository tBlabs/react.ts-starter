import { Types } from '../../IoC/Types';
import { SampleService } from '../../services/_samples/SampleService';
import * as React from 'react';
import { TasksListService } from '../../services/toDoList/TasksListService';
import { TasksListComponent } from './TasksListComponent';
import { MuiThemeProvider } from 'material-ui/styles';
import { ISnackBar } from '../../services/snackBar/ISnackBar';
import { LazyInject } from '../../IoC/IoC';
import { TextField, Button } from 'material-ui';

export class TaskAdderComponent extends React.PureComponent<{}, {}>
{
    @LazyInject(Types.ITasksListService) private _tasksList: TasksListService;
    @LazyInject(Types.ISnackBar) private _snack: ISnackBar;

    private async AddNewTaskButton_Clicked(newTaskText: string): Promise<void>
    {
        if (newTaskText === '')
        {
            this._snack.Info('Can not add empty task');
        }
        else
        {
            await this._tasksList.Add(newTaskText);
        }
    }
    render()
    {
        let newTaskInput: any;

        return (
            <div>
                <hr />
                <TextField
                    name="newTaskText"
                    defaultValue="default"
                    inputRef={i => newTaskInput = i}
                />
                <Button
                    onClick={() => this.AddNewTaskButton_Clicked(newTaskInput.value)}
                >
                    Add
                </Button>
                <hr />
            </div>
        );
    }
}
