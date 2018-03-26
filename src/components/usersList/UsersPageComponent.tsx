import * as React from 'react';
import { TextField, Typography, Button } from 'material-ui';
import { LazyInject } from '../../IoC/IoC';
import { Types } from '../../IoC/Types';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';
import { ListComponent } from '../dataTable/DataTableComponent';
import { UsersService } from '../../services/users/UsersService';
import { IUsersPresenter } from '../../presenters/users/IUsersPresenter';
import { UserEdit } from './UserEdit';

export class UsersPageComponent extends React.Component<{}, {}>
{
    // @LazyInject(Types.IUsersService) private _usersService: IUsersService;
    @LazyInject(Types.IUsersPresenter) private _usersListPresenter: IUsersPresenter;

    // private subscription: Subscription;

    async componentDidMount()
    {
        // this._usersListPresenter.UpdateRequired.subscribe(()=> this.forceUpdate());

        await this._usersListPresenter.Init();

    }

    render()
    {
        return (
            <div style={{ float: 'left', width: '80%', display: 'block' }}>
                <Typography variant="title">
                    Users list
                </Typography>

                <TextField
                    label="Name"
                    onChange={(event) => this._usersListPresenter.FilterByName(event.target.value)} />

                <ListComponent
                    listPresenter={this._usersListPresenter}
                    fields={['name', 'email', 'lastLoginTime']}
                    headers={['Nazwa', 'Email', 'Ostatnie logowanie']}
                />

                {/* {this._userEdit.IsOpen && <UserEdit />} */}

                <Button>Add</Button>
            </div>
        );
    }
}
