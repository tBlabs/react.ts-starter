import { injectable } from 'inversify';
import 'reflect-metadata';
import { LoginQuery } from './../../messages/auth/LoginQuery';
import { IHttp } from './IHttp';

@injectable()
export class HttpMock implements IHttp
{
    public async Post(url: string, data: any, headers: any): Promise<any>
    {
        // if (url === 'http://localhost:3000/api/cqrsbus')
        // {
        //     const messageName: string = Object.keys(data)[0];
        //     const messageBody: object = data[messageName];

        //     switch (messageName)
        //     {
        //         case LoginQuery.name:
        //             {
        //                 const loginQuery: LoginQuery = messageBody as LoginQuery;

        //                 if (loginQuery.email === 'e@mail.com')
        //                 {
        //                     return 'auth_token_for_' + loginQuery.email;
        //                 }
        //                 else
        //                     return Exception(ExCode.WrongPassword);
        //             }

        //         default:
        //             throw new Error('Unknown Message');
        //     }
        // }
    }
}