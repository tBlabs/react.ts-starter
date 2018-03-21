import { injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from './ILogger';

@injectable()
export class Logger implements ILogger
{
    public Header: string = '';

    private get TimeMark(): string
    {
        return (new Date).toLocaleTimeString();
    }

    private ObjectToString(obj: any): string
    {
        if (obj === undefined)
            return 'undefined';
        else
            if (obj === null)
                return 'null';
            else
                if (obj instanceof Object)
                    return JSON.stringify(obj)
                else
                    return obj;
    }

    private ArgsToString(args: any[]): string
    {
        return args.map(i => this.ObjectToString(i)).join(' ');
    }

    Info(...args: any[]): void
    {
        console.log('[Info in ' + this.Header + '] ' + this.ArgsToString(args) + ' @ ' + this.TimeMark);
    }
}