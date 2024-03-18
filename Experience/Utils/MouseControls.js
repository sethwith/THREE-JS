import Experience from "../Experience";
import EventEmitter from "./EventEmitter";

export default class MouseControls extends EventEmitter{
  constructor(){
    super()
  this.experience = new Experience()

  this.sizes = this.experience.sizes

  this.setListener()
  }
  
  setListener(){
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX 
      this.mouseY = e.clientY
      this.trigger('mouseMoved')
    })
  }
}