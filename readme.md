# get-package [![Build Status](https://travis-ci.org/bendrucker/get-package.svg?branch=master)](https://travis-ci.org/bendrucker/get-package)

> Get package.json from disk/npm depending on the path/name


## Install

```
$ npm install --save get-package
```


## Usage

```js
var getPackage = require('get-package')

getPackage('xtend', callback)
//=> gets latest xtend package.json from npm

getPackage('./node_modules/xtend', callback)
//=> gets package.json from xtend on disk
```

## API

#### `getPackage(name, [options], callback)` -> `undefined`

##### name

*Required*  
Type: `string`

A valid package name or path. Relative paths must begin with a `.` to be detected.

##### options

###### version

Type: `string`  
Default: `latest`

The version to fetch. If the local version does not match, npm will be queried even when `name` is a local path.

###### cwd

Type: `string`  
Default: `process.cwd()`

##### callback

*Required*  
Type: `function`  
Arguments: `err, json`

A callback that will receive the parsed JSON of the package.

## License

MIT © [Ben Drucker](http://bendrucker.me)
