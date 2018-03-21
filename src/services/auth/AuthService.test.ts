import { LoggerMock } from './../logger/LoggerMock';
import { ILogger } from './../logger/ILogger';
import { Credentials } from './../../models/Credentials';
import { AlertMock } from './../alert/AlertMock';
import { IAlert } from './../alert/IAlert';
import { StorageMock } from './../storage/StorageMock';
import { HttpMock } from './../http/HttpMock';
import { IHttp } from './../http/IHttp';
import { IAuthService } from './IAuthService';
import { IMessageBus } from './../messageBus/IMessageBus';
import { AuthService } from './AuthService';
import { MessageBus } from '../messageBus/MessageBus';
import { IStorage } from '../storage/IStorage';
import { ISnackBar } from '../snackBar/ISnackBar';

test('should call http and store auth token', async () =>
{
    expect.assertions(2);

    const logger: ILogger = new LoggerMock();
    const http: IHttp = new HttpMock();
    const storage: IStorage = new StorageMock();
    const alert: IAlert = new AlertMock();
    const messageBus: IMessageBus = new MessageBus(logger, http, storage, alert);
    const authService: IAuthService = new AuthService(messageBus, storage);
    const credentials: Credentials = new Credentials('email', 'pass');

    const httpSpy = jest.spyOn(http, 'Post');

    await authService.Login(credentials);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(storage.AuthToken).toBe('auth_token_for_email');
});