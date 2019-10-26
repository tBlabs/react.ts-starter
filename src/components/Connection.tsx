import * as React from 'react';
import { Types } from '../IoC/Types';
import { LazyInject } from './../IoC/IoC';
import { Button, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem, Checkbox, Switch, Typography, Grid, Slider, Input } from "@material-ui/core";
import { IAlert } from '../services/alert/IAlert';
import { MessageBus } from '../MessageBus/MessageBus';

interface IServer
{
    Name: string;
    Addr: string;
}

interface IState
{
    value: string;
    serverAddr: string;
    pingReceivedLabel: boolean;
}

export class Connection extends React.Component<{}, IState>
{
    @LazyInject(Types.MessageBus) private _bus: MessageBus;
    @LazyInject(Types.IAlert) private _alert: IAlert;

    private SERVERS: IServer[] = [

        { Name: "LOCALHOST", Addr: "http://localhost:4000/CqrsBus" },
        { Name: "DIRECT CONNECTION", Addr: "http://192.168.43.225:4000/CqrsBus" },
        // <MenuItem value="http://radio-proxy.herokuapp.com/MessageBus">PROXY</MenuItem>
    ];

    constructor(props: any)
    {
        super(props);
        this.state = { value: "", serverAddr: this.SERVERS[0].Addr, pingReceivedLabel: false };
        // this.mb = new MessageBus();
    }

    componentDidMount()
    {
    }

    render()
    {
        return (
            <div>
                <FormControl variant="outlined">
                    <Select value={ this.state.serverAddr }
                        onChange={ (e) =>
                        {
                            this._alert.Error('Switched to ' + e.target.value);
                            this._bus.Url = e.target.value as string;
                            this.setState({ serverAddr: e.target.value as string });
                        } }>
                        { this.SERVERS.map(x =>
                        {
                            return <MenuItem value={ x.Addr }>{ x.Name }</MenuItem>
                        }) }
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={ async () => await this.Ping() }>PING</Button>
            </div>
        );
    }

    async Ping()
    {
        try
        {
            const result = await this._bus.Send({ Ping: {} }, true);

            if (result === "pong")
            {
                this._alert.Error("Pong!");
            }
        }
        catch (ex)
        {
            this._alert.Error(ex.message);
        }
    }
}