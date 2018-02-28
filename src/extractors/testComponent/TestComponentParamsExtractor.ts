import { IComponentRouterParams } from './../IComponentRouterParams';
import { ITestComponentParams } from './ITestComponentParams';
import { Location } from './../../services/location/Location';
import { Types } from './../../IoC/Types';
import { inject } from 'inversify';
import { TestComponentParams } from './TestComponentParams';
import { BehaviorSubject } from 'rxjs';
import { injectable } from 'inversify';
import 'reflect-metadata';

// class ObjectCreator
// {
//     public static Create<T extends IComponentRouterParams>(type: { new(): T; }): T
//     {
//         return new type();
//     }
// }

// function activator<T extends IComponentRouterParams>(type: { new(): T; }): T
// {
//     return new type();
// }

// @injectable()
// export abstract class ParamsExtractor<T extends IComponentRouterParams>
// {
//     public Params$: BehaviorSubject<T>;

//     constructor( @inject(Types.ILocation) private _location: XLocation)
//     {
//         _location.url$.subscribe((url: string) =>
//         {
//             this.OnUrlChange(url);
//         });
//         // let a = ObjectCreator.Create<T>(T);
//         let b = 443;
//         let a: T = activator<T>(T);
//         this.Params$ = new BehaviorSubject<T>(a);
//     }

//     public abstract OnUrlChange(url: string): void;
// }


@injectable()
export class TestComponentParamsExtractor// extends ParamsExtractor 
    implements ITestComponentParams
{
    public Params$: BehaviorSubject<TestComponentParams> = new BehaviorSubject<TestComponentParams>(new TestComponentParams()); // TODO: Would be great to move this to super class but there is a problem with creation BehaviorSubject<T>(INSTANCE) (concrete type by generic)

    constructor( @inject(Types.ILocation) private _location: Location)
    {
        _location.Url$.subscribe((url: string) =>
        {
            this.OnUrlChange(url);
        });
    }

    public OnUrlChange(url: string): void
    {
        const urlRegex: RegExp = /url\/with\/params\/([a-z]+)\/([0-9]+)/;
        const matches: RegExpMatchArray | null = url.match(urlRegex);

        if (matches !== null)
        {
            const p = matches.slice(1, 1 + 2);
            const params = new TestComponentParams();
            params.str = p[0];
            params.num = parseInt(p[1]);
            this.Params$.next(params);
        };
    }
}
