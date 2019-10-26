import * as React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { ISnackBar } from '../../services/snackBar/ISnackBar';
import { Types } from '../../IoC/Types';
import { LazyInject } from '../../IoC/IoC';
import { Subscription } from 'rxjs';

interface SnackBarComponentState
{
    visible: boolean;
}

export class SnackBarComponent extends React.Component<{}, SnackBarComponentState>
{
    @LazyInject(Types.ISnackBar) private _snack: ISnackBar;

    constructor(props: {})
    {
        super(props);

        this.state = { visible: false };
    }

    private snackSubscription: Subscription;

    componentDidMount()
    {
        this.snackSubscription = this._snack.IsOpen.subscribe((isOpen) => 
        {
            this.setState({ visible: isOpen });
        });
    }

    componentWillUnmount()
    {
        this.snackSubscription.unsubscribe();
    }

    private Snackbar_ActionClicked()
    {
        this._snack.Action();
        this.setState({ visible: false });
    }

    private Close_Clicked()
    {
        console.log('Close clicked');
        this.setState({ visible: false });
    }

    render()
    {
        const messageText = <span>{ this._snack.Text }</span>;
        const closeButton =
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={ () => this.Close_Clicked() }
            >
                x
            </IconButton>;

        return (
            <Snackbar
                open={ this.state.visible }
                action={ [closeButton] }
                message={ messageText }
                autoHideDuration={ 3000 }
                onClose={
                    (event, reason) =>
                    {
                        this.setState({ visible: false });
                    }
                }
            />
        );
    }
}


/*
               action={ this._snack.ActionText }
                onActionClick={ () => this.Snackbar_ActionClicked() }
 
*/