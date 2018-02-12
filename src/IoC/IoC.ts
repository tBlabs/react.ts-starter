import { Container } from "inversify";
import { Types } from './Types';
import "reflect-metadata";
import getDecorators from "inversify-inject-decorators";

import { ILocation } from './../services/location/ILocation';
import { SnackBarService } from './../services/snackBar/SnackBarService';
import { ISnackBar } from './../services/snackBar/ISnackBar';
import { ToDoListPresenter } from './../presenters/ToDoListPresenter';
import { IToDoListPresenter } from './../presenters/IToDoListPresenter';
import { ISampleService } from './../services/_samples/ISampleService';
import { IToDoListService } from './../services/toDoList/IToDoListService';
import { ToDoListService } from './../services/toDoList/ToDoListService';
import { SampleService } from './../services/_samples/SampleService';
import { XLocation } from '../services/location/Location';


const IoC = new Container();

IoC.bind<ISampleService>(Types.ISampleService).to(SampleService);
IoC.bind<IToDoListPresenter>(Types.IToDoListPresenter).to(ToDoListPresenter).inSingletonScope();
IoC.bind<IToDoListService>(Types.IToDoListService).to(ToDoListService).inSingletonScope();
IoC.bind<ISnackBar>(Types.ISnackBar).to(SnackBarService).inSingletonScope();
IoC.bind<ILocation>(Types.ILocation).to(XLocation).inSingletonScope();




const LazyInject = getDecorators(IoC).lazyInject;


export { IoC, LazyInject };