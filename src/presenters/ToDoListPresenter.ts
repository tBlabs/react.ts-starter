// import { injectable } from 'inversify';
// import { ToDoTask } from './../models/ToDoTask';
// import * as Rx from 'rxjs';

// @injectable()
// export class ToDoListPresenter
// {
//     @LazyInject(Types.IToDoListService)
//     private _toDoList: IToDoListService;

//     public filter$: Rx.BehaviorSubject<string>;
//     public items$: Rx.BehaviorSubject<ToDoTask[]>;

//     constructor()
//     {
//         // this._toDoList.itemsStream.subscribe((items)=>{
//         //     const filtered = items.filter(i=>i.text.includes(this.filter$.getValue()));
//         //     this.items$.next(items.filter(()=>items))
//         // });
//     }

//     public SetFilter(text: string)
//     {
//         this.filter$.next(text);
//     }
// }