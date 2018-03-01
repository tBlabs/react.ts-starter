import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { LazyInject } from './../../IoC/IoC';
import { Types } from './../../IoC/Types';
import * as React from 'react';
import { Subscription } from 'rxjs';
import { ILocatorParams } from './../../services/locator/LocatorParams';
import { ISnackBar } from '../../services/snackBar/ISnackBar';
import { RaisedButton } from 'material-ui';

export class SampleComponentLocatorParams
{
    foo?: string;
}

export class Sample1Component extends React.Component<{}, {}>
{
    @LazyInject(Types.ILocatorParams)
    private _locatorParams: ILocatorParams<SampleComponentLocatorParams>;

    private routerParamsSubscription: Subscription;

    componentDidMount()
    {
        // console.log('SampleComponent mount');
        this.routerParamsSubscription = this._locatorParams.Params$.subscribe(() => 
        {
            // console.log('SampleComponent router update');
            this.forceUpdate();
        });
    }

    componentWillUnmount()
    {
        this.routerParamsSubscription.unsubscribe();
    }

    render()
    {
        let foo: string | undefined = 'initial';
        if (this._locatorParams.Params$.value !== undefined)
            foo = this._locatorParams.Params$.value.foo;
        return (
            <div>
                foo = { foo }
                <RaisedButton
                    onClick={ () => this._locatorParams.UpdateParam('foo', Math.random().toString()) }
                    label="SampleLocation1"
                />
            </div>
        );
    }
}