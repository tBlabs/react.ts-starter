import { MessageBusMock } from './../services/messageBus/MessageBusMock';
import { Container } from "inversify";
import { Types } from './Types';
import "reflect-metadata";
import getDecorators from "inversify-inject-decorators";

import { ILogger } from './../services/logger/ILogger';
import { Logger } from './../services/logger/Logger';
import { IAlert } from './../services/alert/IAlert';
import { Alert } from './../services/alert/Alert';
import { IHttp } from './../services/http/IHttp';
import { IStorage } from './../services/storage/IStorage';
import { HttpMock } from './../services/http/HttpMock';
import { IMessageBus } from './../services/messageBus/IMessageBus';
import { MessageBus } from './../services/messageBus/MessageBus';
import { IAuthService } from './../services/auth/IAuthService';
import { BrowserWindow } from './../services/browserWindow/BrowserWindow';
import { IBrowserWindow } from './../services/browserWindow/IBrowserWindow';
import { AuthService } from './../services/auth/AuthService';
import { WindowTitle } from './../services/title/WindowTitle';
import { IWindowTitle } from './../services/title/IWindowTitle';
import { ILocator } from './../services/locator/ILocator';
import { TestComponentParamsExtractor } from './../extractors/testComponent/TestComponentParamsExtractor';
import { SnackBarService } from './../services/snackBar/SnackBarService';
import { ISnackBar } from './../services/snackBar/ISnackBar';
import { ITasksListPresenter } from './../presenters/ITasksListPresenter';
import { ISampleService } from './../services/_samples/ISampleService';
import { SampleService } from './../services/_samples/SampleService';
import { ITestComponentParams } from '../extractors/testComponent/ITestComponentParams';
import { ITasksListService } from '../services/toDoList/ITasksListService';
import { TasksListService } from '../services/toDoList/TasksListService';
import { Locator } from "../services/locator/Locator";
import { SampleComponentLocatorParams } from '../components/_samples/SampleComponent';
import { TasksListPresenter } from '../presenters/TasksListPresenter';
import { ILocatorParams } from "../services/locator/ILocatorParams";
import { LocatorParams } from "../services/locator/LocatorParams";
import { Http } from '../services/http/Http';
import { Storage } from "../services/storage/Storage";

const IoC = new Container();

IoC.bind<ISampleService>(Types.ISampleService).to(SampleService);
IoC.bind<ITasksListPresenter>(Types.ITasksListPresenter).to(TasksListPresenter).inSingletonScope();
IoC.bind<ITasksListService>(Types.ITasksListService).to(TasksListService).inSingletonScope();
IoC.bind<ISnackBar>(Types.ISnackBar).to(SnackBarService).inSingletonScope();
IoC.bind<ILocator>(Types.ILocator).to(Locator).inSingletonScope();
IoC.bind<ITestComponentParams>(Types.ITestComponentParams).to(TestComponentParamsExtractor).inSingletonScope();
IoC.bind<ILocatorParams<SampleComponentLocatorParams>>(Types.ILocatorParams).to(LocatorParams).inSingletonScope();
IoC.bind(Types.IBrowserWindow).to(BrowserWindow);
IoC.bind(Types.IWindowTitle).to(WindowTitle);

IoC.bind<IAuthService>(Types.IAuthService).to(AuthService);
IoC.bind<IMessageBus>(Types.IMessageBus).to(MessageBusMock);
IoC.bind<IHttp>(Types.IHttp).to(HttpMock);
IoC.bind<IStorage>(Types.IStorage).to(Storage);
IoC.bind<IAlert>(Types.IAlert).to(Alert);
IoC.bind<ILogger>(Types.ILogger).to(Logger);


const LazyInject = getDecorators(IoC).lazyInject;

export { IoC, LazyInject };