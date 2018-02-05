import { injectable } from "inversify";
import 'reflect-metadata';
import * as Rx from 'rxjs';
import { IToDoListService } from "./IToDoListService";

@injectable()
export class ToDoListService implements IToDoListService
{
    private items: string[] = [];
    private items$: Rx.Subject<string[]> = new Rx.Subject();

    public get Items(): Rx.Subject<string[]>
    {
        return this.items$;
    }

    public Add(item: string): void
    {
        this.items.push(item);
        this.items$.next(this.items);
    }
}