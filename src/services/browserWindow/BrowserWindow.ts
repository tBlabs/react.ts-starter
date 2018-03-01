import { injectable } from 'inversify';
import 'reflect-metadata';
import { IBrowserWindow } from "./IBrowserWindow";

@injectable()
export class BrowserWindow implements IBrowserWindow
{
    public get CurrentUrl(): string
    {
        return window.location.pathname;
    }

    public set Title(title: string)
    {
        window.document.title = title;
    }

    public HistoryBackButtonPressed(callback: () => void)
    {
        window.addEventListener('popstate', (e: PopStateEvent) =>
        {
            if (callback) // does it make any sense with Typescript?
            {
                callback();
            }
        });
    }

    public HistoryPush(url: string): void
    {
        window.history.pushState(null, url, url);
    }

    public UrlReplace(url: string): void
    {
        window.history.replaceState(null, url, url);
    }
}
