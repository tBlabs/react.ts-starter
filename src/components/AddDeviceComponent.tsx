import * as React from 'react';
import { TextField, Dialog } from 'material-ui';

import { RaisedButton, FlatButton, TableHeader, Table, TableHeaderColumn, TableRow, TableBody, TableRowColumn, FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';

export class AddDeviceComponent extends React.Component<{}, {}>
{
    render()
    {
        return (
            <Dialog
                actions={[]}
                title="Dodaj nowe urządzenie" open={true} modal={true}>
                <div style={{ float: 'left', width: '80%' }}>
                    <TextField
                        defaultValue="ABC123"
                        floatingLabelText="Nazwa"
                    /><br />
                    <TextField
                        defaultValue="Smolna 13, Warszawa"
                        floatingLabelText="Lokalizacja"
                    />
                    <TextField
                        defaultValue="Nowak Piotr"
                        floatingLabelText="Klient"
                    /><br />
                    <TextField
                        defaultValue="5.09.2017"
                        floatingLabelText="Data dodania"
                    />
                    <TextField
                        floatingLabelText="Data zakończenia współpracy"
                        defaultValue="11.10.2019"
                    /><br />
                    <TextField
                        defaultValue="???"
                        floatingLabelText="Sparowanie z modemem"
                    />
                    <TextField
                        floatingLabelText="Typ współpracy"
                        defaultValue="staała"
                    /><br />
                    <TextField
                        floatingLabelText="Raportowanie do"
                        hintText="adresy email"
                        defaultValue="jacek.p@cocacola.pl"
                        multiLine={true}
                        rows={3}
                    /><br />
                    <RaisedButton
                        label="Wprowadzanie krzywych wydajności"
                    />
                    <RaisedButton
                        label="Koszt mediów"
                    />
                    <RaisedButton
                        label="Zapisz"
                        primary={true} />
                </div>
            </Dialog>
        );
    }
}