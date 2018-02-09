import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import { LazyInject } from './../IoC/IoC';
import { ToDoListService } from '../services/toDoList/ToDoListService';
import { ToDoListComponent } from './ToDoItemsListComponent';
import { RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';

export default class App extends React.Component<{}, {}>
{
  @LazyInject(Types.IToDoListService)
  private _toDoList: ToDoListService;

  private newTaskTextInput: TextField;

  public render(): JSX.Element
  {
    return (
      <div>
        <MuiThemeProvider>

          <ToDoListComponent />

          <hr />
          <RaisedButton
            onClick={ () => this._toDoList.Add(this.newTaskTextInput.getValue()) }
            label="Add"
          />
          <TextField
            name="newTaskText"
            ref={ (input: TextField) => { this.newTaskTextInput = input } }
            defaultValue="task text"
          />
          <hr />

          <ToDoListComponent />

        </MuiThemeProvider>
      </div>
    );
  }
}
