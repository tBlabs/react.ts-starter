import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { ILogger } from './../logger/ILogger';
import { IHttp } from './../http/IHttp';
import { IStorage } from './../storage/IStorage';
import { IAlert } from './../alert/IAlert';
import { Types } from './../../IoC/Types';
import { IQuery } from './../../messages/IQuery';
import { ICommand } from '../../messages/ICommand';
import { IMessageBus } from './IMessageBus';

@injectable()
export class MessageBus implements IMessageBus
{
    constructor(
        @inject(Types.ILogger) private _log: ILogger,
        @inject(Types.IHttp) private _http: IHttp,
        @inject(Types.IStorage) private _storage: IStorage,
        @inject(Types.IAlert) private _alert: IAlert)
    {
        _log.Header = 'MessageBus';
    }

    public async Send(message: IQuery | ICommand): Promise<any>
    {
        try
        {
            const headers =
                {
                    'Content-Type': 'application/json',
                    'Authorization': this._storage.AuthToken
                };

            const messagePackage = { [message.constructor.name]: { ...message } };

            this._log.Info('Message: ' + JSON.stringify(messagePackage));

            const response: any = await this._http.Post('http://localhost:3000/api/cqrsbus', messagePackage, headers);

            this._log.Info('Response: ', response);

            return response;
        }
        catch (ex)
        {
            this._log.Info('MessageBus.Send ex:', ex.message);

            this._alert.Error(ex.message);

            throw ex;
        }
    }
}