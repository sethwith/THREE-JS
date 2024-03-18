import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as THREE from 'three'
import Experience from '../Experience'
import vertexShader from '../Shaders/portal/vertex.glsl'
import fragmentShader from '../Shaders/portal/fragment.glsl'

// Used to:

//  - Load scene

//  - Capture + adjust    
//    portal mesh

export default class SceneLoader{
  constructor(blendPath, jpg, world){
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.blendPath = blendPath
    this.jpg = jpg
    this.debugObject = {
      clearColor: 
      '##0f3435' 
    }
    this.world = world
    
    // Methods
    this.initializeLoaders()
    this.loadBaked()
    this.loadGltf()
    this.addWireMesh()
    this.addUI()
  }

  initializeLoaders(){
  // Texture loader
      this.textureLoader = new THREE.TextureLoader()
  // Draco loader
      this.dracoLoader = new DRACOLoader()
      this.dracoLoader.setDecoderPath('draco/')
  // GLTF loader
      this.gltfLoader = new GLTFLoader()
      this.gltfLoader.setDRACOLoader(this.dracoLoader)
  }

  loadGltf(){
    const poleLightMaterial = new THREE.MeshBasicMaterial({
      color: '#40dee3'
    })
    // Shader
    this.portalMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: {
          value: 0
        },
        uDisplacementStrength: {
          value: 9
        },
        uInsideColor: {
          value: new THREE.Color('#4a4a4a')
        },
        uOutsideColor: {
          value: new THREE.Color('#ffff54')
        }

      }
    })

    this.gltfLoader.load(this.blendPath, (gltf) => {
      this.gltf = gltf
      this.bakedMaterial = new THREE.MeshBasicMaterial({
        map: this.bakedTexture
      })
      
      this.scene.add(this.gltf.scene)
      this.bakedMesh = this.gltf.scene.children.find(child => child.name === 'baked')
      this.bulb1 = this.gltf.scene.children.find((child) => 
        child.name === 'bulb1'
      )
      this.bulb2 = this.gltf.scene.children.find((child) => 
        child.name === 'bulb2'
      )
      this.bulb3 = this.gltf.scene.children.find((child) => 
        child.name === 'bulb3'
      )
      this.bulb4 = this.gltf.scene.children.find((child) => 
        child.name === 'bulb4'
      )
      this.portalCircle = this.gltf.scene.children.find((child) => 
      child.name === 'portalCircle'
      )
      this.bulb1.material = poleLightMaterial
      this.bulb2.material = poleLightMaterial
      this.bulb3.material = poleLightMaterial
      this.bulb4.material = poleLightMaterial
      this.portalCircle.material = this.portalMaterial
      this.bakedMesh.material = this.bakedMaterial
    })
  }

  loadBaked(){
    this.bakedTexture = this.textureLoader.load(this.jpg)
    this.bakedTexture.colorSpace = THREE.SRGBColorSpace
    this.bakedTexture.flipY = false
  }

  addWireMesh(){
    this.wireMesh = new THREE.Mesh(
      new THREE.BoxGeometry(4.80, 1.5, 4.18),
      new THREE.MeshBasicMaterial({
          color: '#427a80',
          wireframe: true
      })
  )
  this.wireMesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(4.80, 0.5, 4.18),
    new THREE.MeshBasicMaterial({
        color: '#427a80',
    })
)
  this.wireMesh.position.set(-0.18, -1.4, 0.16)
  this.wireMesh2.position.set(-0.18, -0.25, 0.16)
  this.scene.add(this.wireMesh, this.wireMesh2)
    }

  updateMaterials(){
    this.portalMaterial.uniforms.uTime.value = this.experience.time.elapsed/1000
    this.portalMaterial.uniforms.uTime.value = this.experience.time.elapsed/1000
    
  }

  addUI(){
    this.ui = this.world.ui
    this.uiFolder = this.ui.instance.addFolder('Colors')

    this.portalFolder = this.ui.instance.addFolder('Portal')

    this.uiFolder.addColor(this.debugObject, 'clearColor').onChange(() => {
      this.experience.renderer.instance.setClearColor(this.debugObject.clearColor)
    })

    this.portalFolder.add(this.portalMaterial.uniforms.uDisplacementStrength, 'value').min(0).max(20).step(0.1).name('uvDisplacement')

    this.portalFolder.addColor(this.portalMaterial.uniforms.uInsideColor, 'value')

    this.portalFolder.addColor(this.portalMaterial.uniforms.uOutsideColor, 'value')
  }

  addBack(){
    this.back = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 4.8),
      new THREE.MeshBasicMaterial({
        color: '#427a80',
      })
    )
    this.back.position.set(-0.17 ,1.05, -1.95)
    this.back.rotation.z = -Math.PI/2
    this.scene.add(this.back)
  }

  
}