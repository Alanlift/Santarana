// Clase Preloads, para separar los preloads y tener mejor orden
import ButtonFont from "../js/buttonfont.js";
export class Preloads extends Phaser.Scene {
  // Se extiende de Phaser.Scene porque es una escena
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("Preloads");
  }

  preload() {
    this.load.audio('dado','public/assets/sounds/Dado.mp3');
    this.load.image('carga_bg','public/assets/images/carga_bg.png');
    this.load.image('menu_bg','public/assets/images/menu_bg.png');
    //Por ahora dejamos custom de lado
    //this.load.image('custom_bg','public/assets/images/custom_bg.png');
    this.load.image('sapo','public/assets/images/sapojg1.png');
    this.load.image('sapo2','public/assets/images/sapojg2.png');
    this.load.image('sapo3','public/assets/images/sapojg3.png');
    this.load.image('vacio','public/assets/images/casillerovacio.png') //Vacio tuki
    this.load.image('tablero_bg','public/assets/images/tablero_bg.png');
    this.load.image('tablero_blur','public/assets/images/tablero_blur.png');
    this.load.image('ayuda_bg','public/assets/images/ayuda_bg.png');
    //Botones
    this.load.image('ayuda','public/assets/images/ayuda.png');
    this.load.image('play','public/assets/images/play.png');
    this.load.image('config','public/assets/images/configuracion.png');
    this.load.image('credit','public/assets/images/creditos.png');
    this.load.image('saltote','public/assets/images/saltote.png');
    this.load.image('dadoicon','public/assets/images/dado.png');
  }

  create() {
    // Se agrega img de fondo
    this.add.image(this.cameras.main.centerX,
    this.cameras.main.centerY,
       'carga_bg').setScale(0.5);
    this.add.text(this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY/1.5, 'Cargando...')
       .setOrigin(0.5)
       .setPadding(10)
       .setStyle({ 
           backgroundColor: '#0000', 
           fontSize: '60px', 
           fill: '#6c4600', 
           fontFamily: 'Arial'
       })
    // Se agrega un timer y luego a la escena del menú principal
    setTimeout(() => {
      this.scene.start("MainMenu");
    }, 3000);
  }
}
