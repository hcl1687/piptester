# PIPTester
> a point in polygon tester

## Code Examples
```javascript
import PIPTester from 'piptester'

const tester = new PIPTester({
    points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}]
})

expect(tester.test({x: 5, y: 3})).to.equal(true)
expect(tester.test({x: 0, y: 1})).to.equal(false)
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

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present Chunlin He