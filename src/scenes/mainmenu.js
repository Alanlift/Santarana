import Button from "../js/button.js";

// Clase MainMenu, donde se crean los botones, el logo y el fondo del menú principal
export class MainMenu extends Phaser.Scene {
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("MainMenu")
    }

    create() {
        // Boton para comenzar a personalizar
        const boton = new Button(this.cameras.main.centerX, this.cameras.main.centerY + this.cameras.main.centerY/3, 'Jugar', this, () => {
            // Instrucción para pasar a la escena Custom
            this.scene.start("Custom");
        });
        
    }
}