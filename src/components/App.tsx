import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import { LazyInject } from './../IoC/IoC';
import { ToDoListService } from '../services/toDoList/ToDoListService';
import { ToDoListComponent } from './ToDoListComponent';
import { TestComponent } from './TestComponent';
import { ToDoListFrameComponent } from './ToDoListFrameComponent';
import { ToDoTaskAdderComponent } from './ToDoTaskAdderComponent';
import { SnackBarComponent } from './snackBar/SnackBarComponent';
import { ToDoListStats } from './ToDoStats';
import { RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
import { Subscription } from 'rxjs';
import { ISnackBar } from '../services/snackBar/ISnackBar';
import { XLocation } from '../services/location/Location';
import { ILocation } from '../services/location/ILocation';

export class App extends React.Component<{}, {}>
{
  @LazyInject(Types.ISnackBar)
  private _snack: ISnackBar;

  @LazyInject(Types.ILocation)
  private _location: XLocation;
  private locationSubscription: Subscription;

  componentDidMount()
  {
    this._snack.Info('Hello!');

    this.locationSubscription = this._location.url$.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount()
  {
    this.locationSubscription.unsubscribe();
  }

  render()
  {
    return (
      <MuiThemeProvider>
        <div>
          window.location: { this._location.url$.value }
          <hr />
          <RaisedButton
            onClick={ () => this._location.JumpTo('/home') }
            label="Home"
          />
          <RaisedButton
            onClick={ () => this._location.JumpTo('/a/b/c') }
            label="a/b/c"
          />
          <RaisedButton
            onClick={ () => this._location.JumpTo('/about') }
            label="About"
          />
          <RaisedButton
            onClick={ () => this._location.JumpTo('/home/43') }
            label="Home/43"
          />
          <RaisedButton
            onClick={ () => this._location.JumpTo('/todo') }
            label="todo"
          />
          { this._location.UrlBeginsWith('/home') && <TestComponent params={ this._location.Extract('^/home/([0-9]+)') } /> }
          { this._location.UrlIs('/home/me') && <p>only if /home/me</p> }
          <hr />
          { this._location.UrlIs('/todo') && <ToDoListFrameComponent /> }
        </div>
        <SnackBarComponent />
      </MuiThemeProvider>
    );
  }
}

