import Button from "../js/button.js";

// Clase MainMenu, donde se crean los botones, el logo y el fondo del menú principal
export class MainMenu extends Phaser.Scene {
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("MainMenu")
    }

    create() {
        // Boton para comenzar a personalizar
        this.add.image(this.cameras.main.centerX,
        this.cameras.main.centerY,
             'menu_bg').setScale(1.4);
        const boton = new Button(this.cameras.main.centerX + this.cameras.main.centerX/1.35,
             this.cameras.main.centerY - this.cameras.main.centerY/10, '►', this, () => {
            // Instrucción para pasar a la escena Custom
            this.scene.start("Custom");
        });
        
    }
}