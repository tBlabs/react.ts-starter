import { Types } from './../../IoC/Types';
import { Http } from './../http/Http';
import { IQuery } from './../../messages/IQuery';
import { Storage } from './../storage/LocalStorage';
import { SnackBarService } from './../snackBar/SnackBarService';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import axios, { AxiosResponse } from 'axios';

@injectable()
export class MessageBus
{
    constructor(
        @inject(Types.IHttp) private _http: Http,
        @inject(Types.IStorage) private _storage: Storage,
        @inject(Types.ISnackBar) private _snackBar: SnackBarService)
    { }

    public async Send(message: IQuery): Promise<any>
    {
        try
        {
            const headers =
                {
                    'Content-Type': 'application/json',
                    'Authorization': this._storage.AuthToken
                };

            const messagePackage = { [message.constructor.name]: { ...message } };

            console.log('Message: ' + JSON.stringify(messagePackage));

            const response: any = await this._http.Post('http://localhost:3000/api/cqrsbus', messagePackage, headers);

            console.log('Response: ', response);

            return response;
        }
        catch (ex)
        {
            console.log('CqrsBus.Send ex:', ex.message);
            this._snackBar.Info(ex.message);
            throw ex;
        }
    }
}