import { LazyInject } from "../../IoC/IoC";
import { TasksListService } from "../../services/toDoList/TasksListService";
import * as React from "react";
import { Types } from '../../IoC/Types';
import { TextField } from 'material-ui';
import { ITasksListService } from "../../services/toDoList/ITasksListService";
import { Subscription } from 'rxjs/Subscription';
import { ITasksListPresenter } from "../../presenters/ITasksListPresenter";
import { Task } from "../../models/Task";
import { TaskComponent } from './TaskComponent';

export class TasksListComponent extends React.Component<{}, {}>
{
    @LazyInject(Types.ITasksListPresenter) private _tasksListPresenter: ITasksListPresenter;

    private tasksListPresenterSubscription: Subscription;

    componentDidMount()
    {
        this.tasksListPresenterSubscription = this._tasksListPresenter.Items$.subscribe((items: Task[]) => this.forceUpdate());
    }

    componentWillUnmount()
    {
        this.tasksListPresenterSubscription.unsubscribe();
        this._tasksListPresenter.Dispose();
    }

    render()
    {
        return (
            <div>
                <TextField
                    name="filter"
                    hintText="Filter"
                    value={ this._tasksListPresenter.Filter$.value }
                    onChange={ (event) => this._tasksListPresenter.SetFilter((event.target as any).value) }
                />
                { this._tasksListPresenter.Items.map((t: Task) => <TaskComponent key={ t.id } task={ t } />) }
            </div>
        );
    }
}