import * as React from 'react';
import { Typography, TextField, Table, TableRow, TableHead, TableCell, TableBody, Checkbox, Button } from 'material-ui';
import { LazyInject } from '../IoC/IoC';
import { Types } from '../IoC/Types';
import { Subscription } from 'rxjs';
import { ITasksListPresenter } from '../presenters/ITasksListPresenter';
import { Task } from '../models/Task';


export class TasksTableComponent extends React.Component<{}, {}>
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
        console.log('DEVICES LIST REF', this._tasksListPresenter.Items.length);
        return (

            <div style={{ float: 'left', width: '80%', display: 'block' }}>
                <Typography variant="title">
                    Lista urządzeń
                </Typography>
                <TextField
                    name="filter"
                    value={this._tasksListPresenter.Filter$.value}
                    onChange={(event) => this._tasksListPresenter.SetFilter((event.target as any).value)}
                />
                <Table style={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Task</TableCell>
                            <TableCell>Is done?</TableCell>
                            <TableCell>Added</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            this._tasksListPresenter.Items.map((t: Task) => (
                                <TableRow key={t.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={true}
                                        />
                                    </TableCell>
                                    <TableCell>{t.text}</TableCell>
                                    <TableCell>{t.isDone.toString()}</TableCell>
                                    <TableCell>1-1-2018</TableCell>
                                    <TableCell>
                                        <Button>EDIT</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button color="primary">REMOVE</Button>
                                    </TableCell>
                                </TableRow>))
                        }
                    </TableBody>
                </Table>


            </div>
        );
    }
}

/*
<Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Nazwa</TableHeaderColumn>
                                <TableHeaderColumn>Lokalizacja</TableHeaderColumn>
                                <TableHeaderColumn>Klient</TableHeaderColumn>
                                <TableHeaderColumn>Typ współpracy</TableHeaderColumn>
                                <TableHeaderColumn>Data końca</TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableRowColumn>ABC123</TableRowColumn>
                                <TableRowColumn>Piękna 24, Warszawa</TableRowColumn>
                                <TableRowColumn>Janusz Kowalski</TableRowColumn>
                                <TableRowColumn>stała</TableRowColumn>
                                <TableRowColumn>3.05.2019</TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton label="Edytuj" primary={true} /></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>ABC123</TableRowColumn>
                                <TableRowColumn>Piękna 24, Warszawa</TableRowColumn>
                                <TableRowColumn>Janusz Kowalski</TableRowColumn>
                                <TableRowColumn>stała</TableRowColumn>
                                <TableRowColumn>3.05.2019</TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton label="Edytuj" primary={true} /></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>ABC123</TableRowColumn>
                                <TableRowColumn>Piękna 24, Warszawa</TableRowColumn>
                                <TableRowColumn>Janusz Kowalski</TableRowColumn>
                                <TableRowColumn>stała</TableRowColumn>
                                <TableRowColumn>3.05.2019</TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton label="Edytuj" primary={true} />
                                    <FlatButton label="Usuń" primary={true} /></TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
*/