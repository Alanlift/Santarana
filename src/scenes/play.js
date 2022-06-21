import Button from "../js/button.js";
//Variables de la escena
var player;
var proxcas = 0;
var accas = 0;
var CasRojas;
var CasVerdes;
var CasAmar;
var score = 0;
var scoreText;
var XD;
var sonid4;
var gameOver;

// Clase Play, donde se crean todos los sprites, el escenario del juego y se inicializa y actualiza toda la logica del juego.
export class Play extends Phaser.Scene {
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("Play");
  }


  preload() {
      this.load.tilemapTiledJSON("tablero", "public/assets/tilemaps/tablero.json");
      this.load.image("tilesBelow", "public/assets/images/tablero_bg.png");
      //this.load.image("tilesPlatform", "public/assets/images/platformas.png");
  }

  create() {
    const tablero = this.make.tilemap({ key: "tablero"}); 
    const tilesetBelow = tablero.addTilesetImage(
      "tablero_bg",
      "tilesBelow"
    );
    //const tilesetPlatform = tablero.addTilesetImage(
      //"plataformas",
      //"tilesPlatform"
    //);

    const worldLayer = tablero.createLayer("Fondo", tilesetBelow, 0, 0);
    //const worldLayer = tablero.createLayer("CasillaRoja", tilesetPlatform, 0, 0);
    const objectsLayer = tablero.getObjectLayer("Objetos");

    //worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = tablero.findObject("Objetos", (obj) => obj.name === "sapo");
    // The player and its settings
    player = this.physics.add.image(spawnPoint.x, spawnPoint.y, "sapo");

    player.setCollideWorldBounds(true);
    
    //Parte físicas de casillas
    CasRojas = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "CasRojas": {
          var Rojas = CasRojas.create(x, y, "rojas");
          Rojas.setBounceY(0);
          break;
        }
      }
    });

    CasVerdes = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "CasVerdes": {
          var Verde = CasVerdes.create(x, y, "verdes");
          Verde.setBounceY(0);
          break;
        }
      }
    });

    CasAmar = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "CasAmar": {
          var Amar = CasAmar.create(x, y, "amarillas");
          Amar.setBounceY(0);
          break;
        }
      }
    });

    //Textou
    scoreText = this.add.text(30, 6, "Moscas: " + score, {
      fontSize: "32px",
      fill: "#000",
    });

    //Agregamos collider con el tablero
    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(CasRojas, worldLayer);
    this.physics.add.collider(CasVerdes, worldLayer);
    this.physics.add.collider(CasAmar, worldLayer);

    //Agregamos overlap las casillas
    this.physics.add.overlap(player, CasRojas, this.roja, null, this);
    this.physics.add.overlap(player, CasVerdes, this.verde, null, this);
    this.physics.add.overlap(player, CasAmar, this.amarilla, null, this);
    


    
    new Button( //Lanzar Dado
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 1.2,
      "Lanzar Dado",
      this,
      () => {
          XD = 1;
          sonid4.play();
          var randomNumber = Math.floor(Math.random()*4) + 1;
          this.Dado(randomNumber);
          proxcas += randomNumber;
          
          if (proxcas>=40) {
            var casPoint = tablero.findObject("Objetos", (obj) => obj.type === "40");
            player.setPosition(casPoint.x+1, casPoint.y+1);
            this.Dado("GANASTE PAPU!");
            this.Dado2("40");
            gameOver = true;
          } else {
            this.Dado2(proxcas);
            var casPoint = tablero.findObject("Objetos", (obj) => obj.type == (proxcas));
            player.setPosition(casPoint.x+1, casPoint.y+1);
          }
          accas = proxcas;
      });

    new Button( //Opciones
      this.cameras.main.centerX/8,
      this.cameras.main.centerY - this.cameras.main.centerY/1.2,
      "☸",
      this,
      () => {
        // Instrucción para pasar a la escena opcion
        //this.scene.start("Opcion");
        proxcas = 0;
        accas = 0;
      });

    new Button( //Ayuda
      this.cameras.main.centerX + this.cameras.main.centerX/1.2,
      this.cameras.main.centerY + this.cameras.main.centerY/1.2,
       "?",
      this,
      () => {
        // Instrucción para pasar a la escena ayuda
        this.scene.switch("Ayuda"), { score: score };
      });

      sonid4 = this.sound.add('dado');
      gameOver = false;
  }

  update() {
    if (gameOver) {
      this.sound.stopAll();
      return;
    }
  }
    //Funciones
    roja(){
      if (XD == 1) {
        score += 10;
        scoreText.setText("Moscas: " + score);
        XD +=1;
      }
    }

    verde(){
      if (XD == 1) {
        score += 5;
        scoreText.setText("Moscas: " + score);
        XD +=1;
      }
    }

    amarilla(){
      if (XD == 1) {
        score -= 5;
        scoreText.setText("Moscas: " + score);
        XD +=1;
      }
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
      //return DNum;
    }
    Dado2(DNum){
      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY-this.cameras.main.centerY/1.10, DNum)
      .setStyle({ 
          backgroundColor: '#4a2f00', fontSize: '50px', 
          fill: '#6c4600', 
          fontFamily: 'Century Gothic'
      });
      //return DNum;
    }
}
