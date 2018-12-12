import PIPTester from 'src'

describe('Base test', function () {
  it('test 3 sides polygon with ray casting, point inside', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}],
      mode: 'ray'
    })

    expect(tester.test({x: 5, y: 3})).to.equal(true)
  })

  it('test 3 sides polygon with ray casting, point outside', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}],
      mode: 'ray'
    })

    expect(tester.test({x: 0, y: 1})).to.equal(false)
  })

  it('test 3 sides polygon with webgl, point inside', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}]
    })

    expect(tester.test({x: 5, y: 3})).to.equal(true)
  })

  it('test 3 sides polygon with webgl, point outside', function () {
    const tester = new PIPTester({
      points: [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 0}]
    })

    expect(tester.test({x: 0, y: 1})).to.equal(false)
  })
})
