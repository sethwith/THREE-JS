import * as THREE from 'three'
import Experience from '../Experience'
import UI from '../Utils/UI'
import vertexShader from '../Shaders/wave/vertex.glsl'
import fragmentShader from '../Shaders/wave/fragment.glsl'
import MouseControls from '../Utils/MouseControls'



export default class TestMesh{
  constructor(width, height){
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.width = width
    this.height = height
    this.time = this.experience.time
    this.ui = new UI()
    
    
    this.setGeometry()
    this.setZ()
    this.setMaterial()
    this.setMesh()
    this.setDebug()
    this.setMouseControls()
    
  }

  setZ(){
    const count = this.geometry.attributes.position.count
    const zCoordinates = new Float32Array(count)
    for(let i = 0; i < count; i++){
      zCoordinates[i] = Math.sqrt(Math.random() + 0.5)
    }
    this.geometry.setAttribute('zRandom', new THREE.BufferAttribute(zCoordinates, 1))
  }

  setGeometry(){
    this.geometry = new THREE.PlaneGeometry(this.width, this.height, 512, 512)
  }

  setMaterial(){
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: {
          value: 0
        },
        uUpperColor: {
          value: new THREE.Color('orange')
        },
        uLowerColor: {
          value: new THREE.Color('blue')
        },
        uResolution: {
          value: new THREE.Vector2(this.experience.canvas.width, this.experience.canvas.height)
        },
        uMouse: {
          value: new THREE.Vector2(0,0)
        }
      }
    })
  }

  setMesh(){
    this.mesh = new THREE.Mesh(
      this.geometry,
      this.material
    )
    this.mesh.rotateX(-Math.PI/2)
    this.scene.add(this.mesh)
  }

  updateMaterials(){
    this.material.uniforms.uTime.value = this.time.clockElapsed
  }

  setDebug(){
    this.debugObject = {
      upperColor: new THREE.Color('orange'),
      lowerColor : new THREE.Color('purple')
    }

    this.ui.instance.addColor(this.debugObject, 'upperColor').onChange(() =>{
      this.material.uniforms.uUpperColor.value.set(this.debugObject.upperColor)
    })

    this.ui.instance.addColor(this.debugObject, 'lowerColor').onChange(() =>{
      this.material.uniforms.uLowerColor.value.set(this.debugObject.lowerColor)
    })
  }

  setMouseControls(){
    this.controls = new MouseControls()
    this.controls.on('mouseMoved', () => {
      this.material.uniforms.uMouse.value.set(this.controls.mouseX, this.controls.mouseY)
      
    })
  }
}