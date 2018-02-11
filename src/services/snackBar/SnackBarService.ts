import { SnackBarAction } from './SnackBarAction.type';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { ISnackBar } from './ISnackBar';
import * as Rx from 'rxjs';

@injectable()
export class SnackBarService implements ISnackBar
{
    private isVisible: Rx.Subject<boolean> = new Rx.Subject<boolean>();
    private text: string = '';
    private actionText: string | undefined;
    private action: SnackBarAction | undefined;

    public get ActionText(): string
    {
        if (this.actionText !== undefined)
        {
            return this.actionText;
        }
        else return '';
    }

    public async Action(): Promise<void>
    {
        if (this.action !== undefined)
        {
            await this.action();
        }
    }

    public get IsOpen(): Rx.Subject<boolean>
    {
        return this.isVisible;
    }

    public get Text(): string
    {
        return this.text;
    }

    public Info(text: string, actionText?: string, action?: SnackBarAction): void
    {
        console.log('Info', text);
        this.text = text;
        this.actionText = actionText;
        this.action = action;
        this.isVisible.next(true);
    }
}