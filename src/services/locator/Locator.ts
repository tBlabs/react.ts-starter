import { IBrowserWindow } from './../browserWindow/IBrowserWindow';
import { LocationData } from './../../router/LocationData';
import { Location } from './../../router/Location';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import base64url from 'base64url';
import { ILocator } from './ILocator';
import { Types } from '../../IoC/Types';

@injectable()
export class Locator implements ILocator
{
    public Location$: BehaviorSubject<LocationData> = new BehaviorSubject<LocationData>(new LocationData(Location.Home));

    public get Location(): LocationData
    {
        return this.Location$.value;
    }

    constructor(@inject(Types.IBrowserWindow) private _window: IBrowserWindow)
    {
        this.ParseLocationAndSubmit(_window.CurrentUrl);

        _window.HistoryBackButtonPressed(() =>
        {
            this.ParseLocationAndSubmit(_window.CurrentUrl);
            // console.log('Back button jump to: ' + JSON.stringify(locationData));
        });
    }

    private ParseLocationAndSubmit(url: string): void
    {
        const locationData: LocationData = this.ParseLocation(url);

        this.Location$.next(locationData);
    }

    public ParseLocation(url: string): LocationData
    {
        if ((url === undefined) || (url === ''))
        {
            return new LocationData(Location.Home);
        }

        const splittedUrl = url.split('/');

        if ((splittedUrl.length === 2) && (splittedUrl[1] === ''))
        {
            return new LocationData(Location.Home);
        }
        else
            if (splittedUrl.length === 2)
            {
                return new LocationData(splittedUrl[1] as Location);
            }
            else
                if (splittedUrl.length === 3)
                {
                    const location = splittedUrl[1] as Location; // extra validation required
                    const paramsAsString = splittedUrl[2]; // extra validation required

                    try
                    {
                        const paramsAsJsonString = base64url.decode(paramsAsString);
                        const params = JSON.parse(paramsAsJsonString);

                        return new LocationData(location, params);
                    }
                    catch (ex)
                    {
                        return new LocationData(location);
                    }
                }

        return new LocationData(Location.NotFound);
    }

    private EncodeParams(params: object): string
    {
        return base64url.encode(JSON.stringify(params));
    }

    private BuildUrl(locationData: LocationData): string
    {
        let url = '/' + locationData.location.toString();

        if (locationData.params !== undefined)
        {
            const encodedParams = this.EncodeParams(locationData.params);
            url += '/' + encodedParams;
        }

        return url;
    }

    public GoTo(location: Location, params?: any): void
    {
        const locationData = new LocationData(location, params);
        const url = this.BuildUrl(locationData);

        this._window.Title = location;
        this._window.HistoryPush(url);

        // console.log('Manual jump to: ' + JSON.stringify(locationData));
        this.Location$.next(locationData);
    }

    public ReplaceUrlParams(params: object): void
    {
        const locationData = new LocationData(this.Location.location, params);
        const url = this.BuildUrl(locationData);

        this._window.UrlReplace(url);

        this.Location$.next(locationData);
    }

    public Is(location: Location): boolean
    {
        return this.Location.location === location;
    }
} 