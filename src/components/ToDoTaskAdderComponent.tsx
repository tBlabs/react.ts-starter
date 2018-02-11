import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import { LazyInject } from './../IoC/IoC';
import { ToDoListService } from '../services/toDoList/ToDoListService';
import { ToDoListComponent } from './ToDoListComponent';
import { RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
import { ISnackBar } from '../services/snackBar/ISnackBar';

export class ToDoTaskAdderComponent extends React.PureComponent<{}, {}>
{
    @LazyInject(Types.IToDoListService)
    private _toDoList: ToDoListService;

    @LazyInject(Types.ISnackBar)
    private _snack: ISnackBar;

    private AddNewTaskButton_Clicked(newTaskText: string): void
    {
        if (newTaskText === '')
        {
            this._snack.Info('Can not add empty task');
        }
        else
        {
            this._toDoList.Add(newTaskText);
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
                    ref={ (input: TextField) => { newTaskTextInput = input } }
                    hintText="New task text"
                    defaultValue="default"
                />
                <RaisedButton
                    onClick={ () => this.AddNewTaskButton_Clicked(newTaskTextInput.getValue()) }
                    label="Add"
                />
                <hr />
            </div>
        );
    }
}
