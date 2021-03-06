import Button from "../js/button.js";
import ButtonFont from "../js/buttonfont.js";
//Variables de la escena
var player1;
var player2;
var player3;
var JTurno; //Para que funcione el movimiento
var CTurno; //Para que funcione el score
var proxcas;
var proxcasjg1;
var proxcasjg2;
var proxcasjg3;
var CasRojas;
var CasVerdes;
var CasAmar;
//Scores
var scorejg1;
var scorejg2;
var scorejg3;
var scoretext;
var scoreac;
var XD;
var sonid4; //Sonido dado d4
var saltotesonido; //Sonido saltote
var sonidorana;
var victoria;
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
    var Players = [player1, player2, player3];
    
    
    //Parte f??sicas de casillas
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

    
    //Agregamos collider con el tablero
    this.physics.add.collider(Players, worldLayer);
    this.physics.add.collider(CasRojas, worldLayer);
    this.physics.add.collider(CasVerdes, worldLayer);
    this.physics.add.collider(CasAmar, worldLayer);

    //Agregamos overlap las casillas
    this.physics.add.overlap(Players, CasRojas, this.roja, null, this);
    this.physics.add.overlap(Players, CasVerdes, this.verde, null, this);
    this.physics.add.overlap(Players, CasAmar, this.amarilla, null, this);
    

    JTurno = 0;
    CTurno = 'Jugador 1';
    proxcas = 0;
    proxcasjg1 = 0;
    proxcasjg2 = 0;
    proxcasjg3 = 0;
    this.JugadorTurno("Jugador 1");

    spawnPoint = tablero.findObject("Botones", (obj) => obj.name == ('Dado'));
    const BotonDado = new Button( //Lanzar Dado
      spawnPoint.x,
      spawnPoint.y,
      "dadoicon",
      this,
      () => {
          sonid4.play();
          sonidorana.play();
          var randomNumber = Math.floor(Math.random()*4) + 1;
          this.Dado(randomNumber);
          if (JTurno == '0') {
            this.JugadorTurno("Jugador 2");
            proxcasjg1 += randomNumber;
            proxcas = proxcasjg1;
          } else if (JTurno == '1') {
            this.JugadorTurno("Jugador 3");
            proxcasjg2 += randomNumber;
            proxcas = proxcasjg2;
          } else {
            this.JugadorTurno("Jugador 1");
            proxcasjg3 += randomNumber;
            proxcas = proxcasjg3;
          }
          
          if (proxcas>=40) {
            var casPoint = tablero.findObject("Objetos", (obj) => obj.type === "40");
            Players[JTurno].setPosition(casPoint.x+1, casPoint.y+1)
            BotonDado.inputEnabled = false;
            BotonSalto.inputEnabled = false;
            victoria = this.sound.add('victoria');
            victoria.play();
            if (JTurno == '0') {
              this.Ganador("GANASTE "+ "Jugador 1");
                this.JugadorTurno("Jugador 1");
              } else if (JTurno == '1'){
                this.Ganador("GANASTE "+ "Jugador 2");
                this.JugadorTurno("Jugador 2");
              } else {
                this.Ganador("GANASTE "+ "Jugador 3")
                this.JugadorTurno("Jugador 3");
              }
            gameOver = true;
          } else {
            XD = 1;
            var casPoint = tablero.findObject("Objetos", (obj) => obj.type == (proxcas));
            Players[JTurno].setPosition(casPoint.x+1, casPoint.y+1)
          }
      });
      
      spawnPoint = tablero.findObject("Botones", (obj) => obj.name == ('Saltote'));
      const BotonSalto = new Button( //Lanzar saltote
      spawnPoint.x,
      spawnPoint.y,
      'saltote',
      this,
      () => {
        if (JTurno == '0') {
          proxcas = proxcasjg1;
        } else if (JTurno == '1') {
          proxcas = proxcasjg2;
        } else {
          proxcas = proxcasjg3;
        }
          if (scoreac>=20 && proxcas+8<40)
          {
            BotonSalto.inputEnabled = true;
            saltotesonido.play();
              if (JTurno == '0') {
              this.JugadorTurno("Jugador 2");
              proxcasjg1 += 8;
              proxcas = proxcasjg1;
              scorejg1-=20;
            } else if (JTurno == '1') {
              this.JugadorTurno("Jugador 3");
              proxcasjg2 += 8;
              proxcas = proxcasjg2;
              scorejg2-=20;
            } else {
              this.JugadorTurno("Jugador 1");
              proxcasjg3 += 8;
              proxcas = proxcasjg3;
              scorejg3-=20;
            }
            XD = 1;
            var casPoint = tablero.findObject("Objetos", (obj) => obj.type == (proxcas));
            Players[JTurno].setPosition(casPoint.x+1, casPoint.y+1)
            this.turno();
        } else {
          BotonSalto.inputEnabled = false;
        } 
        });

      scorejg1 = 0;
      scorejg2 = 0;
      scorejg3 = 0;
      scoreac = 0;
      spawnPoint = tablero.findObject("Botones", (obj) => obj.name == ('Score'));
      scoretext = this.add.text(spawnPoint.x, spawnPoint.y, "Moscas:"+"\n"+ "???? ", { //Texto Score
        fontSize: "32px",
        fill: "#000000",
        backgroundColor: '#71af45',
        fontFamily: 'Arial'
      });
      
      spawnPoint = tablero.findObject("Botones", (obj) => obj.name == ('Lanzar'));
      this.add.text(spawnPoint.x, spawnPoint.y, "LANZAR", { //Texto Lanzar
        fontSize: "32px",
        fill: "#000000",
        backgroundColor: '#71af45',
        fontFamily: 'Arial'
      });



    new Button( //Opciones
      this.cameras.main.centerX/8,
      this.cameras.main.centerY - this.cameras.main.centerY/1.2,
      "tuerca",
      this,
      () => {
        // Instrucci??n para pasar a la escena opcion
        this.scene.switch("Opcion");
      });
     
    spawnPoint = tablero.findObject("Botones", (obj) => obj.name == ('Ayuda'));
    new Button( //Ayuda
    spawnPoint.x, spawnPoint.y,
       "ayuda",
      this,
      () => {
        // Instrucci??n para pasar a la escena ayuda
        this.scene.switch("Ayuda");
      });

      sonid4 = this.sound.add('dado');
      saltotesonido = this.sound.add('saltotesonido');
      sonidorana = this.sound.add('sonidorana');
      let musica = this.sound.add('tematab',{loop: true})
      musica.play();
      gameOver = false;
  }

  update() {
    if (gameOver) {
      setTimeout(() => {
        return;
      }, 3000);
    }
  }
    //Funciones
    roja(){
      if (XD == 1) {
        if (CTurno == 'Jugador 1') {
          scorejg1 += 10;
          scoreac = scorejg2;
          XD +=1;
        } else if (CTurno == 'Jugador 2') {
          scorejg2 += 10;
          scoreac = scorejg3;
          XD +=1;
        } else if (CTurno == 'Jugador 3'){
          scorejg3 += 10;
          scoreac = scorejg1;
          XD +=1;
        }
        this.turno();
        scoretext.setText("Moscas:"+"\n"+"???? " + scoreac);
      }
    }

    verde(){
      if (XD == 1) {
        scoretext.setText("??????????????????"+ "\n" + "??????????????????");
        if (CTurno == 'Jugador 1') {
          scorejg1 += 5;
          scoreac = scorejg2;
          XD +=1;
        } else if (CTurno == 'Jugador 2') {
          scorejg2 += 5;
          scoreac = scorejg3;
          XD +=1;
        } else if (CTurno == 'Jugador 3'){
          scorejg3 += 5;
          scoreac = scorejg1;
          XD +=1;
        }
        this.turno();
        scoretext.setText("Moscas:"+"\n"+"???? " + scoreac);
      }
    }

    amarilla(){
      if (XD == 1) {
        scoretext.setText("??????????????????"+ "\n" + "??????????????????");
        if (CTurno == 'Jugador 1') {
          scorejg1 -= 10;
          scoreac = scorejg2;
          XD +=1;
        } else if (CTurno == 'Jugador 2') {
          scorejg2 -= 10;
          scoreac = scorejg3;
          XD +=1;
        } else if (CTurno == 'Jugador 3'){
          scorejg3 -= 10;
          scoreac = scorejg1;
          XD +=1;
        }
        this.turno();
        scoretext.setText("Moscas:"+"\n"+"???? " + scoreac);
      }
    }

    turno(){
      if (JTurno == '0') {
        JTurno = '1';
        CTurno = 'Jugador 2';
      } else if (JTurno == '1') {
        JTurno = '2';
        CTurno = 'Jugador 3';
      } else if (JTurno == '2'){
        JTurno = '0';
        CTurno = 'Jugador 1';
      }
    }

    //Textos
    JugadorTurno(Turno){
      this.add.text(this.cameras.main.centerX/1.10, this.cameras.main.centerY-this.cameras.main.centerY/1.01, "Turno:" +"\n" + Turno)
      .setStyle({ 
          backgroundColor: '#71af45', fontSize: '35px', 
          fill: '#000000', 
          fontFamily: 'Arial'
      });
      if (Turno == 'Jugador 1') {
        this.add.image(this.cameras.main.centerX*1.10, this.cameras.main.centerY-this.cameras.main.centerY/1.08, "sapo").setScale(0.5);
      } else if (Turno == 'Jugador 2') {
        this.add.image(this.cameras.main.centerX*1.10, this.cameras.main.centerY-this.cameras.main.centerY/1.08, "sapo2").setScale(0.5);
      } else if (Turno == 'Jugador 3'){
        this.add.image(this.cameras.main.centerX*1.10, this.cameras.main.centerY-this.cameras.main.centerY/1.08, "sapo3").setScale(0.5);
      }
      
    }

    Dado(DNum){
      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, DNum)
      .setStyle({ 
          backgroundColor: '#71af45', fontSize: '50px', 
          fill: '#000000', 
          fontFamily: 'Arial'
      });
    }
    Ganador(Jugador){
      this.add.text(this.cameras.main.centerX*0.5, this.cameras.main.centerY, Jugador.toUpperCase())
      .setStyle({ 
          backgroundColor: '#71af45', fontSize: '60px', 
          fill: '#000000', 
          fontFamily: 'Arial'
      });
    }
}
