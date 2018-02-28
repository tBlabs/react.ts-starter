import { BehaviorSubject } from 'rxjs';

export interface IAddressBarParamsExtractor<T>
{
    // readonly Params: T;
    readonly Params$: BehaviorSubject<T>;
}
