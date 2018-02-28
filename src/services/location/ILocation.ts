import { BehaviorSubject } from 'rxjs';

export interface ILocation
{
    Url$: BehaviorSubject<string>;
    JumpTo(url: string): void;
    UrlIs(url: string): boolean;
    UrlBeginsWith(url: string): boolean;
}