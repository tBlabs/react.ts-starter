import { injectable } from 'inversify';
import 'reflect-metadata';
import { ExceptionCode } from './../../exceptions/ExceptionCode';
import { Exception } from './../../exceptions/Exception';
import { AuthToken } from './../../models/auth/AuthToken';
import { LoginQuery } from './../../messages/auth/LoginQuery';
import { ICommand } from './../../messages/ICommand';
import { IQuery } from './../../messages/IQuery';
import { IMessageBus } from './IMessageBus';

@injectable()
export class MessageBusMock implements IMessageBus
{
    public async Send(message: IQuery | ICommand): Promise<any>
    {
        if (message instanceof LoginQuery)
        {
            if (((message as LoginQuery).email === 'e@mail.com') && ((message as LoginQuery).password === 'password'))
            {
                return new AuthToken('auth_token_for_' + (message as LoginQuery).email);
            }
            else throw new Exception(ExceptionCode.Unauthorized);
        }

        throw new Exception(ExceptionCode.UnknownMessage);
    }
}