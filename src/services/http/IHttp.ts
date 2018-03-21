export interface IHttp
{
    Post(url: string, data: any, headers: any): Promise<any>;
}
