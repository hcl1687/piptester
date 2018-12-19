import RayCastingTester from './tester/ray'
import WebGLTester from './tester/webgl'

const TESTERS = {
  ray: RayCastingTester,
  webgl: WebGLTester
}

class PIPTester {
  constructor (opts) {
    this.opts = opts
    this.points = opts.points || []
    this.mode = opts.mode || 'webgl'
    this.boundingRect = {
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0
    }

    if (this.points.length < 3) {
      throw new Error('make sure to provide 3 points at least.')
    }

    this._setBoundingRect()
    const TESTER = TESTERS[this.mode]
    if (TESTER) {
      const modeOpts = opts[this.mode] || {}
      this.tester = new TESTER({
        points: this.points,
        boundingRect: this.boundingRect,
        ...modeOpts
      })
    }
  }

  _setBoundingRect () {
    this.points.forEach(point => {
      if (point.x < this.boundingRect.xMin) {
        this.boundingRect.xMin = point.x
      } else if (point.x > this.boundingRect.xMax) {
        this.boundingRect.xMax = point.x
      }

      if (point.y < this.boundingRect.yMin) {
        this.boundingRect.yMin = point.y
      } else if (point.y > this.boundingRect.yMax) {
        this.boundingRect.yMax = point.y
      }
    })
  }

  boundingRectTest (point) {
    const { xMin, xMax, yMin, yMax } = this.boundingRect
    return !(point.x < xMin || point.x > xMax || point.y < yMin || point.y > yMax)
  }

  vertexTest (point) {
    return this.points.some(item => (item.x === point.x && item.y === point.y))
  }

  test (point) {
    // if it's outside of the bounding Rectangular, return false
    if (!this.boundingRectTest(point)) {
      return false
    }

    // if it's the polygon's vertex, return true
    if (this.vertexTest(point)) {
      return true
    }

    if (this.tester) {
      return this.tester.test(point)
    }

    return true
  }
}

export default PIPTester
