import * as THREE from 'three'
import Experience from './Experience'

export default class Renderer{
  constructor(){
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes

    // Methods
    this.setInstance()
    this.enableFullscreen()
    this.instance.render(this.scene, this.camera.instance)
  }

  setInstance(){
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })
    this.instance.setSize(this.sizes.width, this.sizes.height)
    }

    update(){
      this.instance.render(this.scene, this.camera.instance)
    }

  resize(){
    this.instance.pixelRatio = this.sizes.pixelRatio
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.render(this.scene, this.camera.instance)
  }

  enableFullscreen(){
    window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement)
    {

        if(this.canvas.requestFullscreen)
        {
            this.canvas.requestFullscreen()
        }
        else if(this.canvas.webkitRequestFullscreen)
        {
            this.canvas.webkitRequestFullscreen()
        }
        
    }

    else
    {
        if(document.exitFullscreen){
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
     
    }
})
  }
  }
