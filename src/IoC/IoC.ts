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
import { IAuthService } from './../services/auth/IAuthService';
import { BrowserWindow } from './../services/browserWindow/BrowserWindow';
import { IBrowserWindow } from './../services/browserWindow/IBrowserWindow';
import { AuthService } from './../services/auth/AuthService';
import { ILocator } from './../services/locator/ILocator';
import { SnackBarService } from './../services/snackBar/SnackBarService';
import { ISnackBar } from './../services/snackBar/ISnackBar';
import { ISampleService } from './../services/_samples/ISampleService';
import { SampleService } from './../services/_samples/SampleService';
import { Locator } from "../services/locator/Locator";
import { SampleComponentLocatorParams } from '../components/_samples/SampleComponent';
import { ILocatorParams } from "../services/locator/ILocatorParams";
import { LocatorParams } from "../services/locator/LocatorParams";
import { Http } from '../services/http/Http';
import { Storage } from "../services/storage/Storage";
import { MessageBus } from "../MessageBus/MessageBus";

const IoC = new Container();

IoC.bind<ISampleService>(Types.ISampleService).to(SampleService);
IoC.bind<ISnackBar>(Types.ISnackBar).to(SnackBarService).inSingletonScope();
IoC.bind<ILocator>(Types.ILocator).to(Locator).inSingletonScope();
IoC.bind<ILocatorParams<SampleComponentLocatorParams>>(Types.ILocatorParams).to(LocatorParams).inSingletonScope();
IoC.bind(Types.IBrowserWindow).to(BrowserWindow);

IoC.bind<IAuthService>(Types.IAuthService).to(AuthService);
IoC.bind<IHttp>(Types.IHttp).to(HttpMock);
IoC.bind<IStorage>(Types.IStorage).to(Storage);
IoC.bind<IAlert>(Types.IAlert).to(Alert);
IoC.bind<ILogger>(Types.ILogger).to(Logger);
IoC.bind<MessageBus>(Types.MessageBus).to(MessageBus);


const LazyInject = getDecorators(IoC).lazyInject;

export { IoC, LazyInject };