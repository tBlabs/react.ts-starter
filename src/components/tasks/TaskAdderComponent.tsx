import { Types } from '../../IoC/Types';
import { SampleService } from '../../services/_samples/SampleService';
import * as React from 'react';
import { TasksListService } from '../../services/toDoList/TasksListService';
import { TasksListComponent } from './TasksListComponent';
import { RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
import { ISnackBar } from '../../services/snackBar/ISnackBar';
import { LazyInject } from '../../IoC/IoC';

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
        let newTaskTextInput: TextField;

        return (
            <div>
                <hr />
                <TextField
                    name="newTaskText"
                    hintText="New task text"
                    defaultValue="default"
                    ref={ (input: TextField) => { newTaskTextInput = input } }
                />
                <RaisedButton
                    label="Add"
                    onClick={ () => this.AddNewTaskButton_Clicked(newTaskTextInput.getValue()) }
                />
                <hr />
            </div>
        );
    }
}
