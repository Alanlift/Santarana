import Button from "../js/button.js";

var score;

// Clase Salir, donde se crean los botones, el logo y el fondo del menú derrota
export class Salir extends Phaser.Scene {
  constructor() {
    super("Salir");
  }


  create() {
    
    // Boton para volver a jugar
    const boton = new Button(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 3,
      "Salir",
      this,
      () => {
        // Instrucción para pasar a la escena main menu
        this.scene.start("MainMenu");
      }
    );
  }
}
