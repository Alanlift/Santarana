import Button from "../js/button.js";

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
      this.cameras.main.centerY + this.cameras.main.centerY / 3,
      "Fin",
      this,
      () => {
        // Instrucción para pasar a la escena Salir
        this.scene.start("Salir");
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
  }

  update() {

  }
}
