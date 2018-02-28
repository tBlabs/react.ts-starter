import { Container } from "inversify";
import { Types } from './Types';
import "reflect-metadata";
import getDecorators from "inversify-inject-decorators";

import { TestComponentParamsExtractor } from './../extractors/testComponent/TestComponentParamsExtractor';
import { ILocation } from './../services/location/ILocation';
import { SnackBarService } from './../services/snackBar/SnackBarService';
import { ISnackBar } from './../services/snackBar/ISnackBar';
import { ToDoListPresenter } from './../presenters/ToDoListPresenter';
import { ITasksListPresenter } from './../presenters/IToDoListPresenter';
import { ISampleService } from './../services/_samples/ISampleService';
import { SampleService } from './../services/_samples/SampleService';
import { Location } from '../services/location/Location';
import { ITestComponentParams } from '../extractors/testComponent/ITestComponentParams';
import { ITasksListService } from '../services/toDoList/ITasksListService';
import { TasksListService } from '../services/toDoList/TasksListService';

const IoC = new Container();

IoC.bind<ISampleService>(Types.ISampleService).to(SampleService);
IoC.bind<ITasksListPresenter>(Types.ITasksListPresenter).to(ToDoListPresenter).inSingletonScope();
IoC.bind<ITasksListService>(Types.ITasksListService).to(TasksListService).inSingletonScope();
IoC.bind<ISnackBar>(Types.ISnackBar).to(SnackBarService).inSingletonScope();
IoC.bind<ILocation>(Types.ILocation).to(Location).inSingletonScope();
IoC.bind<ITestComponentParams>(Types.ITestComponentParams).to(TestComponentParamsExtractor).inSingletonScope();

const LazyInject = getDecorators(IoC).lazyInject;

export { IoC, LazyInject };