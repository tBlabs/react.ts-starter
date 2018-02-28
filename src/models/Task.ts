import { guid } from '../types/guid';

export class Task
{
    id: number;
    text: string;
    isDone: boolean;

    constructor(text: string, isDone?: boolean)
    {
        this.id = Math.random(); // TODO: move outside
        this.text = text;
        this.isDone = isDone !== undefined ? true : false;
    }
}
