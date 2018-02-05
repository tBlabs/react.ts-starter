import { injectable } from "inversify";

@injectable()
export class SampleService
{
    constructor()
    {
    }

    public Method()
    {
        console.log('SampleService');

    }
}