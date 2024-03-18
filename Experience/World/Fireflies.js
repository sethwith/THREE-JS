import Experience from "../Experience"
import * as THREE from 'three'
import vertexShader from '../Shaders/fireflies/vertex.glsl'
import fragmentShader from '../Shaders/fireflies/fragment.glsl'


export default class Fireflies{
  constructor(world, count, centerX, centerY, centerZ)
  {
    this.world = world
    this.count = count

    // Center
    this.centerX = centerX
    this.centerY = centerY
    this.centerZ = centerZ

    // Experience
    this.experience = new Experience()
    this.scene = this.experience.scene
    
    // Methods
    this.setGeometry()
    this.setMaterial()
    this.setPoints()
    this.setUI()
  }

  setGeometry(){
    
    // count variable defines 32FloatArray Length
    this.geometry = new THREE.BufferGeometry()
    this.count = 30
    this.positions = new Float32Array(this.count * 3)
    this.randomScale = new Float32Array(this.count)

    // Set bounds for positions from center
    for(let i = 0; i < this.count; i++){
      this.positions[i*3] = (Math.random() - 0.5) * 4
      this.positions[i*3 + 1] = (Math.random()+ 0.5) * 1.5
      this.positions[i*3 + 2] = (Math.random()-0.5) * 4
      this.randomScale[i] = (Math.random())
    }
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3 ))
    this.geometry.setAttribute('aRandomScale', new THREE.BufferAttribute(this.randomScale, 1 ))
  }

  setMaterial(){
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        // Time (s)
        uTime:{
          value: 0
        },
        // Particle Size
        uSize: {
          value: 100
        },
        // devicePixelRatio
        uPixelRatio: {
          value: this.experience.sizes.pixelRatio
        },
        uMidXZ: {
          value: new THREE.Vector2(0.0, -0.89)
        },
        uColor: {
          value: new THREE.Color('#ffff54')
        }
      }
    })
  }

  setPoints(){
    this.points = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.points)
  }

  setUI(){
    // Debug Folder
    this.ui = this.world.ui
    this.debugFolder = this.ui.instance.addFolder('Fireflies')

    // Tweaks
    this.debugFolder.add(this.material.uniforms.uSize,'value').min(0.01).max(100).step(0.1).name('size')

    this.debugFolder.add(this.material.uniforms.uMidXZ.value, 'x').min(0.01).max(5).step(0.01).name('offsetX')

    this.debugFolder.add(this.material.uniforms.uMidXZ.value, 'y').min(-5.0).max(0).step(0.01).name('offsetZ')

    this.debugFolder.addColor(this.material.uniforms.uColor, 'value')
  }

  update(){
    this.material.uniforms.uTime.value = this.experience.time.elapsed/1000;
  }


}