

varying vec2 vUv;
varying float vAdj;
uniform float uTime;
uniform vec3 uColor;


void main(){
  float distance = distance(gl_PointCoord, vec2(0.5));

  float strength = 0.05/ distance - 0.2;

  float final = vAdj > 0.0 ? 1.0 : 0.0;


  gl_FragColor = vec4(uColor, strength * final);
}