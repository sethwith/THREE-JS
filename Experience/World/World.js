
import Experience from '../Experience'
import UI from '../Utils/UI'
import SceneLoader from '../Utils/SceneLoader'
import Fireflies from './Fireflies'


export default class World{
  constructor(){
    this.experience = new Experience()
    this.ui = new UI()
    this.scene = this.experience.scene
    this.portalScene = new SceneLoader( '/Resources/portalFinalBRUH.glb', '/Resources/finalPortal.jpg', this)
    this.fireflies = new Fireflies(this)
  }

  update(){
    // Scene
    this.portalScene.updateMaterials()
    // Fireflies
    this.fireflies.update()
    
  }

}