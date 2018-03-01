import { IWindowTitle } from './../title/IWindowTitle';
import { Locator, LocationData, Locations, IHistory } from './Locator';
import base64url from 'base64url';

describe(Locator.name, () =>
{
    let locator: Locator;

    beforeEach(() =>
    {
        const history: IHistory = { pushState(a, b, c) { } };
        const title: IWindowTitle = { Set(t) { } };
        locator = new Locator(history, title);
    });

    it('should return Home location for empty input', () =>
    {
        const result: LocationData = locator.ParseLocation('');

        expect(result.location).toBe(Locations.Home);
        expect(result.params).toBeUndefined();
    });

    it('should return Home location for "/"', () =>
    {
        const result: LocationData = locator.ParseLocation('/');

        expect(result.location).toBe(Locations.Home);
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

    it('should return "NotFound" without params for to much data', () =>
    {
        const result: LocationData = locator.ParseLocation('/route/too/much/data');

        expect(result.location).toBe('NotFound');
        expect(result.params).toBeUndefined();
    });

    it('Is() works', () =>
    {
        locator.GoTo(Locations.Home);

        const result: boolean = locator.Is(Locations.Home);

        expect(result).toBeTruthy();
    });
}); 