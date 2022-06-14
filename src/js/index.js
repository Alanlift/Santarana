import { Preloads } from "../scenes/preloads.js";
import { MainMenu } from "../scenes/mainmenu.js";
import { Custom } from "../scenes/custom.js";
import { Play } from "../scenes/play.js";
import { Ayuda } from "../scenes/ayuda.js";
import { Opcion } from "../scenes/opcion.js";
import { Salir } from "../scenes/salir.js";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 350 },
      debug: true,
    },
  },
  scene: [Preloads, MainMenu, Custom, Play, Opcion, Ayuda, Salir], // Listado de todas las escenas del juego, en orden
  // La primera escena es con la cual empieza el juego
};

var game = new Phaser.Game(config);
