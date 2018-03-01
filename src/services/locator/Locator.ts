import { LocationData } from './../../router/LocationData';
import { Location } from './../../router/Location';
import { IWindowTitle } from './../title/IWindowTitle';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import base64url from 'base64url';
import { ILocator } from './ILocator';
import { Types } from '../../IoC/Types';
import { IHistory } from '../../router/IHistory';

// export class BrowserWindow
// {
//     public get CurrentUrl(): string
//     {
//         return window.location.pathname;
//     }

//     public HistoryBackButtonPressed(callback: () => void)
//     {
//         if (callback)
//         {

//         }
//     }
// }

@injectable()
export class Locator implements ILocator
{
    public Location$: BehaviorSubject<LocationData> = new BehaviorSubject<LocationData>(new LocationData(Location.Home));

    constructor(
        // @inject(Types.IBrowserWindow) private _window: IBrowserWindow,
        @inject(Types.BrowserHistory) private _history: IHistory,
        @inject(Types.IWindowTitle) private _title: IWindowTitle)
    {
        const url = window.location.pathname;

        const locationData: LocationData = this.ParseLocation(url);

        this.Location$.next(locationData);

        window.addEventListener('popstate', (e: PopStateEvent) =>
        {
            const url = window.location.pathname;

            const locationData: LocationData = this.ParseLocation(url);
            console.log('Back button jump to: ' + JSON.stringify(locationData));
            this.Location$.next(locationData);
        });
    }

    public ParseLocation(url: string): LocationData
    {
        if (url === '')
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
        this._title.Set(location);
        this._history.pushState(null, url, url);
        console.log('Manual jump to: ' + JSON.stringify(locationData));
        this.Location$.next(locationData);
    }

    public ReplaceUrlParams(params: object): void
    {
        const locationData = new LocationData(this.Location$.value.location, params);
        const url = this.BuildUrl(locationData);

        history.replaceState(null, url, url);

        this.Location$.next(locationData);
    }

    public Is(location: Location): boolean
    {
        return this.Location$.value.location === location;
    }
} 