// Clase Boton, para no repetir tanto codigo
class Button {
    constructor(x, y, img, scene, callback) {
            scene.add.image(x, y, img)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
        }
    }

export default Button;