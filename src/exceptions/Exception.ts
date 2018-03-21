import { ExceptionCode } from './ExceptionCode';

export class Exception
{
    constructor(
        public code: ExceptionCode,
        public extra?: any)
    { }
}
