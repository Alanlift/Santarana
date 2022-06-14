import Button from "../js/button.js";

// Clase Ayuda, donde se cambia el idioma del juego
export class Ayuda extends Phaser.Scene {
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("Ayuda")
    }

    create() {
        // Boton para volver a la escena de Play
        const boton = new Button(this.cameras.main.centerX + this.cameras.main.centerX/1.5,
        this.cameras.main.centerY + this.cameras.main.centerY/1.5,
              '?', this, () => {
            // Instrucción volver a la escena Play
            this.scene.start("Play");
        }); 
    }
}