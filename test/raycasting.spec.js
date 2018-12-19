import PIPTester from 'src'

describe('Ray Casting test', function () {
  it('test 3 sides polygon, point inside', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}],
      mode: 'ray'
    })

    expect(tester.test({x: 5, y: 3})).to.equal(true)
  })

  it('test 3 sides polygon, point outside', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}],
      mode: 'ray'
    })

    expect(tester.test({x: 0, y: 1})).to.equal(false)
  })

  it('test 3 sides polygon, point on the side', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}],
      mode: 'ray'
    })

    expect(tester.test({x: 3, y: 3})).to.equal(true)
  })

  it('test 3 sides polygon, point is the vertex', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}],
      mode: 'ray'
    })

    expect(tester.test({x: 0, y: 0})).to.equal(true)
    expect(tester.test({x: 5, y: 5})).to.equal(true)
    // different
    expect(tester.test({x: 10, y: 0})).to.equal(true)
  })

  it('test 5 sides polygon', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 2, y: 0}, {x: 3, y: 1}, {x: 2, y: 2}, {x: 1, y: 2}],
      mode: 'ray'
    })

    expect(tester.test({x: 1, y: 1})).to.equal(true)
    expect(tester.test({x: 0, y: 1})).to.equal(false)
    expect(tester.test({x: 2, y: 0})).to.equal(true)
    expect(tester.test({x: 1.5, y: 2})).to.equal(true)
  })
})
