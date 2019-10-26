import * as React from 'react';
import { Types } from '../IoC/Types';
import { LazyInject } from './../IoC/IoC';
import { Button, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem, Checkbox, Switch, Typography, Grid, Slider, Input } from "@material-ui/core";
import { IHttp } from '../services/http/IHttp';
import { IAlert } from '../services/alert/IAlert';
import { SnackBarComponent } from './snackBar/SnackBarComponent';
import { MessageBus } from '../MessageBus/MessageBus';
import * as io from 'socket.io-client';
import { Connection } from './Connection';
import { Activation } from './Activation';
import { Action } from './Action';
import { DeviceConfig } from '../Device/DeviceConfig';

class Device 
{
  Id: string;
  Config: DeviceConfig;
  // Connection: DeviceConnector;// wspólny MB?
  // Debug: DataStreamer;

  UpdateConfig(config: DeviceConfig)
  { }
}


interface IState
{
  photo: string;
  value: string;
  interval: number;
  server: string;
  pingReceivedLabel: boolean;
}

export class App extends React.Component<{}, IState>
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

  componentDidMount()
  {
    this._alert.Error("elo!");

    const s = io.connect('http://localhost:4000');

    s.on('connect', () =>
    {
      console.log('Connected.');
      // s.emit("message", { Ping: {} });
    });
    s.on('result', data => console.log('RESULT', data));

    //  document.addEventListener('visibilitychange', () => { console.log('vc', document.visibilityState); }, false);
  }

  render()
  {
    return (
      <div style={ { padding: "32px" } }>
        <Connection />
        <Activation />
        <Action />

        <SnackBarComponent />
      </div>
    );
  }

  async Update(val: any)
  {
    //  console.log(val);
    this.config = Object.assign(this.config, val);

    await this._bus.Send({ Config: this.config }, true);
  }
}