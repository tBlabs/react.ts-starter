import { LazyInject } from '../../IoC/IoC';
import { Types } from '../../IoC/Types';
import { SampleService } from '../../services/_samples/SampleService';
import * as React from 'react';
import { TasksListService } from '../../services/toDoList/TasksListService';
import { TestComponent } from '../TestComponent';
import { SnackBarComponent } from '../snackBar/SnackBarComponent';
import { RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
import { Subscription } from 'rxjs';
import { ISnackBar } from '../../services/snackBar/ISnackBar';
import { TasksListStats } from './TasksStats';
import { TaskAdderComponent } from './TaskAdderComponent';
import { TasksListComponent } from './TasksListComponent';

export class TasksListContainerComponent extends React.Component<{}, {}>
{
    @LazyInject(Types.ITasksListService) private _tasksList: TasksListService;

    private listSubscription: Subscription;

    componentDidMount()
    {
        this.listSubscription = this._tasksList.Items$.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount()
    {
        this.listSubscription.unsubscribe();
    }

    render()
    {
        return (
            <div>
                <TasksListStats />
                <TaskAdderComponent />
                <TasksListComponent />
            </div>
        );
    }
}