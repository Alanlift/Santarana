// Clase Boton, para no repetir tanto codigo
class ButtonFont {
    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ 
                backgroundColor: '#71af45', 
                fontSize: '50px', 
                fill: '#000000', 
                fontFamily: 'Arial'
            })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#667a00' }))
            .on('pointerout', () => button.setStyle({ fill: '#000000' }));
    }
}

export default ButtonFont;