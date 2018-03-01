import { injectable } from 'inversify';
import 'reflect-metadata';
import { IWindowTitle } from './IWindowTitle';

@injectable()
export class WindowTitle implements IWindowTitle
{
    public Set(title: string): void
    {
        window.document.title = title;
    }
}