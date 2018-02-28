import { BehaviorSubject } from 'rxjs';

export class SampleRouterParamsExtractor
{
    private textParam: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private numericParam: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor( @inject(Types.ILocation) private _location: Location)
    {
        _location.Url$.subscribe((url: string) =>
        {
            this.OnUrlChange(url);
        });
    }


    public get TextParam(): BehaviorSubject<string>
    {
        return this.textParam;
    }

    public set NumericParam(newValue: number)
    {
        this._location.Set()
        this.numericParam.next(newValue);
    }
}

// xyz.com/{url:"/",param1:'2', param2:'foo'}