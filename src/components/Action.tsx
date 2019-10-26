import * as React from 'react';
import { Types } from '../IoC/Types';
import { LazyInject } from './../IoC/IoC';
import { Button, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem, Checkbox, Switch, Typography, Grid, Slider, Input } from "@material-ui/core";
import { IHttp } from '../services/http/IHttp';
import { IAlert } from '../services/alert/IAlert';
import { SnackBarComponent } from './snackBar/SnackBarComponent';
import { MessageBus } from '../MessageBus/MessageBus';

interface IState
{
    photo: string;
    value: string;
    interval: number;
    server: string;
    pingReceivedLabel: boolean;
}

export class Action extends React.Component<{}, IState>
{
    @LazyInject(Types.MessageBus) private _bus: MessageBus;
    @LazyInject(Types.IAlert) private _alert: IAlert;
    private config: any

    constructor(props: any)
    {
        super(props);
        this.state = { photo: "", value: "", interval: 100, server: "", pingReceivedLabel: false };
        this.config = {};
        // this.mb = new MessageBus();
    }

    render()
    {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={ async () => await this.TakePhoto() }>TAKE PHOTO</Button>
                <RadioGroup>
                    <FormControlLabel value="StoreInInternalMemory" control={ <Switch /> } disabled label="INTERNAL MEMORY" />
                    <FormControlLabel control={ <Switch /> } label="EXTERNAL MEMORY" onChange={ async (e: any) => await this.Update({ StoreInExternalMemory: e.target.checked }) } />
                    <FormControlLabel control={ <Switch /> } label="CLOUD" onChange={ async (e: any) => await this.Update({ StoreInCloud: e.target.checked }) } />
                </RadioGroup>
                <img src={ this.state.photo } />
            </div>
        );
    }

    async Update(val: any)
    {
        //  console.log(val);
        this.config = Object.assign(this.config, val);

        await this._bus.Send({ Config: this.config }, true);
    }

    private async TakePhoto()
    {
        let photo: any = await this._bus.Send({ TakePicture: { Unpack: true } });

        photo = "data:image/jpeg;charset=utf-8;base64, " + photo.AsBase64;
        this.setState({ photo });
    }
}