import { inject } from 'inversify';
import { Types } from '../../IoC/Types';
import * as React from 'react';
import { LazyInject } from './../../IoC/IoC';
import { Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from 'material-ui';
import { IAuthService } from '../../services/auth/IAuthService';
import { Credentials } from '../../models/Credentials';
// import { Ex  Code } from '../../exceptions/Exception';

interface LoginComponentState
{
    // emailInputError: boolean;
    // passwordInputError: boolean;
    problem: boolean;
}

export class LoginComponent extends React.Component<{}, LoginComponentState>
{
    @LazyInject(Types.IAuthService) private _auth: IAuthService;

    constructor()
    {
        super({});

        // this.state = { emailInputError: false, passwordInputError: false };
        this.state = { problem: false };
    }

    private emailInput: any;
    private passwordInput: any;

    private async LoginButton_Clicked(): Promise<void>
    {
        const credentials: Credentials = new Credentials(this.emailInput.value, this.passwordInput.value);

        try
        {
            await this._auth.Login(credentials);

            this.setState({ problem: false });
        }
        catch (exception)
        {
            this.setState({ problem: true });
        }
    }

    private get DialogTitle(): string
    {
        return 'Login' + (this.state.problem ? ' problem' : '');
    }

    render()
    {
        return (
            <div>
                <Dialog open={true}>
                    <DialogTitle>{this.DialogTitle}</DialogTitle>
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
                        <Button
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