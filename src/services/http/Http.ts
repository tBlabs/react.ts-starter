import { IHttp } from './IHttp';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { AxiosResponse } from 'axios';
import axios from 'axios';

@injectable()
export class Http implements IHttp
{
    public async Post(url: string, data: any, headers: object): Promise<any>
    {
        console.log('POST ', url, data, headers);

        try
        {
            const response: AxiosResponse = await axios.post(url, data, { headers: headers });

            return response.data;
        }
        catch (ex)
        {
            throw new Error(ex.response.data);
        }
    }
}