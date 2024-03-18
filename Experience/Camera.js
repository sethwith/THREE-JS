import * as THREE from 'three'
import Experience from './Experience'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

export default class Camera{
  constructor(){
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.canvas = this.experience.canvas
  
    // Methods
    this.setInstance()
    this.setControls()
  }

  setControls(){
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  setInstance(){
    this.instance = new THREE.PerspectiveCamera(75, this.sizes.width/this.sizes.height, 0.1, 1000)
    this.instance.position.set(-0.05,2,5)
  }

  resize(){
    this.instance.aspect = this.sizes.width/this.sizes.height
    this.instance.updateProjectionMatrix()
    
  }

  update(){
    this.controls.update()
  }


}