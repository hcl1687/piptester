# PIPTester
> a point in polygon tester

## Install

npm install piptester --save

## Code Examples

```javascript
import PIPTester from 'piptester'

// create a 3 sides polygon(triangle) tester, using webgl test by default
const tester = new PIPTester({
  // polygon points
  points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}]
})

expect(tester.test({x: 5, y: 3})).to.equal(true)
expect(tester.test({x: 0, y: 1})).to.equal(false)
```

```javascript
import PIPTester from 'piptester'

// create a 5 sides polygon tester, using Ray Casting test
const tester = new PIPTester({
  points: [{x: 0, y: 0}, {x: 2, y: 0}, {x: 3, y: 1}, {x: 2, y: 2}, {x: 1, y: 2}],
  mode: 'ray'
})

expect(tester.test({x: 1, y: 1})).to.equal(true)
expect(tester.test({x: 0, y: 1})).to.equal(false)
expect(tester.test({x: 2, y: 0})).to.equal(true)
expect(tester.test({x: 1.5, y: 2})).to.equal(true)
```

## Features
List of features ready:
* Ray Casting test
* WebGL test

TODOs for future development:
* winding number test

## Inspiration
This tool is based on [Mecki](https://stackoverflow.com/users/15809/mecki)'s post about [how to determine whether a 2D point is within a polygon](https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon) in stackoverflow.

Tanks for [Mecki](https://stackoverflow.com/users/15809/mecki)'s fantastic answer!

## API Documentation

### PIPTester Class

| Param                | Type                | Description                                 |
| ---------------------| ------------------- | ------------------------------------------- |
| points           | <code>array</code> | the polygon's vertex.
| mode           | <code>string</code> | the mode used to test. options: 'webgl' or 'ray'. default: webgl.

#### test(point) => <code>boolean</code>
test if a point lies inside or outside the polygon.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present Chunlin He