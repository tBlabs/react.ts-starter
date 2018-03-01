export interface IBrowserWindow
{
    CurrentUrl: string;
    Title: string;
    HistoryBackButtonPressed(callback: () => void): void;
    HistoryPush(url: string): void;
    UrlReplace(url: string): void;
}
