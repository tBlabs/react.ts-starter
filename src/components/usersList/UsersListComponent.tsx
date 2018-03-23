import * as React from 'react';
import { Typography, Button } from 'material-ui';
import { LazyInject } from '../../IoC/IoC';
import { Types } from '../../IoC/Types';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';
import { DataTableComponent } from '../dataTable/DataTableComponent';
import { UsersService } from '../../services/users/UsersService';
import { IUsersPresenter } from '../../presenters/users/IUsersPresenter';
import { UserEdit } from './UserEdit';

export class UsersListComponent extends React.Component<{}, {}>
{
    @LazyInject(Types.IUsersPresenter) private _usersPresenter: IUsersPresenter;

    async componentDidMount()
    {
        await this._usersPresenter.Init();

        this.forceUpdate();
    }

    render()
    {
        return (
            <div style={{ float: 'left', width: '80%', display: 'block' }}>
                <Typography variant="title">
                    Users list
                </Typography>

                <DataTableComponent
                    dataSource={this._usersPresenter}
                    fields={['name', 'email', 'lastLoginTime']}
                    headers={['Nazwa', 'Email', 'Ostatnie logowanie']}
                />

                {this._userEdit.IsOpen && <UserEdit />}

                <Button>Add</Button>
            </div>
        );
    }
}
