import { IAlert } from './IAlert';

export class AlertMock implements IAlert
{
    public Error(message: string): void
    {
    }
}