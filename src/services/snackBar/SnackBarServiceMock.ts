import { ISnackBar } from './ISnackBar';

export class SnackBarServiceMock implements ISnackBar
{
    IsOpen: Subject<boolean>;
    Text: string;
    ActionText: string;
    public async Action(): Promise<void>
    {
    }

    public Info(text: string, actionText?: string, action?: (args?: any) => Promise<void>): void
    {
    }
}