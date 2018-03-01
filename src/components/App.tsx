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
import { TestComponent } from './TestComponent';
import { TasksListContainerComponent } from './tasks/TasksListContainerComponent';
import { JumpComponent } from './jump/JumpComponent';
import { JumpButton } from './jump/JumpButton';
import { ILocator } from '../services/locator/ILocator';
import { Sample1Component } from './_samples/SampleComponent';
import { Location } from './../router/Location';

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
      console.log('app.mount loc:', loc);

      this.forceUpdate();
    });
  }

  componentWillUnmount()
  {
    this.locatorSubscription.unsubscribe();
  }

  // render()
  // {
  //   return (
  //     <MuiThemeProvider>
  //       <div>
  //         window.location: { this._location.Url$.value }
  //         <hr />
  //         <RaisedButton
  //           onClick={ () => this._location.JumpTo('/home') }
  //           label="Home"
  //         />
  //         <RaisedButton
  //           onClick={ () => this._location.JumpTo('/a/b/c') }
  //           label="a/b/c"
  //         />
  //         <RaisedButton
  //           onClick={ () => this._location.JumpTo('/url/with/params/foo/14/true') }
  //           label="/foo/.."
  //         />
  //         <RaisedButton
  //           onClick={ () => this._location.JumpTo('/url/with/params/bar/2414/false') }
  //           label="bar.."
  //         />
  //         <JumpComponent label="home/43" jumpTo="/home/43" />
  //         <JumpComponent label="todo" jumpTo="/todo" />
  //         <JumpComponent label="123" jumpTo="/123" />
  //         { this._location.UrlBeginsWith('/url/with/params') && <div><TestComponent /></div> }
  //         { this._location.UrlIs('/home/me') && <p>only if /home/me</p> }
  //         {/* { this._location.Is(Location.SampleLocation) && <p>Sample Location</p> } */ }
  //         <hr />
  //         { this._location.UrlIs('/todo') && <TasksListContainerComponent /> }
  //         <SnackBarComponent />
  //       </div>
  //     </MuiThemeProvider>
  //   );
  // }
  render()
  {
    return (
      <MuiThemeProvider>
        <div>
          {/* location params: { JSON.stringify(this._locator.Location$.value.params) } */ }
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
          <SnackBarComponent />
        </div>
      </MuiThemeProvider>
    );
  }
}
