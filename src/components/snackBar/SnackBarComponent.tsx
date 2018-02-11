import * as React from 'react';
import { Snackbar } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField } from 'material-ui';
import { ISnackBar } from '../../services/snackBar/ISnackBar';
import { Types } from '../../IoC/Types';
import { LazyInject } from '../../IoC/IoC';

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

    componentDidMount()
    {
        this._snack.IsOpen.subscribe((isOpen) => 
        {
            this.setState({ visible: isOpen });
        });
    }

    render()
    {
        console.log('snack render');
        return (
            <Snackbar
                open={ this.state.visible }
                message={ this._snack.Text }
                autoHideDuration={ 1200 }
                onRequestClose={
                    (reason: "timeout" | "clickaway") =>
                    {
                        this.setState({ visible: false });
                    }
                }
            />
        );
    }
}
