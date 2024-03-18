import Experience from "../Experience"

export default class Popup{
  constructor(mesh){
    this.experience = new Experience()
    this.div = document.querySelector('.popUp')
    this.mesh = mesh
    this.location = true
    this.runtime = true
    if(this.location)
    this.stateLocation()
    if(this.runtime)
    this.stateRuntime()
  }

  stateLocation(){
    this.locationText =
    `Location: ${Math.round((this.mesh.position.x * 100))/100}, ${Math.round((this.mesh.position.y * 100))/100}, ${Math.round((this.mesh.position.z * 100))/100}`
    this.div.innerHTML = 
    `${this.locationText} <hr>`
  }

  stateRuntime(){
    this.runtimeText = `
    Runtime: ${this.experience.time.elapsed/1000}`
    this.div.innerHTML += `${this.runtimeText} <hr>`
  }

  update(){
    if(this.location)
    this.stateLocation()
    if(this.runtime)
    this.stateRuntime()
  }
}