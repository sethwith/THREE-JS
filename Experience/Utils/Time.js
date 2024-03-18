import Experience from "../Experience";
import EventEmitter from "./EventEmitter";
import * as THREE from 'three'


export default class Time extends EventEmitter{
  constructor(){
    super()
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.experience = new Experience()
    this.clock = new THREE.Clock()
    this.clockElapsed = 0

    // Skip first frame
    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick(){
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start
    this.clockElapsed = this.clock.getElapsedTime()

    // ALERT
    this.trigger('tick')

    // RAF
    window.requestAnimationFrame(() =>{
      this.tick()
    })
  }
}