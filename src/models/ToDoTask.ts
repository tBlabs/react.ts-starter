import { guid } from './../types/guid';

export class ToDoTask
{
    id: number;
    text: string;
    isDone: boolean;

    constructor(text: string)
    {
        this.id = Math.random(); // TODO: move outside
        this.text = text;
        this.isDone = false;
    }
}
