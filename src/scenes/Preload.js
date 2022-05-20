class Preload extends Phaser.Scene {
    constructor() {
        super("preload")
    }

    preload() {
        this.load.path = './assets/';

        // Json Data
        this.load.json("journalData", 'journal.json');

        // Background/Cutscene
        this.load.image("background", 'Background.png');
        this.load.image("clouds", 'clouds.png');
        
        // Interactive
        this.load.image("lamp", 'oilLamp.png');
        this.load.image("helpNote", 'helpNote.png');
        this.load.image("journal", 'book-closed.png');
        this.load.image("journalOpen", 'book-open.png');

        // Buttons
        this.load.image("playButton", 'playButton.png');
        this.load.image("menuButton", 'menuButton.png');
        this.load.image("close", 'closeButton.png');
        this.load.image('right', 'pageRight.png');
        this.load.image('left', 'pageLeft.png');
        
        // Sounds
        this.load.audio("openTemp", 'Sounds/open.wav');
    }
    update() {
        this.scene.start('menuscene');
    }
}