import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { ILocation } from './ILocation';

@injectable()
export class Location implements ILocation
{
    // private Url$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public Url$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor()
    {
        console.log('url set to ' + window.location.pathname);
        this.Url$.next(window.location.pathname);

        window.addEventListener('popstate', (e: PopStateEvent) =>
        {
            console.log('url changed by user to ' + window.location.pathname);
            this.Url$.next(window.location.pathname);
        });
    }

    // public get Url$(): BehaviorSubject<string> 
    // {
    //     return this.Url$;
    // }

    public JumpTo(url: string): void
    {
        history.pushState(null, url, url);

        this.Url$.next(url);
    }

    public UrlIs(url: string): boolean
    {
        return this.Url$.value === url;
    }

    public UrlBeginsWith(url: string): boolean
    {
        return this.Url$.value.indexOf(url) === 0;
    }

    // public Extract(urlAsRegex: string): object
    // {
    //     const regex = new RegExp(urlAsRegex);

    //     console.log('regex', regex);
    //     const matches = this.Url$.value.match(regex);

    //     console.log('matches', matches);

    //     return {};
    // }
}