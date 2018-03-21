import { injectable, inject } from 'inversify';
import { Types } from './../../IoC/Types';
import { ISnackBar } from '../snackBar/ISnackBar';

@injectable()
export class Alert
{
    constructor(
        @inject(Types.ISnackBar) private _snackBar: ISnackBar)
    { }

    public Error(message: string): void
    {
        this._snackBar.Info(message);
    }
}
