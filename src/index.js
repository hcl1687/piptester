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

  test (point) {
    if (!this.boundingRectTest(point)) {
      return false
    }

    if (this.tester) {
      return this.tester.test(point)
    }

    return true
  }
}

export default PIPTester
