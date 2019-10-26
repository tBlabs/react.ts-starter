import * as React from 'react';
import { Types } from '../IoC/Types';
import { LazyInject } from './../IoC/IoC';
import { Button, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem, Checkbox, Switch, Typography, Grid, Slider, Input } from "@material-ui/core";
import { IHttp } from '../services/http/IHttp';
import { IAlert } from '../services/alert/IAlert';
import { SnackBarComponent } from './snackBar/SnackBarComponent';
import { MessageBus } from '../MessageBus/MessageBus';
import * as io from 'socket.io-client';

interface IState
{
    interval: number;
}

export class WorkModeSelector extends React.Component<{}, IState>
{
    constructor(props: any)
    {
        super(props);

        this.state = { interval: 1000 };
    }

    componentDidMount()
    {
    }

    private Update(x)
    {

    }

    render()
    {
        return (
            <div>
                <RadioGroup>
                    <FormControlLabel value="1" control={ <Radio /> } label="ASAP" onClick={ async (e: any) => { e.preventDefault(); await this.Update({ Interval: 0, CanWork: true }) } } />
                    <FormControlLabel value="2" control={ <Radio /> } label="ON DEMAND" onClick={ async (e: any) =>
                    {
                        // e.preventDefault();
                        await this.Update({ CanWork: false });
                    } } />
                    <FormControlLabel value="3" control={ <Radio /> } label="INTERVAL" onClick={ async (e: any) =>
                    {
                        await this.Update({ Interval: this.state.interval, CanWork: true })
                    } } />
                    <Input
                        value={ this.state.interval }
                        margin="dense"
                        onChange={ async (e) =>
                        {
                            const interval = +e.target.value;
                            this.setState({ interval });
                            // this.props.onIntervalChange(interval);
                        } }
                        inputProps={ {
                            step: 500,
                            min: 0,
                            max: 10000,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        } }
                    />
                    <FormControlLabel value="4" control={ <Radio /> } disabled label="TIMER" />
                    <FormControlLabel value="5" control={ <Radio /> } disabled label="MOVEMENT DETECTION" />
                </RadioGroup>
            </div>
        );
    }
}