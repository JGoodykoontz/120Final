class Desk extends Phaser.Scene {
    constructor() {
        super("desk");
    }

    preload() {
        this.load.image("desk_Bg", './assets/desk.png');
    }
    
    create() {
        this.bg = this.add.tileSprite(0, 0, 1000, 600, 'desk_Bg').setOrigin(0, 0);
    }
}