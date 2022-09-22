// Clase Preloads, para separar los preloads y tener mejor orden
import ButtonFont from "../js/buttonfont.js";
export class Preloads extends Phaser.Scene {
  // Se extiende de Phaser.Scene porque es una escena
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("Preloads");
  }

  preload() {
    //Sonidos
    this.load.audio('dado','public/assets/sounds/Dado.mp3');
    this.load.audio('saltotesonido','public/assets/sounds/saltotesonido.mp3');
    this.load.audio('sonidorana','public/assets/sounds/sonidorana.mp3');
    this.load.audio('tematab','public/assets/sounds/CancionTablero.mp3');
    this.load.audio('temamen','public/assets/sounds/CancionMenu.mp3');
    this.load.audio('victoria','public/assets/sounds/victoria.mp3');
    this.load.audio('alan','public/assets/sounds/alansonido.mp3');
    this.load.audio('cabra','public/assets/sounds/cabrasonido.mp3');
    this.load.audio('juan','public/assets/sounds/juansonido.mp3');
    //Fotos
    this.load.image('alanpp','public/assets/images/alanpp.png');
    this.load.image('juanpp','public/assets/images/juanpp.png');
    this.load.image('cabrapp','public/assets/images/cabrapp.png');
    //Backgrounds
    this.load.image('carga_bg','public/assets/images/carga_bg.png');
    this.load.image('menu_bg','public/assets/images/menu_bg.png');
    this.load.image('custom_bg','public/assets/images/custom_bg.png');
    this.load.image('tablero_bg','public/assets/images/tablero_bg.png');
    this.load.image('tablero_blur','public/assets/images/tablero_blur.png');
    this.load.image('ayuda_bg','public/assets/images/ayuda_bg.png');
    //Casilla y pjs
    this.load.image('sapo','public/assets/images/sapojg1.png');
    this.load.image('sapo2','public/assets/images/sapojg2.png');
    this.load.image('sapo3','public/assets/images/sapojg3.png');
    this.load.image('vacio','public/assets/images/casillerovacio.png') //Vacio tuki
    //Botones
    this.load.image('ayuda','public/assets/images/ayuda.png');
    this.load.image('play','public/assets/images/play.png');
    this.load.image('volver','public/assets/images/volver.png');
    this.load.image('config','public/assets/images/configuracion.png');
    this.load.image('credit','public/assets/images/creditos.png');
    this.load.image('saltote','public/assets/images/saltote.png');
    this.load.image('dadoicon','public/assets/images/dado.png');
    this.load.image('tuerca','public/assets/images/tuerca.png');
    //Cartas
    this.load.image('1','public/assets/images/cartas/Roja1.png')
    this.load.image('2','public/assets/images/cartas/Verde1.png')
    this.load.image('3','public/assets/images/cartas/Amarilla1.png')
    this.load.image('4','public/assets/images/cartas/Verde2.png')
  }

  create() {
    // Se agrega img de fondo
    let musica = this.sound.add('temamen',{loop: true})
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
      musica.play();
    }, 3000);
  }
}
