import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import { LazyInject } from './../IoC/IoC';
import { TasksListService } from '../services/toDoList/TasksListService';
import { SnackBarComponent } from './snackBar/SnackBarComponent';
// import { Subscription } from 'rxjs';
import { ISnackBar } from '../services/snackBar/ISnackBar';
import { TestComponent } from './TestComponent';
import { TasksListContainerComponent } from './tasks/TasksListContainerComponent';
import { JumpComponent } from './jump/JumpComponent';
import { JumpButton } from './jump/JumpButton';
import { ILocator } from '../services/locator/ILocator';
import { Sample1Component } from './_samples/SampleComponent';
import { Location } from './../router/Location';
import { TasksTableComponent } from './TasksTableComponent';
import { AddDeviceComponent } from './AddDeviceComponent';
import { LocationData } from '../router/LocationData';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { TaskAdderComponent } from './tasks/TaskAdderComponent';
import { LoginComponent } from './login/LoginComponent';
import { TasksListStats } from './tasks/TasksStats';
import { UsersPageComponent } from './usersList/UsersPageComponent';
import { IAuthService } from '../services/auth/IAuthService';


export class App extends React.Component<{}, {}>
{
  @LazyInject(Types.ISnackBar) private _snack: ISnackBar;
  @LazyInject(Types.ILocator) private _locator: ILocator;
  @LazyInject(Types.IAuthService) private _auth: IAuthService;

  // private locatorSubscription: Subscription;

  componentDidMount()
  {
    this._snack.Info('Hello!');

    // this.locatorSubscription = 
    this._locator.Location$.subscribe((loc: LocationData) =>
    {
      this.forceUpdate();
    });
  }

  componentWillUnmount()
  {
    // this.locatorSubscription.unsubscribe(  );
  }

  private LogoutButton_Click()
  {
    this._auth.Logout();
    this.forceUpdate();
  }

  render()
  {
    if (!this._auth.IsLoggedIn) return <LoginComponent />;
    else
      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography style={{ flex: 1 }} variant="title" color="inherit">
                Title
          </Typography>
              <Button color="inherit" onClick={() => this.LogoutButton_Click()}>Logout</Button>
            </Toolbar>
          </AppBar>
          <UsersPageComponent />
          <SnackBarComponent />
        </div>
      );
  }
}
/*
          <Drawer open={true}>
            <MenuItem>Devices list</MenuItem>
            <MenuItem>Users</MenuItem>
          </Drawer>


           location params: {JSON.stringify(this._locator.Location.params)}
          <hr />
          <JumpButton label="tasks list" location={Location.Tasks} />
          <JumpButton label="s1" location={Location.SamplePath1} />
          <JumpButton label="s2" location={Location.SamplePath2} />
          <hr />
          {this._locator.Is(Location.SamplePath1) && <div>Sample Location #1</div>}
          {this._locator.Is(Location.SamplePath2) && <div>Sample Location #2</div>}
          <RaisedButton
            onClick={() => this._locator.GoTo(Location.SamplePath1)}
            label="SampleLocation1"
          />
          <RaisedButton
            onClick={() => this._locator.GoTo(Location.SamplePath2, { foo: "bar" })}
            label="SampleLocation2 + foo=bar"
          />
          <RaisedButton
            onClick={() => this._locator.GoTo(Location.SamplePath2, { foo: "bazz" })}
            label="SampleLocation2 + foo=bazz"
          />
          {this._locator.Is(Location.SamplePath2) && <Sample1Component />}
          {this._locator.Is(Location.Tasks) && <TasksListContainerComponent />}
*/