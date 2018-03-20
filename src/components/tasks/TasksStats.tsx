import { LazyInject } from "../../IoC/IoC";
import { TasksListService } from "../../services/toDoList/TasksListService";
import * as React from "react";
import { Types } from '../../IoC/Types';
import { TextField } from 'material-ui';
import { ITasksListService } from "../../services/toDoList/ITasksListService";
import { Subscription } from 'rxjs/Subscription';
import { ITasksListPresenter } from "../../presenters/ITasksListPresenter";
import { Task } from "../../models/Task";

export class TasksListStats extends React.Component<{}, {}>
{
    @LazyInject(Types.ITasksListPresenter) private _listPresenter: ITasksListPresenter;
    @LazyInject(Types.ITasksListService) private _listService: ITasksListService;

    private tasksListServiceSubscription: Subscription;
    private tasksListPresenterSubscription: Subscription;

    componentDidMount()
    {
        this.tasksListServiceSubscription = this._listService.Items$.subscribe((items: Task[]) =>
        {
            this.forceUpdate();
        });

        this.tasksListPresenterSubscription = this._listPresenter.Items$.subscribe((items: Task[]) =>
        {
            this.forceUpdate();
        });
    }

    componentWillUnmount()
    {
        this.tasksListServiceSubscription.unsubscribe();
        this.tasksListPresenterSubscription.unsubscribe();
    }

    render()
    {
        return (
            <div>
                Total: {this._listService.Items.length} |
                Filtered: {this._listPresenter.Items.length} |
                Done: {this._listPresenter.Items.filter((i: Task) => i.isDone).length}
            </div>
        );
    }
}