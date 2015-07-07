'use strict'

var test = require('tape')
var path = require('path')
var getPackage = require('./')

var fixture = path.resolve(__dirname, 'fixtures/local')

test('remote', function (t) {
  t.plan(1)
  getPackage('xtend', function (err, json) {
    if (err) return t.end(err)
    t.equal(json.name, 'xtend')
  })
})

test('local', function (t) {
  t.plan(2)
  getPackage('.', {cwd: fixture}, function (err, json) {
    if (err) return t.end(err)
    t.equal(json.name, 'exposify')
    t.equal(json.version, '0.2.0')
  })
})

test('local with remote fallback for version', function (t) {
  t.plan(2)
  getPackage('.', {version: '0.4.3', cwd: fixture}, function (err, json) {
    if (err) return t.end(err)
    t.equal(json.name, 'exposify')
    t.equal(json.version, '0.4.3')
  })
})
