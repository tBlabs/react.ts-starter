import * as React from 'react';
import { Typography, TextField, Table, TableRow, TableHead, TableCell, TableBody, Checkbox, Button, TableFooter } from 'material-ui';
import { LazyInject } from '../../IoC/IoC';
import { Types } from '../../IoC/Types';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';
import { guid } from '../../types/guid';
import { ReactNode } from 'react';
import { IListPresenter } from '../../presenters/IListPresenter';
import { IStorable } from './../../interfaces/IStorable';

interface DataTableComponentProps<T>
{
    listPresenter: IListPresenter<T>;
    fields: string[];
    headers: string[];
}

export class ListComponent<T extends IStorable> extends React.Component<DataTableComponentProps<T>, {}>
{
    constructor(props: DataTableComponentProps<T>)
    {
        super(props);
    }

    private subscription: Subscription;

    componentDidMount()
    {
        this.subscription = this.props.listPresenter.VisibleItems.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount()
    {
        this.subscription.unsubscribe();
    }

    private Prev_Clicked()
    {
        this.props.listPresenter.Prev();
    }

    private Next_Clicked()
    {
        this.props.listPresenter.Next();
    }

    render()
    {
        const presenter = this.props.listPresenter;

        return (
            <div>
                <Table style={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            {
                                this.props.headers.map(h => <TableCell key={h}>{h}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            presenter.VisibleItems.value.map((i: T) => (
                                <TableRow key={i.id} >
                                    {
                                        this.props.fields.map((f: keyof T) => (
                                            <TableCell key={i.id + i[f]}>
                                                {i[f].toString()}
                                            </TableCell>
                                        ))
                                    }
                                    <TableCell>
                                        <Button onClick={() => { this.setState({ showEditWindow: true }) }}>EDIT</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button color="primary">REMOVE</Button>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>
                                Page: {presenter.Page}, Items: {presenter.FirstVisibleItemIndex} - {presenter.LastVisibleItemIndex}
                                <Button onClick={() => this.Prev_Clicked()}>Prev</Button>
                                <Button onClick={() => this.Next_Clicked()}>Next</Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div >
        );
    }
}
