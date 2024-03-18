import * as THREE from 'three'
import Sizes from './Utils/Sizes'
import Camera from './Camera'
import Renderer from './Renderer'
import Time from './Utils/Time'
import World from './World/World'
import Popup from './Utils/Popup'

let instance = null

export default class Experience{
  constructor(canvas){
    if(instance){
      return instance
    }
    instance = this

    // Classes
    this.canvas = canvas
    this.sizes = new Sizes()
    this.camera = new Camera()
    this.scene = new THREE.Scene()
    this.renderer = new Renderer()
    this.time = new Time
    this.world = new World()
    this.popup = new Popup(this.camera.instance)



    // Listen for resize
    this.sizes.on('resize', () => {
      this.resize()
    })

    // Listen for tick
    this.time.on('tick', () => {
      this.update()
    })
  }

  update(){
    this.camera.update()
    this.renderer.update()
    this.world.update()
    if(this.popup){
      this.popup.update()
    }
  }

  resize(){
    this.camera.resize()
    this.renderer.resize()
  }
}

