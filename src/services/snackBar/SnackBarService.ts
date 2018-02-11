import { injectable } from 'inversify';
import 'reflect-metadata';
import { ISnackBar } from './ISnackBar';
import * as Rx from 'rxjs';

@injectable()
export class SnackBarService implements ISnackBar
{
    private isVisible: Rx.Subject<boolean> = new Rx.Subject<boolean>();
    private text: string = '';

    public get IsOpen(): Rx.Subject<boolean>
    {
        return this.isVisible;
    }

    public get Text(): string
    {
        return this.text;
    }

    public Info(text: string): void
    {
        console.log('Info', text);
        this.text = text;
        this.isVisible.next(true);
    }
}