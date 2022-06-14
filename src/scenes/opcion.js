import Button from "../js/button.js";

// Clase Opcion, donde se cambia el idioma del juego
export class Opcion extends Phaser.Scene {
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("Opcion")
    }

    create() {
        // Boton para volver a la escena de Play
        const boton = new Button(this.cameras.main.centerX,
             this.cameras.main.centerY + this.cameras.main.centerY/3,
              'Ok', this, () => {
            // Instrucción volver a la escena Play
            this.scene.start("Play");
        }); 
    }
}