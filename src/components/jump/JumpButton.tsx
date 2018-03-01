import * as React from "react";
import { RaisedButton } from "material-ui";
import { Subscription } from "rxjs";
import { Types } from "../../IoC/Types";
import { LazyInject } from "../../IoC/IoC";
import { ILocation } from "../../services/location/ILocation";
import { Locations } from "../../services/locator/Locator";
import { ILocator } from "../../services/locator/ILocator";

interface JumpButtonProps
{
    label: string;
    location: Locations;
}

export class JumpButton extends React.Component<JumpButtonProps, {}>
{
    @LazyInject(Types.ILocator) private _locator: ILocator;

    private locationSubscription: Subscription;

    componentDidMount()
    {
        this.locationSubscription = this._locator.Location$.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount()
    {
        this.locationSubscription.unsubscribe();
    }


    render()
    {
        return (<RaisedButton
            primary={ this._locator.Is(this.props.location) }
            onClick={ () => this._locator.GoTo(this.props.location) }
            label={ this.props.label }
        />);
    }

}