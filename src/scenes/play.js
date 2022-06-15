import Button from "../js/button.js";
//Variables de la escena


// Clase Play, donde se crean todos los sprites, el escenario del juego y se inicializa y actualiza toda la logica del juego.
export class Play extends Phaser.Scene {
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("Play");
  }


  preload() {
   
  }

  create() {
    this.add.image(this.cameras.main.centerX,
      this.cameras.main.centerY,
           'tablero_bg').setScale(1.2);
    const botonfin = new Button(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 1.2,
      "Fin",
      this,
      () => {
        this.Dado(this.D4);

      });

    const botonop = new Button(
      this.cameras.main.centerX/8,
      this.cameras.main.centerY - this.cameras.main.centerY/1.2,
      "☸",
      this,
      () => {
        // Instrucción para pasar a la escena Salir
        this.scene.start("Opcion");
      });

      const botonay = new Button(
        this.cameras.main.centerX + this.cameras.main.centerX/1.2,
        this.cameras.main.centerY + this.cameras.main.centerY/1.2,
        "?",
        this,
        () => {
          // Instrucción para pasar a la escena Salir
          this.scene.start("Ayuda");
        });
        //Agregamos el sapo
        this.add.image(this.cameras.main.centerX/4,
          this.cameras.main.centerY*1.55,
               'PriSapo').setScale(0.3);
  }

  update() {
    
  }
    D4(){
      var randomNumber = Math.floor(Math.random()*4) + 1;
      return randomNumber;
    }
    Dado(DNum){
      var texto = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, DNum())
      .setStyle({ 
          fontSize: '50px', 
          fill: '#6c4600', 
          fontFamily: 'Century Gothic'
      });
      setTimeout(() => {
          var texto = texto.replace(DNum, '');
      }, 1500);
    }
}
