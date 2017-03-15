const test = require('tape')
const P = require('./')
const register = require('./register')
const {unregister} = register

test('native Promise methods suck', t => {
  t.plan(4)
  const {resolve, reject, all, race} = Promise
  try {
    resolve().then(() => {})
    t.fail('resolve() worked without being a property of Promise')
  } catch (err) {
    t.pass('resolve() is context dependent: ' + err.message)
  }
  try {
    reject().then(() => {})
    t.fail('reject() worked without being a property of Promise')
  } catch (err) {
    t.pass('reject() is context dependent: ' + err.message)
  }
  try {
    all([Promise.resolve()]).then(() => {})
    t.fail('all() worked without being a property of Promise')
  } catch (err) {
    t.pass('all() is context dependent: ' + err.message)
  }
  try {
    race([Promise.resolve()]).then(() => {})
    t.fail('race() worked without being a property of Promise')
  } catch (err) {
    t.pass('race() is context dependent: ' + err.message)
  }
})

test('thatPromise methods don\'t suck', t => {
  t.plan(4)
  const {resolve, reject, all, race} = P
  try {
    resolve(123).then(v => t.equal(v, 123, 'resolve()'))
  } catch (err) {
    t.fail('resolve(): ' + err.message)
  }
  try {
    reject('abc').catch(err => t.equal(err, 'abc', 'reject()'))
  } catch (err) {
    t.fail('reject(): ' + err.message)
  }
  try {
    all([Promise.resolve(123)]).then(v => t.deepEqual(v, [123], 'all()'))
  } catch (err) {
    t.fail('all(): ' + err.message)
  }
  try {
    race([Promise.resolve(123)]).then(v => t.equal(v, 123, 'race()'))
  } catch (err) {
    t.fail('race(): ' + err.message)
  }
})

test('thatPromise is otherwise like native Promise', t => {
  t.plan(5)
  t.equal(Promise.length, P.length, 'has correct length: ' + P.length)
  t.true(Promise.resolve() instanceof Promise, 'sanity check')
  t.true(P.resolve() instanceof Promise, 'thatPromise instance of native Promise')
  t.true(Promise.resolve() instanceof P, 'native promise instance of thatPromise')
  new P((resolve, reject) => {
    resolve('abc')
  }).then(v => t.equal(v, 'abc', 'new Promise(fn)'))
})

test('register', t => {
  t.plan(2)
  register()
  var {resolve} = Promise
  try {
    resolve().then(() => t.pass('replaced global Promise with thatPromise'))
  } catch (err) {
    t.pass('global Promise is still lame: ' + err.message)
  }
  unregister()
  var {resolve} = Promise
  try {
    resolve().then(() => {})
    t.fail('resolve() works after calling unregister()')
  } catch (err) {
    t.pass('resolve() is lame again after calling unregister(): ' + err.message)
  }
})
