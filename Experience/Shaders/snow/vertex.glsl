varying vec2 vUv;

uniform float uTime;
uniform float uDisplacementStrength;
uniform vec3 uOutsideColor;
uniform vec3 uInsideColor;


void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
}