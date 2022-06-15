// Clase Preloads, para separar los preloads y tener mejor orden
export class Preloads extends Phaser.Scene {
  // Se extiende de Phaser.Scene porque es una escena
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("Preloads");
  }

  preload() {
    this.load.image('carga_bg','public/assets/images/carga_bg.png');
    this.load.image('menu_bg','public/assets/images/menu_bg.png');
    //Por ahora dejamos custom de lado
    //this.load.image('custom_bg','public/assets/images/custom_bg.png');
    this.load.image('PriSapo','public/assets/images/sapojg1.png')
    this.load.image('tablero_bg','public/assets/images/tablero_bg.png');
    this.load.image('ayuda_bg','public/assets/images/ayuda_bg.png');
  }

  create() {
    // Se agrega img de fondo
    this.add.image(this.cameras.main.centerX,
    this.cameras.main.centerY,
       'carga_bg').setScale(1.4);
    // Se agrega un timer y luego a la escena del menú principal
    setTimeout(() => {
      this.scene.start("MainMenu");
    }, 1500);
  }
}
