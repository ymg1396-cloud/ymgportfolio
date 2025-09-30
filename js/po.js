const canvas = document.getElementById('bg');
const gl = canvas.getContext('webgl');
if(!gl){ alert('WebGL을 지원하지 않는 브라우저입니다.'); }

const vertSrc = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = (aPos+1.0)*0.5;
  gl_Position = vec4(aPos,0.0,1.0);
}
`;

const fragSrc = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2  uRes;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
float noise(in vec2 p){
  vec2 i=floor(p); vec2 f=fract(p);
  float a=hash(i);
  float b=hash(i+vec2(1.0,0.0));
  float c=hash(i+vec2(0.0,1.0));
  float d=hash(i+vec2(1.0,1.0));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(a,b,u.x)+ (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0.0;
  float a=.5;
  for(int i=0;i<5;i++){
    v+=a*noise(p); p*=2.02; a*=.5;
  }
  return v;
}
vec3 palette(float t){
  vec3 dCol = vec3(0.04, 0.05, 0.06);
  vec3 a = vec3(0.01, 0.07, 0.06);
  vec3 b = vec3(0.80, 0.70, 0.46);
  vec3 c = vec3(0.15, 0.18, 0.16);
  return dCol + a + t*c + smoothstep(0.35,0.95,t)*b*0.35;
}
void main(){
  vec2 uv = vUv;
  vec2 p = (uv*2.0-1.0);
  p.x *= uRes.x/uRes.y;

  float t = uTime*0.035;
  float n = fbm(p*0.75 + vec2(t, -t*0.7));
  n += 0.35*fbm(p*1.8 + vec2(-t*0.35, t*0.42));

  float vign = smoothstep(1.2, 0.2, length(p*0.9));
  vec3 col = palette(n)*vign;
  col += pow(max(0.0, n-0.7), 2.0)*0.35;

  gl_FragColor = vec4(col, 1.0);
}
`;

function createShader(type, src){
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(s));
  }
  return s;
}
const vs = createShader(gl.VERTEX_SHADER, vertSrc);
const fs = createShader(gl.FRAGMENT_SHADER, fragSrc);
const prog = gl.createProgram();
gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
gl.useProgram(prog);

const quad = new Float32Array([
  -1,-1,  1,-1,  -1,1,
   1,-1,   1,1,  -1,1
]);
const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prog,'aPos');
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

const uTime = gl.getUniformLocation(prog,'uTime');
const uRes  = gl.getUniformLocation(prog,'uRes');

function resize(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.floor(innerWidth * dpr);
  const h = Math.floor(innerHeight * dpr);
  canvas.width = w; canvas.height = h;
  canvas.style.width = innerWidth+'px';
  canvas.style.height = innerHeight+'px';
  gl.viewport(0,0,w,h);
  gl.uniform2f(uRes, w, h);
}
resize(); addEventListener('resize', resize, {passive:true});

let t0 = performance.now();
(function loop(now){
  requestAnimationFrame(loop);
  const t = (now - t0) / 1000;
  gl.uniform1f(uTime, t);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
})(performance.now());
