import Button from "../js/button.js";

// // Clase Custom, donde se personaliza a los personajes.
export class Creditos extends Phaser.Scene {
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("Creditos")
    }

    create() {
        // Boton para volver
        this.add.image(this.cameras.main.centerX,
            this.cameras.main.centerY,
                 'custom_bg').setScale(1);
        const boton = new Button(this.cameras.main.centerX - this.cameras.main.centerX/1.35,
            this.cameras.main.centerY + this.cameras.main.centerY/2.5, 'volver', this, () => {
            // Instrucción para pasar a la escena Play
            this.scene.switch("MainMenu");
        });
        let juan = this.sound.add('juan');
        new Button(this.cameras.main.centerX*0.35, //Juan
             this.cameras.main.centerY*0.7,
              'juanpp', this, () => {
            juan.play();
        }); 
        let alan = this.sound.add('alan');
        new Button(this.cameras.main.centerX*0.95, //Alan
             this.cameras.main.centerY*0.7,
             'alanpp', this, () => {
            alan.play();
        }); 
        let cabra = this.sound.add('cabra')
        new Button(this.cameras.main.centerX*1.55, //Cabra
             this.cameras.main.centerY*0.7,
             'cabrapp', this, () => {
            cabra.play();
        }); 
    }
}