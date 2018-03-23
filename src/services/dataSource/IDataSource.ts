import { guid } from './../../types/guid';

export interface IDataSource<T>
{
    Load(page: number, count: number): Promise<T[]>;
    Save(id: guid): Promise<void>;
}
