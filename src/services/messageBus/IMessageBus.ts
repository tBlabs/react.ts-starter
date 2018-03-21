import { IQuery } from './../../messages/IQuery';
import { ICommand } from './../../messages/ICommand';

export interface IMessageBus
{
    Send(message: IQuery | ICommand): Promise<any>;
}
