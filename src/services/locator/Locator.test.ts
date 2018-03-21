import { BrowserWindowMock } from './../browserWindow/BrowserWindowMock';
import { Location } from './../../router/Location';
import { Locator } from './Locator';
import base64url from 'base64url';
import { LocationData } from '../../router/LocationData';
import { BrowserWindow } from '../browserWindow/BrowserWindow';

describe(Locator.name, () =>
{
    let locator: Locator;

    beforeEach(() =>
    {
        const window = new BrowserWindowMock();
        locator = new Locator(window);
    });

    it('should return Home location for empty input', () =>
    {
        const result: LocationData = locator.ParseLocation('');

        expect(result.location).toBe(Location.Home);
        expect(result.params).toBeUndefined();
    });

    it('should return Home location for "/"', () =>
    {
        const result: LocationData = locator.ParseLocation('/');

        expect(result.location).toBe(Location.Home);
        expect(result.params).toBeUndefined();
    });

    it('should return "route" for "/route"', () =>
    {
        const result: LocationData = locator.ParseLocation('/route');

        expect(result.location).toBe('route');
        expect(result.params).toBeUndefined();
    });

    it('should return "route" for "/route/"', () =>
    {
        const result: LocationData = locator.ParseLocation('/route');

        expect(result.location).toBe('route');
        expect(result.params).toBeUndefined();
    });

    it('should return "route" with params', () =>
    {
        const params = { foo: "bar" };
        const result: LocationData = locator.ParseLocation('/route/' + base64url.encode(JSON.stringify(params)));

        expect(result.location).toBe('route');
        expect(result.params).toEqual(params);
    });

    it('should return "route" without params for invalid input', () =>
    {
        const result: LocationData = locator.ParseLocation('/route/invalid_params');

        expect(result.location).toBe('route');
        expect(result.params).toBeUndefined();
    });

    it('should return "NotFound" without params for too much data', () =>
    {
        const result: LocationData = locator.ParseLocation('/route/too/much/data');

        expect(result.location).toBe('NotFound');
        expect(result.params).toBeUndefined();
    });

    it('Is() works', () =>
    {
        locator.GoTo(Location.Home);

        const result: boolean = locator.Is(Location.Home);

        expect(result).toBeTruthy();
    });

    // it('GoTo() returns /home on invalid url', () =>
    // {
    //     locator.GoTo('aaa' as Location);

    //     const result: boolean = locator.Is(Location.Home);

    //     expect(result).toBeTruthy();
    // });
}); 