import { Types } from '../IoC/Types';
import { SampleService } from '../services/_samples/SampleService';
import * as React from 'react';
import Toggle from "./Toggle";
import Switch from "./Switch";
import { LazyInject } from './../IoC/IoC';
import { ToDoListService } from '../services/toDoList/ToDoListService';
import { ToDoListComponent } from './ToDoItemsListComponent';

export default class App extends React.Component<{}, {}>
{
  @LazyInject(Types.IToDoListService)
  private _toDoList: ToDoListService;

  public render(): JSX.Element
  {
    return (
      <div>
        <ToDoListComponent />
        <button value="new item"
          onClick={ () =>
          {
            this._toDoList.Add('item' + Math.random());
          } } />
      </div>
    );
  }
}
