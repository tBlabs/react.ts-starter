import * as React from 'react';
import { Snackbar } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
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
    @LazyInject(Types.ISnackBar)
    private _snack: ISnackBar;

    constructor(props: {})
    {
        super(props);

        this.state = { visible: false };
    }

    private snackSubscription: Subscription;

    componentDidMount()
    {
        this._snack.IsOpen.subscribe((isOpen) => 
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

    render()
    {
        return (
            <Snackbar
                open={ this.state.visible }
                message={ this._snack.Text }
                autoHideDuration={ 4200 }
                onRequestClose={
                    (reason: "timeout" | "clickaway") =>
                    {
                        this.setState({ visible: false });
                    }
                }
                action={ this._snack.ActionText }
                onActionClick={ () => this.Snackbar_ActionClicked() }
            />
        );
    }
}
