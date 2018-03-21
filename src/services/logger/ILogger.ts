export interface ILogger
{
    Header: string;
    Info(...args: any[]): void;
}
