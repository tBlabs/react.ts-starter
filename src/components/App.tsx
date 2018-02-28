import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import { LazyInject } from './../IoC/IoC';
import { TasksListService } from '../services/toDoList/TasksListService';
import { SnackBarComponent } from './snackBar/SnackBarComponent';
import { RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
import { Subscription } from 'rxjs';
import { ISnackBar } from '../services/snackBar/ISnackBar';
import { Location } from '../services/location/Location';
import { ILocation } from '../services/location/ILocation';
import { TestComponent } from './TestComponent';
import { TasksListContainerComponent } from './tasks/TasksListContainerComponent';
import { JumpComponent } from './jump/JumpComponent';

export class App extends React.Component<{}, {}>
{
  @LazyInject(Types.ISnackBar) private _snack: ISnackBar;
  @LazyInject(Types.ILocation) private _location: Location;

  private locationSubscription: Subscription;

  componentDidMount()
  {
    this._snack.Info('Hello!');

    this.locationSubscription = this._location.Url$.subscribe(() => this.forceUpdate());
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
          window.location: { this._location.Url$.value }
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
            onClick={ () => this._location.JumpTo('/url/with/params/foo/14/true') }
            label="/foo/.."
          />
          <RaisedButton
            onClick={ () => this._location.JumpTo('/url/with/params/bar/2414/false') }
            label="bar.."
          />
          <JumpComponent label="home/43" jumpTo="/home/43" />
          <JumpComponent label="todo" jumpTo="/todo" />
          <JumpComponent label="123" jumpTo="/123" />
          { this._location.UrlBeginsWith('/url/with/params') && <div><TestComponent /></div> }
          { this._location.UrlIs('/home/me') && <p>only if /home/me</p> }
          {/* { this._location.Is(Location.SampleLocation) && <p>Sample Location</p> } */ }
          <hr />
          { this._location.UrlIs('/todo') && <TasksListContainerComponent /> }
          <SnackBarComponent />
        </div>
      </MuiThemeProvider>
    );
  }
}
