import Button from "../js/buttonfont.js";

// Clase Opcion, donde se cambia el idioma del juego
export class Opcion extends Phaser.Scene {
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("Opcion")
    }

    create() {
        let musica = this.sound.add('temamen',{loop: true})
        // Boton para volver a la escena de Play
        this.add.image(this.cameras.main.centerX,
            this.cameras.main.centerY,
               'tablero_blur').setScale(0.9);
        new Button(this.cameras.main.centerX*1.3, //Salir
             this.cameras.main.centerY + this.cameras.main.centerY/2.2,
              'Si', this, () => {
            // Instrucción volver a la escena Play
            this.sound.stopAll();
            this.scene.start("MainMenu");
            musica.play();
        }); 
        new Button(this.cameras.main.centerX/1.5, //Volver
             this.cameras.main.centerY + this.cameras.main.centerY/2.2,
              'No', this, () => {
            // Instrucción volver a la escena Play
            this.scene.switch("Play");
        }); 
    }
}