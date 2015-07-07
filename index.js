'use strict'

var getNpmPackage = require('package-json')
var mothership = require('mothership')
var validatePackageName = require('validate-npm-package-name')
var ap = require('ap')
var extend = require('xtend')
var path = require('path')

var applyDefaults = ap.partial(extend, {
  version: '',
  cwd: process.cwd()
})

module.exports = function getPackage (name, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  options = applyDefaults(options)

  if (isPackage(name)) {
    return getNpmPackage(name, options.version || 'latest', callback)
  }

  // local path
  mothership(path.resolve(options.cwd, name), Boolean, function (err, pkg) {
    if (!err && !pkg) err = new Error('package.json not found')
    if (err) return callback(err)
    var json = pkg.pack
    // if we requested a specific version and the local version doesn't match,
    // start over and ask npm
    if (options.version && options.version !== json.version) {
      return getPackage(json.name, options, callback)
    }
    callback(null, json)
  })
}

// if it's not a package, it's a path
function isPackage (name) {
  return validatePackageName(name).validForOldPackages
}
