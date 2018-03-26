import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Paper } from 'material-ui';
import * as React from 'react';
import { LazyInject } from '../../IoC/IoC';
import { Types } from '../../IoC/Types';
import { IUserEditPresenter } from '../../presenters/users/IUserEditPresenter';
import { User } from '../../models/User';

interface UserEditProps
{
    open: boolean;
}

interface UserEditState
{
    isVisible: boolean;
}

export class UserEditStore
{

}


export class UserEdit extends React.Component<{}, UserEditState>
{
    @LazyInject(Types.IUserEditPresenter) private _userEditPresenter: IUserEditPresenter;


    // constructor(props: UserEditProps)
    // {
    //     super(props);

    //     this.state = { isVisible: false };
    // }

    private async SaveButton_Clicked()
    {
        await this._userEditPresenter.SaveChanges();
        this._userEditPresenter.Close();
    }

    private async CancelButton_Clicked()
    {
        this._userEditPresenter.Close();
    }

    render()
    {
        console.log('RENDER');
        // if (this.state.isVisible === false)
        //     return (<React.Fragment>hidden</React.Fragment>);
        // else
        // <Paper>
        return (
            <Dialog open={true}>
                <DialogTitle>Edycja użytkownika</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Name"
                        margin="normal"
                        defaultValue={this._userEditPresenter.EditedItem.name}
                        onChange={(event) => this._userEditPresenter.EditedItem.name = event.target.value}
                    />
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
                        onClick={async () => await this.CancelButton_Clicked()}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={async () => await this.SaveButton_Clicked()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}