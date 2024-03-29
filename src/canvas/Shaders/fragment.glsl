varying vec2 vUv;

vec3 colorA = vec3(0.91, 0.12, 0.87);
vec3 colorB = vec3(0.129,0.299,1.000);

void main() {
  vec2 normalizedPixel = gl_FragCoord.xy/500.0;
  vec3 color = mix(colorA, colorB, normalizedPixel.x);

  gl_FragColor = vec4(color,1.0);
}