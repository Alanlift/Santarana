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
             'menu_bg').setScale(1);
        new Button(this.cameras.main.centerX - this.cameras.main.centerX/1.7, //Boton Config
             this.cameras.main.centerY + this.cameras.main.centerY/3, 'config', this,
              () => {
            // Instrucción para pasar a la escena Custom
            this.scene.switch("Creditos");
        });
        new Button(this.cameras.main.centerX/1.05, //Boton Play
             this.cameras.main.centerY + this.cameras.main.centerY/6, 'play', this, () => {
            // Instrucción para pasar a la escena Custom
            this.sound.stopAll();
            this.scene.start("Play");
        });
        new Button(this.cameras.main.centerX + this.cameras.main.centerX/1.7, //Boton Creditos
            this.cameras.main.centerY + this.cameras.main.centerY/3, 'credit', this, () => {
            // Instrucción para pasar a la escena Custom
            this.scene.switch("Creditos");
        });
    }
}