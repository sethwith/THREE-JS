import glsl from 'vite-plugin-glsl';


export default {
  publicDir: './static/',
  plugins: [glsl()],
  base: "/THREE-JS/"
}