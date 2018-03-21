import { ILogger } from './ILogger';

export class LoggerMock implements ILogger
{
    public Header: string = '';

    public Info(...args: any[]): void
    {
    }
}