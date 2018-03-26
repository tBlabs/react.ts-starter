import { IDataSource } from './../interfaces/IDataSource';
import { BehaviorSubject } from 'rxjs';
import { IListPresenter } from './IListPresenter';
import { injectable } from 'inversify';
import * as  _ from 'lodash';

@injectable()
export class ListPresenter<T> implements IListPresenter<T>
{
    constructor(private _itemsSource: IDataSource<T>)
    { }

    public async Init(): Promise<void>
    {
        this._itemsSource.Items$.subscribe((items: T[]) =>
        {
            this.VisibleItems.next(this.TakePageItems(items));
        })
        // console.log('PRESENTER INIT');
        await this._itemsSource.FetchAll();
    }

    public Page: number = 0;
    public PageSize: number = 5;
    public VisibleItems: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

    public get Items(): T[]
    {
        return this._itemsSource.Items$.value;
    }

    public get FirstVisibleItemIndex(): number
    {
        return (this.Page * this.PageSize) + 1;
    }

    public get LastVisibleItemIndex(): number
    {
        const maxIndex = this.FirstVisibleItemIndex + this.PageSize;

        return (maxIndex > this.Items.length) ? this.Items.length : maxIndex;
    }

    public TakePageItems(items: T[]): T[]
    {
        const sliceFrom = this.Page * this.PageSize;
        const sliceTo = sliceFrom + this.PageSize;

        return items.slice(sliceFrom, sliceTo);
    }

    private FilterAndEmit()
    {
        const copy = (this._itemsSource.Items$.value);
        this.VisibleItems.next(this.TakePageItems(copy));
    }

    private get PagesCount(): number
    {
        return (this._itemsSource.Items$.value.length / this.PageSize) | 0;
    }

    public Next(): void
    {
        if (this.Page < this.PagesCount)
        {
            this.Page += 1;
            this.FilterAndEmit();
        }
    }

    public Prev(): void
    {
        if (this.Page > 0)
        {
            this.Page -= 1;
            this.FilterAndEmit();
        }
    }
}


