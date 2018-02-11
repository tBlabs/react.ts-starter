import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import { LazyInject } from './../IoC/IoC';
import { ToDoListService } from '../services/toDoList/ToDoListService';
import { ToDoListComponent } from './ToDoListComponent';
import { ToDoTaskAdderComponent } from './ToDoTaskAdderComponent';
import { RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';

export class App extends React.Component<{}, {}>
{
  @LazyInject(Types.IToDoListService)
  private _toDoList: ToDoListService;

  componentDidMount()
  {
    this._toDoList.Items$.subscribe(() =>
    {
      this.forceUpdate();
    });
  }

  render()
  {
    let newTaskTextInput: TextField;

    return (
      <div>
        <MuiThemeProvider>

          <ToDoListComponent />

          <ToDoTaskAdderComponent />

          total: { this._toDoList.TotalCount.toString() }

        </MuiThemeProvider>
      </div>
    );
  }
}
