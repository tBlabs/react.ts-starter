export interface IHistory
{
    pushState(data: any, title: string, url?: string | null): void;
}
