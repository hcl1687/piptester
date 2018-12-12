import PIPTester from 'src'

describe('WebGL test', function () {
  it('test 3 sides polygon, point inside', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}]
    })

    expect(tester.test({x: 5, y: 3})).to.equal(true)
  })

  it('test 3 sides polygon, point outside', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}]
    })

    expect(tester.test({x: 0, y: 1})).to.equal(false)
  })

  it('test 3 sides polygon, point in the side', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}]
    })

    expect(tester.test({x: 3, y: 3})).to.equal(true)
  })

  it('test 3 sides polygon, point is the vertex', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}]
    })

    expect(tester.test({x: 0, y: 0})).to.equal(false)
    expect(tester.test({x: 5, y: 5})).to.equal(false)
    expect(tester.test({x: 10, y: 0})).to.equal(false)
  })
})
