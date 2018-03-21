import { inject } from 'inversify';
import { Types } from '../../IoC/Types';
import * as React from 'react';
import { LazyInject } from './../../IoC/IoC';
import { Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from 'material-ui';
import { IAuthService } from '../../services/auth/IAuthService';
import { Credentials } from '../../models/Credentials';

export class LoginComponent extends React.Component<{}, {}>
{
    @LazyInject(Types.IAuthService) private _auth: IAuthService;

    private emailInput: any;
    private passwordInput: any;

    private async LoginButton_Clicked(): Promise<void>
    {
        const credentials: Credentials = new Credentials(this.emailInput.value, this.passwordInput.value);

        await this._auth.Login(credentials);
    }

    render()
    {
        return (
            <div>
                <Dialog open={true}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <TextField
                            name="email"
                            label="Email"
                            margin="normal"
                            defaultValue="e@mail.com"
                            inputRef={inp => this.emailInput = inp}
                        />
                        <br />
                        <TextField
                            name="password"
                            label="Password"
                            margin="normal"
                            defaultValue="password"
                            inputRef={inp => this.passwordInput = inp}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ margin: '12px' }}
                            variant="raised"
                            color="primary"
                            onClick={async () => await this.LoginButton_Clicked()}
                        >
                            Login
                        </Button>
                    </DialogActions>
                </Dialog >
            </div >
        );
    }
}