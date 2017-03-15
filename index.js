'use strict'

var nP = Promise

var P = function Promise (fn) {
  return new nP(fn)
}

P.prototype = nP.prototype
P.__proto__ = nP.__proto__

P.resolve = function (v) { return nP.resolve(v) }
P.reject = function (r) { return nP.reject(r) }
P.all = function (i) { return nP.all(i) }
P.race = function (i) { return nP.race(i) }

module.exports = P
