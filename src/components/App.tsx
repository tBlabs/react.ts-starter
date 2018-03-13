import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import { LazyInject } from './../IoC/IoC';
import { TasksListService } from '../services/toDoList/TasksListService';
import { SnackBarComponent } from './snackBar/SnackBarComponent';
import { RaisedButton, AppBar, Drawer, MenuItem } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
import { Subscription } from 'rxjs';
import { ISnackBar } from '../services/snackBar/ISnackBar';
import { TestComponent } from './TestComponent';
import { TasksListContainerComponent } from './tasks/TasksListContainerComponent';
import { JumpComponent } from './jump/JumpComponent';
import { JumpButton } from './jump/JumpButton';
import { ILocator } from '../services/locator/ILocator';
import { Sample1Component } from './_samples/SampleComponent';
import { Location } from './../router/Location';
import { Typography } from 'material-ui/styles/typography';

export class App extends React.Component<{}, {}>
{
  @LazyInject(Types.ISnackBar) private _snack: ISnackBar;
  // @LazyInject(Types.ILocation) private _location: Location;
  @LazyInject(Types.ILocator) private _locator: ILocator;

  private locatorSubscription: Subscription;

  componentDidMount()
  {
    this._snack.Info('Hello!');

    this.locatorSubscription = this._locator.Location$.subscribe((loc) =>
    {
      this.forceUpdate();
    });
  }

  componentWillUnmount()
  {
    this.locatorSubscription.unsubscribe();
  }

  render()
  {
    return (
      <MuiThemeProvider>
        <div style={ { backgroundColor: 'red' } }>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Drawer open={ true }>


            <MenuItem>Devices list</MenuItem>
            <MenuItem>Users</MenuItem>
          </Drawer>
          location params: { JSON.stringify(this._locator.Location.params) }
          <hr />
          <JumpButton label="tasks list" location={ Location.Tasks } />
          <JumpButton label="s1" location={ Location.SamplePath1 } />
          <JumpButton label="s2" location={ Location.SamplePath2 } />
          <hr />
          { this._locator.Is(Location.SamplePath1) && <div>Sample Location #1</div> }
          { this._locator.Is(Location.SamplePath2) && <div>Sample Location #2</div> }
          <RaisedButton
            onClick={ () => this._locator.GoTo(Location.SamplePath1) }
            label="SampleLocation1"
          />
          <RaisedButton
            onClick={ () => this._locator.GoTo(Location.SamplePath2, { foo: "bar" }) }
            label="SampleLocation2 + foo=bar"
          />
          <RaisedButton
            onClick={ () => this._locator.GoTo(Location.SamplePath2, { foo: "bazz" }) }
            label="SampleLocation2 + foo=bazz"
          />
          { this._locator.Is(Location.SamplePath2) && <Sample1Component /> }
          { this._locator.Is(Location.Tasks) && <TasksListContainerComponent /> }
          <TestComponent />
          <SnackBarComponent />
        </div>
      </MuiThemeProvider >
    );
  }
}
