import Button from "../js/button.js";

// // Clase Custom, donde se personaliza a los personajes.
export class Custom extends Phaser.Scene {
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("Custom")
    }

    create() {
        // Boton para comenzar a jugar
        this.add.image(this.cameras.main.centerX,
            this.cameras.main.centerY,
                 'custom_bg').setScale(1);
        const boton = new Button(this.cameras.main.centerX + this.cameras.main.centerX/1.35,
            this.cameras.main.centerY - this.cameras.main.centerY/8, '►', this, () => {
            // Instrucción para pasar a la escena Play
            this.scene.start("Ayuda");
        });
        
    }
}