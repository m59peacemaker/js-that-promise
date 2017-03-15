'use strict'

var nP = Promise
var P = require('./')

var setPromise = function (v) {
  if (typeof window !== 'undefined' && typeof window.Promise === 'function') {
    window.Promise = v
  } else if (typeof global !== 'undefined' && typeof global.Promise === 'function') {
    global.Promise = v
  }
}

var register = function() { return setPromise(P) }
register.unregister = function () { return setPromise(nP) }

module.exports = register
