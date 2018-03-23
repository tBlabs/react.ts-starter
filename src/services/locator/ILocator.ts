import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocationData } from '../../router/LocationData';
import { Location } from '../../router/Location';

export interface ILocator
{
    Location$: BehaviorSubject<LocationData>;
    Location: LocationData;
    GoTo(url: Location, params?: any): void;
    ReplaceUrlParams(params: any): void;
    Is(location: Location): boolean;
} 