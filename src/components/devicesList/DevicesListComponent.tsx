// import * as React from 'react';
// import { Typography, TextField, Table, TableRow, TableHead, TableCell, TableBody, Checkbox, Button } from 'material-ui';
// import { LazyInject } from '../IoC/IoC';
// import { Types } from '../IoC/Types';
// import { Subscription } from 'rxjs';
// import { ITasksListPresenter } from '../presenters/ITasksListPresenter';
// import { Task } from '../models/Task';

// export class TasksTableComponent extends React.Component<{}, {}>
// {
//     @LazyInject(Types.ITasksListPresenter) private _tasksListPresenter: ITasksListPresenter;

//     private tasksListPresenterSubscription: Subscription;

//     componentDidMount()
//     {
//         this.tasksListPresenterSubscription = this._tasksListPresenter.Items$.subscribe((items: Task[]) => this.forceUpdate());
//     }

//     componentWillUnmount()
//     {
//         this.tasksListPresenterSubscription.unsubscribe();
//         this._tasksListPresenter.Dispose();
//     }

//     render()
//     {
//         console.log('DEVICES LIST REF', this._tasksListPresenter.Items.length);
//         return (
//             <div style={{ float: 'left', width: '80%', display: 'block' }}>
//                 <Typography variant="title">
//                     Tasks list
//             </Typography>
//                 <TextField
//                     name="filter"
//                     value={this._tasksListPresenter.Filter$.value}
//                     onChange={(event) => this._tasksListPresenter.SetFilter((event.target as any).value)}
//                 />
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Nazwa</TableCell>
//                             <TableCell>Lokalizacja</TableCell>
//                             <TableCell>Klient</TableCell>
//                             <TableCell>Typ współpracy</TableCell>
//                             <TableCell>Data końca</TableCell>
//                             <TableCell></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <TableRow>
//                             <TableCell>ABC123</TableCell>
//                             <TableCell>Piękna 24, Warszawa</TableCell>
//                             <TableCell>Janusz Kowalski</TableCell>
//                             <TableCell>stała</TableCell>
//                             <TableCell>3.05.2019</TableCell>
//                             <TableCell>
//                                 <Button color="primary" >Edytuj</Button>
//                             </TableCell>
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//             </div>
//         );
//     }
// }

// /*
// */