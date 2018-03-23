import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Paper } from 'material-ui';
import * as React from 'react';

interface UserEditProps
{
    open: boolean;
}

interface UserEditState
{
    open: boolean;
}

export class UserEditStore
{

}


export class UserEdit extends React.Component<UserEditProps, UserEditState>
{
    constructor(props: UserEditProps)
    {
        super(props);

        // this.state = { open: true };
    }

    componentDidMount()
    {
        // this.setState({ open: true });
    }

    private SaveButton_Clicked()
    {
        // this.setState({ open: false });
    }

    render()
    {
        return (
            <Paper>
                <DialogTitle>Edycja użytkownika</DialogTitle>
                <DialogContent>
                    <TextField
                        name="email"
                        label="Email"
                        margin="normal"
                        defaultValue="e@mail.com"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={async () => await this.SaveButton_Clicked()}
                    >
                        Zapisz
                    </Button>
                </DialogActions>
            </Paper>
        );
    }
}