import { ILocatorParams } from './ILocatorParams';
import { LocationData } from './../../router/LocationData';
import { BehaviorSubject } from "rxjs";
import { ILocator } from "./ILocator";
import { injectable, inject } from "inversify";
import { Types } from '../../IoC/Types';

@injectable()
export class LocatorParams<T extends object> implements ILocatorParams<T>
{
    public Params$ = new BehaviorSubject(<T>{});

    constructor( @inject(Types.ILocator) private _locator: ILocator)
    {
        _locator.Location$.subscribe((location: LocationData) => this.Params$.next(location.params));
    }

    public UpdateParam(key: keyof T, value: any)
    {
        this._locator.ReplaceUrlParams({ ...this._locator.Location.params, [key]: value });
    }
}
