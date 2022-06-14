import Button from "../js/button.js";

// // Clase Custom, donde se personaliza a los personajes.
export class Custom extends Phaser.Scene {
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("Custom")
    }

    create() {
        // Boton para comenzar a jugar
        const boton = new Button(this.cameras.main.centerX + this.cameras.main.centerX/1.5,
        this.cameras.main.centerY,
              'Jugar', this, () => {
            // Instrucción para pasar a la escena Play
            this.scene.start("Play");
        });
        
    }
}