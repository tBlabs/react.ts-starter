import { SnackBarAction } from './SnackBarAction.type';
import * as Rx from 'rxjs';

export interface ISnackBar
{
    IsOpen: Rx.Subject<boolean>;
    Text: string;
    ActionText: string;
    Action(): Promise<void>;
    Info(text: string, actionText?: string, action?: SnackBarAction): void;
}