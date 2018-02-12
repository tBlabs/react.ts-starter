import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { ILocation } from './ILocation';

@injectable()
export class XLocation implements ILocation
{
    public url$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    public JumpTo(url: string): void
    {
        history.pushState(null, url, url);

        this.url$.next(url);
    }

    public UrlIs(url: string): boolean
    {
        return this.url$.value === url;
    }

    public UrlBeginsWith(url: string): boolean
    {
        return this.url$.value.indexOf(url) === 0;
    }

    public Extract(urlAsRegex: string): object
    {
        const regex = new RegExp(urlAsRegex);

        console.log('regex', regex);
        const matches = this.url$.value.match(regex);

        console.log('matches', matches);

        return {};
    }

    // public get Url(): string
    // {
    //     return window.location.pathname;
    // }

    constructor()
    {
        this.url$.next(window.location.pathname);

        window.addEventListener('popstate', (e: PopStateEvent) =>
        {
            console.log('url changed by user to ' + window.location.pathname);
            this.url$.next(window.location.pathname);
        });
    }
}