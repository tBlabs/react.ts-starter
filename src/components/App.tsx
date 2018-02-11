import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import { LazyInject } from './../IoC/IoC';
import { ToDoListService } from '../services/toDoList/ToDoListService';
import { ToDoListComponent } from './ToDoListComponent';
import { ToDoTaskAdderComponent } from './ToDoTaskAdderComponent';
import { SnackBarComponent } from './snackBar/SnackBarComponent';
import { ToDoListStats } from './ToDoStats';
import { RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
import { Subscription } from 'rxjs';
import { ISnackBar } from '../services/snackBar/ISnackBar';

export class App extends React.Component<{}, {}>
{
  @LazyInject(Types.ISnackBar)
  private _snack: ISnackBar;

  @LazyInject(Types.IToDoListService)
  private _toDoList: ToDoListService;

  private listSubscription: Subscription;

  componentDidMount()
  {
    console.log('App.didMount' + Math.random());
    this._snack.Info('Hello!' + Math.random());

    this._toDoList.Items$.subscribe(() =>
    {
      this.forceUpdate();
    });
  }

  componentWillUnmount()
  {
    this.listSubscription.unsubscribe();
  }

  render()
  {
    let newTaskTextInput: TextField;

    return (
      <MuiThemeProvider>

        <ToDoListStats />
        <ToDoTaskAdderComponent />
        <ToDoListComponent />

        <SnackBarComponent />
      </MuiThemeProvider>
    );
  }
}
