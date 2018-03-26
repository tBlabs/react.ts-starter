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
import { IUserEditPresenter } from '../../presenters/users/IUserEditPresenter';
import { guid } from '../../types/guid';

interface UsersPageState
{
    isEditVisible: boolean;
}

export class UsersPageComponent extends React.Component<{}, UsersPageState>
{
    @LazyInject(Types.IUsersPresenter) private _usersListPresenter: IUsersPresenter;
    @LazyInject(Types.IUserEditPresenter) private _userEditPresenter: IUserEditPresenter;

    constructor(props: {})
    {
        super(props);
        this.state = { isEditVisible: false };
    }

    async componentDidMount()
    {
        await this._usersListPresenter.Init();

        this._userEditPresenter.IsVisible.subscribe((isVisible: boolean) =>
        {
            this.setState({ isEditVisible: isVisible });
        });
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
                    onEditClick={(id: guid) => this._userEditPresenter.Open(id)}
                />

                {this.state.isEditVisible && <UserEdit />}

                <Button onClick={() => this._userEditPresenter.Open('1234')}>Add</Button>
            </div>
        );
    }
}
