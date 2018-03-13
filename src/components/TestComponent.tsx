import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import { LazyInject } from './../IoC/IoC';
import { TasksListService } from '../services/toDoList/TasksListService';
import { TasksListComponent } from './tasks/TasksListComponent';
import { TaskAdderComponent } from './tasks/TaskAdderComponent';
import { SnackBarComponent } from './snackBar/SnackBarComponent';
import { RaisedButton, FlatButton, TableHeader, Table, TableHeaderColumn, TableRow, TableBody, TableRowColumn, FloatingActionButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
import { Subscription } from 'rxjs';
import { ISnackBar } from '../services/snackBar/ISnackBar';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { inject } from 'inversify';
import { ITestComponentParams } from '../extractors/testComponent/ITestComponentParams';
import { Dialog } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';

export class TestComponent extends React.Component<{}, {}>
{
    // @LazyInject(Types.ITestComponentParams) private _routerParams: ITestComponentParams;

    // private routerParamsSubscription: Subscription;
    constructor()
    {
        super({});

        this.state = { dialog: true, dialog2: true };
    }

    componentDidMount()
    {
        // this.routerParamsSubscription = this._routerParams.Params$.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount()
    {
        // this.routerParamsSubscription.unsubscribe();
    }

    private Button_Clicked()
    {
        this.setState({ dialog: false });
        // console.log('click');
        // let obj = { ...this._routerParams.Params$.value, num: this._routerParams.Params$.value.num += 1 };
        // console.log(obj);
        // this._routerParams.Params$.next(obj);

        // this._routerParams.NumericParam = 5;
    }

    render()
    {
        const closeButton = <RaisedButton label="Close" onClick={() => this.setState({ dialog: false })} />

        return (
            <div>
                {/* TestComponent: params.str={ this._routerParams.Params$.value.str } */}
                {/* TestComponent: params.num={ this._routerParams.Params$.value.num.toString() } */}
                <RaisedButton label="url.num++"
                    onClick={() => this.Button_Clicked()} />
                <RaisedButton label="dialog"
                    onClick={() => { this.setState({ dialog: true }) }} />
                <Dialog
                    actions={[]}
                    title="Login" open={this.state.dialog} modal={true}>
                    <TextField
                        name="newTaskText"
                        hintText="@"
                        defaultValue=""
                        ref={(input: TextField) => { }}
                    />
                    <br />
                    <TextField
                        name="newTaskText"
                        hintText="Password"
                        defaultValue=""
                        ref={(input: TextField) => { }}
                    />
                    <br />
                    <RaisedButton label="Login"
                        primary={true}
                        onClick={() => this.Button_Clicked()} />
                    <FlatButton label="Remind password"
                        onClick={() => { }} />
                    <Dialog
                        contentStyle={{ width: '80%', maxWidth: 'none' }}
                        actions={[]}
                        title="Lista urządzeń" open={this.state.dialog2} modal={true}>

                    </Dialog>
                </Dialog>
            </div>
        );
    }
}