import { initShaders, getWebGLContext, warn } from './utils'

const VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  ' gl_Position = a_Position;\n' +
  '}\n'

const FSHADER_SOURCE =
  'void main() {\n' +
  ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n'

function webGLWarn (msg) {
  warn('WebGL tester:' + msg)
}

class WebGLTester {
  constructor (opts) {
    this.points = opts.points
    this.boundingRect = opts.boundingRect
    this.vertices = []

    this.width = this.boundingRect.xMax - this.boundingRect.xMin
    this.height = this.boundingRect.yMax - this.boundingRect.yMin

    this._createVertices()
    this._init()
  }

  test (point) {
    if (!this.gl) {
      webGLWarn('Failed to test.')
      return
    }

    const gl = this.gl
    const nP = this._clipWithBoundingRect(point)
    // convert y
    // see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
    const y = this.height - nP.y
    let pixels = new Uint8Array(4)
    gl.readPixels(nP.x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

    return pixels[0] === 255
  }

  // Internal methods ======================================
  _init () {
    const canvas = document.createElement('canvas')
    canvas.width = this.width
    canvas.height = this.height

    var gl = getWebGLContext(canvas, {
      preserveDrawingBuffer: true
    })
    if (!gl) {
      return
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      return
    }

    this.gl = gl

    this._initVertexBuffers()

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    this._draw()
  }

  _draw () {
    const gl = this.gl
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.points.length)
  }

  _initVertexBuffers () {
    const gl = this.gl
    const vertices = new Float32Array(this.vertices)
    const n = vertices.length / 2

    const vertexBuffer = gl.createBuffer()
    if (!vertexBuffer) {
      return -1
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    const aPosition = gl.getAttribLocation(gl.program, 'a_Position')
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aPosition)

    return n
  }

  _createVertices () {
    this.points.forEach(point => {
      const temp = this._normalize(this._clipWithBoundingRect(point))
      this.vertices.push(temp.x)
      this.vertices.push(temp.y)
    })
  }

  _clipWithBoundingRect (point) {
    const { xMin, yMin } = this.boundingRect
    return {
      x: point.x - xMin,
      y: point.y - yMin
    }
  }

  _normalize (point) {
    const halfWidth = this.width / 2
    const halfHeight = this.height / 2
    return {
      x: (point.x - halfWidth) / halfWidth,
      y: (halfHeight - point.y) / halfHeight
    }
  }
}

export default WebGLTester
