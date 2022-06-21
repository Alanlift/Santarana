import Button from "../js/button.js";
import ButtonFont from "../js/buttonfont.js";
//Variables de la escena
var player1;
var player2;
var player3;
var JTurno;
var proxcas;
var proxcasjg1;
var proxcasjg2;
var proxcasjg3;
//var accas = 0;
var CasRojas;
var CasVerdes;
var CasAmar;
var scorejg1;
var scorejg2;
var scorejg3;
var scoretext;
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

    var spawnPoint = tablero.findObject("Players", (obj) => obj.name === "sapo1");
    // The player1 and its settings
    player1 = this.physics.add.image(spawnPoint.x, spawnPoint.y, "sapo");
    spawnPoint = tablero.findObject("Players", (obj) => obj.name === "sapo2");
    player2 = this.physics.add.image(spawnPoint.x, spawnPoint.y, "sapo2");
    spawnPoint = tablero.findObject("Players", (obj) => obj.name === "sapo3");
    player3 = this.physics.add.image(spawnPoint.x, spawnPoint.y, "sapo3");
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    player3.setCollideWorldBounds(true);
    
    //Parte físicas de casillas
    CasRojas = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "CasRojas": {
          var Rojas = CasRojas.create(x, y, "vacio");
          Rojas.setBounceY(0);
          Rojas.set
          break;
        }
      }
    });

    CasVerdes = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "CasVerdes": {
          var Verde = CasVerdes.create(x, y, "vacio");
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
          var Amar = CasAmar.create(x, y, "vacio");
          Amar.setBounceY(0);
          break;
        }
      }
    });

    //Textou
    scorejg1 = 0;
    scorejg2 = 0;
    scorejg3 = 0;
    scoretext = this.add.text(this.cameras.main.centerX*1.80, this.cameras.main.centerY, "🦟: " + scorejg1, {
      fontSize: "32px",
      fill: "#fff",
      stroke: '#000',
      strokeThickness: 1,
    });

    //Agregamos collider con el tablero
    this.physics.add.collider(player1, worldLayer);
    this.physics.add.collider(player2, worldLayer);
    this.physics.add.collider(player3, worldLayer);
    this.physics.add.collider(CasRojas, worldLayer);
    this.physics.add.collider(CasVerdes, worldLayer);
    this.physics.add.collider(CasAmar, worldLayer);

    //Agregamos overlap las casillas
    this.physics.add.overlap(player1, CasRojas, this.roja, null, this);
    this.physics.add.overlap(player1, CasVerdes, this.verde, null, this);
    this.physics.add.overlap(player1, CasAmar, this.amarilla, null, this);
    this.physics.add.overlap(player2, CasRojas, this.roja, null, this);
    this.physics.add.overlap(player2, CasVerdes, this.verde, null, this);
    this.physics.add.overlap(player2, CasAmar, this.amarilla, null, this);
    this.physics.add.overlap(player3, CasRojas, this.roja, null, this);
    this.physics.add.overlap(player3, CasVerdes, this.verde, null, this);
    this.physics.add.overlap(player3, CasAmar, this.amarilla, null, this);
    


    JTurno = player1;
    proxcas = 0;
    proxcasjg1 = 0;
    proxcasjg2 = 0;
    proxcasjg3 = 3;
    const BotonDado = new ButtonFont( //Lanzar Dado
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 1.2,
      "Lanzar Dado",
      this,
      () => {
          XD = 1;
          sonid4.play();
          var randomNumber = Math.floor(Math.random()*4) + 1;
          this.Dado(randomNumber);
          if (JTurno === player1) {
            this.JugadorTurno("Jugador 1");
            proxcasjg1 += randomNumber;
            proxcas = proxcasjg1;
          } else if (JTurno === player2) {
            this.JugadorTurno("Jugador 2");
            proxcasjg2 += randomNumber;
            proxcas = proxcasjg2;
          } else {
            this.JugadorTurno("Jugador 3");
            proxcasjg3 += randomNumber;
            proxcas = proxcasjg3;
          }
          
          if (proxcas>=40) {
            var casPoint = tablero.findObject("Objetos", (obj) => obj.type === "40");
            //player1.setPosition(casPoint.x+1, casPoint.y+1);
            JTurno.setPosition(casPoint.x+1, casPoint.y+1)
            BotonDado.disable = true;
            if (JTurno === player1) {
              this.Dado("GANASTE "+ "Jugador 1");;
            } else if (JTurno === player2){
              this.Dado("GANASTE "+ "Jugador 2");
            } else {
              this.Dado("GANASTE "+ "Jugador 3")
            }
            this.Dado2("40");
            gameOver = true;
          } else {
            this.Dado2("⠀⠀")
            this.Dado2(proxcas);
            var casPoint = tablero.findObject("Objetos", (obj) => obj.type == (proxcas));
            //player1.setPosition(casPoint.x+1, casPoint.y+1);
            JTurno.setPosition(casPoint.x+1, casPoint.y+1)
            this.turno();
          }
      });

    new ButtonFont( //Opciones
      this.cameras.main.centerX/8,
      this.cameras.main.centerY - this.cameras.main.centerY/1.2,
      "Salir",
      this,
      () => {
        // Instrucción para pasar a la escena opcion
        this.scene.switch("Opcion");
      });

    new Button( //Ayuda
      this.cameras.main.centerX + this.cameras.main.centerX/1.2,
      this.cameras.main.centerY + this.cameras.main.centerY/1.2,
       "?",
      this,
      () => {
        // Instrucción para pasar a la escena ayuda
        this.scene.switch("Ayuda"), { scorejg1: scorejg1 };
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
        if (JTurno === player1) {
          scorejg1 += 10;
          scoretext.setText("🦟: " + scorejg1);
          XD +=1;
        } else if (JTurno === player2) {
          scorejg2 += 10;
          scoretext.setText("🦟: " + scorejg2);
          XD +=1;
        } else if (JTurno === player3){
          scorejg3 += 10;
          scoretext.setText("🦟: " + scorejg3);
          XD +=1;
        }
      }
    }

    verde(){
      if (XD == 1) {
        if (JTurno === player1) {
          scorejg1 += 5;
          scoretext.setText("🦟: " + scorejg1);
          XD +=1;
        } else if (JTurno === player2) {
          scorejg2 += 5;
          scoretext.setText("🦟: " + scorejg2);
          XD +=1;
        } else if (JTurno === player3){
          scorejg3 += 5;
          scoretext.setText("🦟: " + scorejg3);
          XD +=1;
        }
      }
    }

    amarilla(){
      if (XD == 1) {
        if (JTurno === player1) {
          scorejg1 -= 10;
          scoretext.setText("🦟: " + scorejg1);
          XD +=1;
        } else if (JTurno === player2) {
          scorejg2 -= 10;
          scoretext.setText("🦟: " + scorejg2);
          XD +=1;
        } else if (JTurno === player3){
          scorejg3 -= 10;
          scoretext.setText("🦟: " + scorejg3);
          XD +=1;
        }
      }
    }

    turno(){
      if (JTurno === player1) {
        JTurno = player2;
      } else if (JTurno === player2) {
        JTurno = player3;
      } else if (JTurno === player3){
        JTurno = player1;
      }
    }

    D4(){
      var randomNumber = Math.floor(Math.random()*4) + 1;
      return randomNumber;
    }

    //Textos
    JugadorTurno(Turno){
      this.add.text(this.cameras.main.centerX/1.10, this.cameras.main.centerY-this.cameras.main.centerY/1.01, "Turno:" +"\n" + Turno)
      .setStyle({ 
          backgroundColor: '#4a2f00', fontSize: '30px', 
          fill: '#6c4600', 
          fontFamily: 'Century Gothic'
      });
    }

    Dado(DNum){
      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, DNum)
      .setStyle({ 
          backgroundColor: '#4a2f00', fontSize: '50px', 
          fill: '#6c4600', 
          fontFamily: 'Century Gothic'
      });
    }

    Dado2(DNum){
      this.add.text(this.cameras.main.centerX/10, this.cameras.main.centerY, DNum)
      .setStyle({ 
          backgroundColor: '#4a2f00', fontSize: '50px', 
          fill: '#6c4600', 
          fontFamily: 'Century Gothic'
      });
    }
}
