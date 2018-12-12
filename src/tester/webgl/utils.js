export function warn (msg) {
  window.console.log(msg)
}

export function setupWebGL (canvas, attribs, onError) {
  onError = onError || warn

  if (canvas.addEventListener) {
    canvas.addEventListener('webglcontextcreationerror', event => {
      onError(event.statusMessage)
    }, false)
  }
  const context = create3DContext(canvas, attribs)
  if (!context) {
    if (!window.WebGLRenderingContext) {
      onError('')
    } else {
      onError('')
    }
  }

  return context
}

function create3DContext (canvas, attribs) {
  const names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl']
  let context = null
  for (let i = 0; i < names.length; ++i) {
    try {
      context = canvas.getContext(names[i], attribs)
    } catch (e) {
      // warn(e)
    }
    if (context) {
      break
    }
  }

  return context
}

export function initShaders (gl, vshader, fshader) {
  const program = createProgram(gl, vshader, fshader)
  if (!program) {
    warn('Failed to create program')
    return false
  }

  gl.useProgram(program)
  gl.program = program

  return true
}

export function createProgram (gl, vshader, fshader) {
  // Create shader object
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader)
  if (!vertexShader || !fragmentShader) {
    return null
  }

  // Create a program object
  const program = gl.createProgram()
  if (!program) {
    return null
  }

  // Attach the shader objects
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)

  // Link the program object
  gl.linkProgram(program)

  // Check the result of linking
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked) {
    const error = gl.getProgramInfoLog(program)
    warn('Failed to link program: ' + error)
    gl.deleteProgram(program)
    gl.deleteShader(fragmentShader)
    gl.deleteShader(vertexShader)
    return null
  }

  return program
}

export function loadShader (gl, type, source) {
  // Create shader object
  const shader = gl.createShader(type)
  if (shader == null) {
    warn('unable to create shader')
    return null
  }

  // Set the shader program
  gl.shaderSource(shader, source)

  // Compile the shader
  gl.compileShader(shader)

  // Check the result of compilation
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!compiled) {
    const error = gl.getShaderInfoLog(shader)
    warn('Failed to compile shader: ' + error)
    gl.deleteShader(shader)
    return null
  }

  return shader
}

export function getWebGLContext (canvas, attribs, debug) {
  // Get the rendering context for WebGL
  var gl = setupWebGL(canvas, attribs)
  if (!gl) {
    return null
  }

  return gl
}
