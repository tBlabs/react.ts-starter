import { inject } from 'inversify';
import { Types } from '../../IoC/Types';
import * as React from 'react';
import { LazyInject } from './../../IoC/IoC';
import { TextField, Button } from 'material-ui';
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
                <TextField
                    name="email"
                    inputRef={inp => this.emailInput = inp}
                />
                <TextField
                    name="password"
                    inputRef={inp => this.passwordInput = inp}
                />
                <Button
                    color="primary"
                    onClick={async () => await this.LoginButton_Clicked()}
                >
                    Login
                </Button>
            </div>
        );
    }
}