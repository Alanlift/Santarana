// Clase Boton, para no repetir tanto codigo
class Button {
    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ 
                backgroundColor: '#4a2f00', 
                fontSize: '50px', 
                fill: '#6c4600', 
                fontFamily: 'Century Gothic'
            })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#667a00' }))
            .on('pointerout', () => button.setStyle({ fill: '#6c4600' }));
    }
}

export default Button;