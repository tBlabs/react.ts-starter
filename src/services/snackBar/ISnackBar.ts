import * as Rx from 'rxjs';

export interface ISnackBar
{
    IsOpen: Rx.Subject<boolean>;
    Text: string;
    Info(text: string): void;
}