import Button from "../js/button.js";
//Variables de la escena
var player;
var proxcas = 1;
var accas = 1;

// Clase Play, donde se crean todos los sprites, el escenario del juego y se inicializa y actualiza toda la logica del juego.
export class Play extends Phaser.Scene {
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("Play");
  }


  preload() {
      this.load.tilemapTiledJSON("tablero", "public/assets/tilemaps/tablero.json");
      this.load.image("tilesBelow", "public/assets/images/tablero_bg.png");
      this.load.image("tilesPlatform", "public/assets/images/platformas.png");
  }

  create() {
    const tablero = this.make.tilemap({ key: "tablero"});

    const tilesetBelow = tablero.addTilesetImage(
      "tablero_bg",
      "tilesBelow"
    );
    const tilesetPlatform = tablero.addTilesetImage(
      "plataformas",
      "tilesPlatform"
    );

    const belowLayer = tablero.createLayer("Fondo", tilesetBelow, 0, 0);
    const worldLayer = tablero.createLayer("CasillaRoja", tilesetPlatform, 0, 0);
    const objectsLayer = tablero.getObjectLayer("Objetos");

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = tablero.findObject("Objetos", (obj) => obj.name === "sapo");
    // The player and its settings
    player = this.physics.add.image(spawnPoint.x, spawnPoint.y, "sapo");

    //player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, worldLayer);
    this.physics.add.overlap(player, worldLayer, this.roja, null, this);


    const botonfin = new Button(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 1.2,
      "Lanzar Dado",
      this,
      () => {
        var randomNumber = Math.floor(Math.random()*4) + 1;
        this.Dado(randomNumber);
        proxcas += randomNumber;
        this.Dado2(proxcas);
        if (proxcas<10) {
          player.setVelocityX(this.cameras.main.centerX/2.8);
          setTimeout(() => {
            player.setVelocityX(0);
          }, randomNumber*500);
        } else if (accas<=9 && proxcas>9) { //CASILLAS 9
          player.setVelocityX(this.cameras.main.centerX/2.8);
          setTimeout(() => {
            player.setVelocityX(0);
          }, (9-accas)*(500)+1);
          setTimeout(() => {
          }, 500);
          player.setVelocityY(-(this.cameras.main.centerX/3.2));
          setTimeout(() => {
            player.setVelocityY(0);
          }, (proxcas-9)*(500)+1);
        } else if(accas<=14 && proxcas>14) { //CASILLAS 14
          player.setVelocityY(-(this.cameras.main.centerX/3.2));
          setTimeout(() => {
            player.setVelocityY(0);
          }, (14-accas)*(500)+1);
          setTimeout(() => {
          }, 500);
          player.setVelocityX(-this.cameras.main.centerX/2.8);
          setTimeout(() => {
            player.setVelocityX(0);
          }, (proxcas-14)*(500)+1);
        }
        else if (proxcas>10 && proxcas<15) {
          player.setVelocityY(-(this.cameras.main.centerX/3.2));
          setTimeout(() => {
            player.setVelocityY(0);
          }, randomNumber*500);
        } else {
          player.setVelocityX(-this.cameras.main.centerX/2.8);
          setTimeout(() => {
            player.setVelocityX(0);
          }, randomNumber*500);
        }
        accas = proxcas;
      });

    const botonop = new Button(
      this.cameras.main.centerX/8,
      this.cameras.main.centerY - this.cameras.main.centerY/1.2,
      "☸",
      this,
      () => {
        // Instrucción para pasar a la escena opcion
        //this.scene.start("Opcion");
        proxcas = 1;
        accas = 1;
      });

      const botonay = new Button(
        this.cameras.main.centerX + this.cameras.main.centerX/1.2,
        this.cameras.main.centerY + this.cameras.main.centerY/1.2,
        "?",
        this,
        () => {
          // Instrucción para pasar a la escena ayuda
          this.scene.start("Ayuda");
        });
  }

  update() {
    
  }
    roja(){
      player.setBounce(0)
    }
    D4(){
      var randomNumber = Math.floor(Math.random()*4) + 1;
      return randomNumber;
    }
    Dado(DNum){
      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, DNum)
      .setStyle({ 
          backgroundColor: '#4a2f00', fontSize: '50px', 
          fill: '#6c4600', 
          fontFamily: 'Century Gothic'
      });
      return DNum;
    }
    Dado2(DNum){
      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY-this.cameras.main.centerY/1.10, DNum)
      .setStyle({ 
          backgroundColor: '#4a2f00', fontSize: '50px', 
          fill: '#6c4600', 
          fontFamily: 'Century Gothic'
      });
      return DNum;
    }
}
