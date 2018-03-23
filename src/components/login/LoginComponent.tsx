import { inject } from 'inversify';
import { Types } from '../../IoC/Types';
import * as React from 'react';
import { LazyInject } from './../../IoC/IoC';
import { Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from 'material-ui';
import { IAuthService } from '../../services/auth/IAuthService';
import { Credentials } from '../../models/Credentials';
import { ILocator } from '../../services/locator/ILocator';
import { Location } from './../../router/Location';

interface LoginComponentState
{
    problem: boolean;
}

export class LoginComponent extends React.Component<{}, LoginComponentState>
{
    @LazyInject(Types.IAuthService) private _auth: IAuthService;
    @LazyInject(Types.ILocator) private _locator: ILocator;

    constructor()
    {
        super({});

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

            this._locator.GoTo(Location.Devices);
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
            <div style={{ display: 'flex' }}>
                <Paper style={{ padding: '30px 58px' }}>
                    <Typography variant="headline" component="h3">
                        {this.DialogTitle}
                    </Typography>
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
                    <br />
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={async () => await this.LoginButton_Clicked()}
                    >
                        Login
                        </Button>
                </Paper>
            </div >
        );
    }
}

/*
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
*/