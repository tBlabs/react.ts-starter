import * as React from 'react';
import { Typography, TextField, Table, TableRow, TableHead, TableCell, TableBody, Checkbox, Button, TableFooter } from 'material-ui';
import { LazyInject } from '../../IoC/IoC';
import { Types } from '../../IoC/Types';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';
import { IDataSource } from '../../services/dataSource/IDataSource';
import { guid } from '../../types/guid';
import { ReactNode } from 'react';

interface DataTableComponentProps<T>
{
    dataSource: ITablePresenter<T>;
    fields: string[];
    headers: string[];
    editWindow: (props: any) => ReactNode;
}

interface DataTableComponentState // xxx
{
    showEditWindow: boolean;
}

interface IStorable
{
    id: guid;
}



export class DataTableComponent<T extends IStorable> extends React.Component<DataTableComponentProps<T>, DataTableComponentState>
{
    constructor(props: DataTableComponentProps<T>)
    {
        super(props);

        this.state = { showEditWindow: false };
    }

    render()
    {
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
                            this.props.dataSource.Items.map((i: T) => (
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
                                <Button>Next</Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                {
                    this.dataSource.EditWindowIsVisible &&
                    this.props.editWindow()}
            </div >
        );
    }
}
