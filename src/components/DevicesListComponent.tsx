import * as React from 'react';
import { TextField } from 'material-ui';
import { RaisedButton, FlatButton, TableHeader, Table, TableHeaderColumn, TableRow, TableBody, TableRowColumn, FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
// import { Typography } from 'material-ui';

export class DevicesListComponent extends React.Component<{}, {}>
{
    render()
    {
        return (

            <div style={ { float: 'left', width: '80%' } }>
                {/* <Typography component="p">
                    Lista urządzeń
                </Typography> */}
                <TextField
                    name="newTaskText"
                    hintText="Szukaj"
                    defaultValue=""
                    ref={ (input: TextField) => { } }
                />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Nazzzzwa</TableHeaderColumn>
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
                                <FlatButton label="Edytuj" primary={ true } /></TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>ABC123</TableRowColumn>
                            <TableRowColumn>Piękna 24, Warszawa</TableRowColumn>
                            <TableRowColumn>Janusz Kowalski</TableRowColumn>
                            <TableRowColumn>stała</TableRowColumn>
                            <TableRowColumn>3.05.2019</TableRowColumn>
                            <TableRowColumn>
                                <FlatButton label="Edytuj" primary={ true } /></TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>ABC123</TableRowColumn>
                            <TableRowColumn>Piękna 24, Warszawa</TableRowColumn>
                            <TableRowColumn>Janusz Kowalski</TableRowColumn>
                            <TableRowColumn>stała</TableRowColumn>
                            <TableRowColumn>3.05.2019</TableRowColumn>
                            <TableRowColumn>
                                <FlatButton label="Edytuj" primary={ true } />
                                <FlatButton label="Usuń" primary={ true } /></TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                <FloatingActionButton mini={ true }>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}