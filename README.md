# that-promise

Native Promise but methods aren't context dependent.

## example

```js
const {resolve} = Promise

pipe(
  map(asyncFn),
  Promise.all // <-- ERROR!
)

pipe(
  map(asyncFn),
  Promise.all.bind(Promise) // works
)

resolve(123) // ERROR!
resolve.call(Promise, 123) // works
```

`this` is mean and just not cool, man.

```js
const Promise = require('that-promise')
const {resolve} = Promise

pipe(
  map(asyncFn),
  Promise.all // just works like it should
)

resolve(123) // just works like it should
```

Good code is good.

## overwrite annoying native Promise

Overwrites `window.Promise` in the browser or `global.Promise` in Node.js.

```js
require('that-promise/register')()

const {resolve} = Promise
resolve(123) // works

// revert to native Promise (why tho?)
require('that-promise/register').unregister()
```
