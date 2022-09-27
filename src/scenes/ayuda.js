import Button from "../js/button.js";
// Clase Ayuda, donde se cambia el idioma del juego
export class Ayuda extends Phaser.Scene {
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("Ayuda")
    }
    preload(){
        this.load.tilemapTiledJSON("tablero", "public/assets/tilemaps/tablero.json");
    }
    create() {
        // Boton para volver a la escena de Play
        const tablero = this.make.tilemap({ key: "tablero"});
        let spawnPoint = tablero.findObject("Botones", (obj) => obj.name == ('Ayuda'));
    
        this.add.image(this.cameras.main.centerX,
            this.cameras.main.centerY,
                 'ayuda_bg').setScale(1.2);
        const boton = new Button(spawnPoint.x, spawnPoint.y,
              'ayuda', this, () => {
            // Instrucción volver a la escena Play
            this.scene.switch("Play");
        }); 
    }
}