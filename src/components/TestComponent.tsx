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
import { XLocation } from '../services/location/Location';
import { ILocation } from '../services/location/ILocation';

interface TestComponentProps
{
    params: object;
}
// @When('/home')
export class TestComponent extends React.Component<TestComponentProps, {}>
{
    @LazyInject(Types.ILocation)
    private _location: XLocation;

    componentDidMount()
    {
        this._location.url$.subscribe(() => this.forceUpdate());
    }

    render()
    {

        return (
            <div>
                test comp.
                </div>
        );
    }
}