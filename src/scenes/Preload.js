class Preload extends Phaser.Scene {
    constructor() {
        super("preload")
    }

    preload() {
        // this.load.image("desk_Bg", './assets/desk.png');
        this.load.image("background", './assets/Background.png');
        this.load.image("clouds", './assets/clouds.png');
        this.load.image("lamp", './assets/oilLamp.png');
        this.load.image("playButton", './assets/playButton.png');
        this.load.image("menuButton", './assets/menuButton.png');
        this.load.image("helpNote", './assets/helpNote.png');

        // Journal
        this.load.image("journal", './assets/book-closed.png');
        this.load.image("journalOpen", './assets/book-open.png');
        this.load.image("close", './assets/closeButton.png');
        this.load.image('right', './assets/pageRight.png');
        this.load.image('left', './assets/pageLeft.png');

        this.load.audio("openTemp", './assets/open.wav');

        this.load.json("journalData", './assets/journal.json');
    }
    update() {
        this.scene.start('menuscene');
    }
}