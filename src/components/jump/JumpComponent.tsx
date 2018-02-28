import * as React from "react";
import { RaisedButton } from "material-ui";
import { Subscription } from "rxjs";
import { Types } from "../../IoC/Types";
import { LazyInject } from "../../IoC/IoC";
import { ILocation } from "../../services/location/ILocation";

interface JumpComponentProps
{
    label: string;
    jumpTo: string;
}

export class JumpComponent extends React.Component<JumpComponentProps, {}>
{
    @LazyInject(Types.ILocation) private _location: ILocation;

    private locationSubscription: Subscription;

    componentDidMount()
    {
        this.locationSubscription = this._location.Url$.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount()
    {
        this.locationSubscription.unsubscribe();
    }


    render()
    {
        return (<RaisedButton
            primary={ this._location.UrlIs(this.props.jumpTo) }
            onClick={ () => this._location.JumpTo(this.props.jumpTo) }
            label={ this.props.label }
        />)
    }

}