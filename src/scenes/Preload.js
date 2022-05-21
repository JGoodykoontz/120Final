class Preload extends Phaser.Scene {
    constructor() {
        super("preload")
    }

    preload() {
        this.load.path = './assets/';

        // Json Data
        this.load.json("journalData", 'journal.json');

        // Background
        this.load.image("background", 'Background.png');
        this.load.image("clouds", 'clouds.png');

        // Cutscene
        this.load.image("CS1Part1", 'Artboard-1.png');
        this.load.image("CS1Part2", 'Artboard-2.png');
        this.load.image("CS1Part3", 'Artboard-3.png');
        
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