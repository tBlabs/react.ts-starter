# Router

## Locations list

enum Location
{
    Route1,
    Route2,
    ...
}

## Jump to location

locator.GoTo(Location.Route1)
locator.GoTo(Location.Route1, { foo: "bar" })

## Is in location

locator.Is(Location.Route1)

## Get params from url in component

Make params class:

class SampleComponentLocatorParams
{
    foo: string;
    bar: number;
}

Inject `LocatorParams<T>`, get params by:

_params.Params$.value.foo

Don't forget to subscribe to `_params.Params$`.

## Set param in url from component

_locator.SetParam('foo', 'new value')

# Todo

- Bind Location with window title
- Load params to url at location entry



# Typescript + React + Parcel + IoC + Rx = ❤️ 

This repository has basic settings for buildling react application in Typescript.

The original source code of the provided example is [here](https://github.com/kentcdodds/advanced-react-patterns/blob/master/14-use-control-props/index.html).

## Built in settings

- React + ReactDOM (ver.16)
- Typescript (with TSLint setting)
- Prettier + tslint-config-prettier
- Test configuration using Jest + Enzyme
- Parcel bundler

## How to start development for the application

    npm run serve

Execute the command and you can run & test the application on `localhost:1234` in the browser.

## How to build the application

    npm run build

The default output directory is `/dist`.
