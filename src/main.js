let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    pixelArt: true,
    zoom: 1,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Desk],
}

let game = new Phaser.Game(config);
