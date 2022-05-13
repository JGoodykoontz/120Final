class Menu extends Phaser.Scene {
    constructor() {
        super('menuscene');
    }

    create() {
        this.add.text(400, 300, 'Welcome to the Menu\nPress Space to start');

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('deskscene');
        }
    }
}