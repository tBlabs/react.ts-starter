import { guid } from './../types/guid';

export class ToDoTask
{
    id: number;
    name: string;
    isDone: boolean;

    constructor(name: string)
    {
        this.id = Math.random(); // TODO: remove this ugly simplification in future
        this.name = name;
        this.isDone = false;
    }
}
