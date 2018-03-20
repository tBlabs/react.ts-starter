import { IBrowserWindow } from './IBrowserWindow';

export class BrowserWindowMock implements IBrowserWindow
{
    public CurrentUrl: string;
    public Title: string;

    public HistoryBackButtonPressed(callback: () => void): void
    {
    }

    public HistoryPush(url: string): void
    {
    }

    public UrlReplace(url: string): void
    {
    }
}