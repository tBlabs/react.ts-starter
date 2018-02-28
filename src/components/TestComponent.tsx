import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import { LazyInject } from './../IoC/IoC';
import { TasksListService } from '../services/toDoList/TasksListService';
import { TasksListComponent } from './tasks/TasksListComponent';
import { TaskAdderComponent } from './tasks/TaskAdderComponent';
import { SnackBarComponent } from './snackBar/SnackBarComponent';
import { RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
import { Subscription } from 'rxjs';
import { ISnackBar } from '../services/snackBar/ISnackBar';
import { Location } from '../services/location/Location';
import { ILocation } from '../services/location/ILocation';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { inject } from 'inversify';
import { ITestComponentParams } from '../extractors/testComponent/ITestComponentParams';

export class TestComponent extends React.Component<{}, {}>
{
    @LazyInject(Types.ITestComponentParams) private _routerParams: ITestComponentParams;

    private routerParamsSubscription: Subscription;

    componentDidMount()
    {
        this.routerParamsSubscription = this._routerParams.Params$.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount()
    {
        this.routerParamsSubscription.unsubscribe();
    }

    private Button_Clicked()
    {
        // console.log('click');
        let obj = { ...this._routerParams.Params$.value, num: this._routerParams.Params$.value.num += 1 };
        // console.log(obj);
        this._routerParams.Params$.next(obj);

        // this._routerParams.NumericParam = 5;
    }

    render()
    {
        return (
            <div>
                TestComponent: params.str={ this._routerParams.Params$.value.str }
                TestComponent: params.num={ this._routerParams.Params$.value.num.toString() }
                <RaisedButton label="url.num++"
                    onClick={ () => this.Button_Clicked() } />
            </div>
        );
    }
}