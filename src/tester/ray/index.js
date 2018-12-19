class RayCastingTester {
  constructor (opts) {
    this.points = opts.points
    this.boundingRect = opts.boundingRect
    this.epsilon = opts.e || 1.0
    this.sides = []

    this._createSides()
  }

  test (point) {
    const startPoint = {
      x: this.boundingRect.xMin - this.epsilon,
      y: point.y
    }
    const testRay = this._createSide(startPoint, point)

    // is on the side
    const ret = this.sides.some(side => this._isOnTheSide(point, side))
    if (ret) {
      return true
    }

    let intersections = 0
    this.sides.forEach(side => {
      if (this._isIntersect(testRay, side)) {
        intersections = intersections + 1
      }
    })

    return (intersections & 1) === 1
  }

  // Internal methods ======================================
  _createSides () {
    const len = this.points.length
    for (let i = 0; i < len; i++) {
      const startPoint = this.points[i]
      const endPoint = this.points[(i + 1) % len]
      const side = this._createSide(startPoint, endPoint)
      this.sides.push(side)
    }
  }

  _createSide (sp, ep) {
    const a = ep.y - sp.y
    const b = sp.x - ep.x
    const c = (ep.x * sp.y) - (sp.x * ep.y)
    return { sp, ep, a, b, c }
  }

  _isIntersect (s1, s2) {
    const NO = 0
    const YES = 1
    const COLLINEAR = 2
    let d1
    let d2

    d1 = (s1.a * s2.sp.x) + (s1.b * s2.sp.y) + s1.c
    d2 = (s1.a * s2.ep.x) + (s1.b * s2.ep.y) + s1.c

    if (d1 > 0 && d2 > 0) {
      return NO
    }
    if (d1 < 0 && d2 < 0) {
      return NO
    }

    d1 = (s2.a * s1.sp.x) + (s2.b * s1.sp.y) + s2.c
    d2 = (s2.a * s1.ep.x) + (s2.b * s1.ep.y) + s2.c
    if (d1 > 0 && d2 > 0) {
      return NO
    }
    if (d1 < 0 && d2 < 0) {
      return NO
    }

    if ((s1.a * s2.b) - (s2.a * s1.b) < 0.00001) {
      return COLLINEAR
    }

    return YES
  }

  _isOnTheSide (p, s1) {
    const d = (s1.a * p.x) + (s1.b * p.y) + s1.c
    return d === 0 && ((p.x - s1.sp.x) * (p.x - s1.ep.x) <= 0)
  }
}

export default RayCastingTester
