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
        this.load.image("logo", 'calloftheDeep.png');

        // Cutscene
        this.load.image("CS1Part1", 'Artboard-1.png');
        this.load.image("CS1Part2", 'Artboard-2.png');
        this.load.image("CS1Part3", 'Artboard-3.png');
        this.load.image("CS2Part1", 'Artboard 4.png');
        this.load.image("CS2Part2", 'Artboard 5.png');
        this.load.image("CS2Part3", 'Artboard 6.png');
        
        // Interactive
        this.load.image("lamp", 'oilLamp.png');
        this.load.image("helpNote", 'helpNote.png');
        this.load.image("journal", 'book-closed.png');
        this.load.image("journalOpen", 'book-open.png');
        this.load.image("notepad", 'notepad-closed.png');
        this.load.image("notepadOpen", 'notepad-open.png');

        // Buttons
        this.load.image("playButton", 'button.png');
        this.load.image("close", 'closeButton.png');
        this.load.image('right', 'pageRight.png');
        this.load.image('left', 'pageLeft.png');

        // Puzzle
        // this.load.image("drop", 'dropZone.png');
        this.load.image("dropD", 'dropZone.png');
        this.load.image("dropR", 'dropZone.png');
        this.load.image("dropE", 'dropZone.png');
        this.load.image("dropA", 'dropZone.png');
        this.load.image("dropM", 'dropZone.png');
        this.load.image("dropK", 'dropZone.png');
        this.load.image("dropY", 'dropZone.png');
        this.load.image("markD", 'markerD.png');
        this.load.image("markR", 'markerR.png');
        this.load.image("markE", 'markerE.png');
        this.load.image("markA", 'markerA.png');
        this.load.image("markM", 'markerM.png');
        this.load.image("markK", 'markerK.png');
        this.load.image("markY", 'markerY.png');

        // Sounds
        this.load.audio("openTemp", 'Sounds/open.wav');
        this.load.audio("lampSfx", 'Sounds/Lamp_Click.wav');
    }
    update() {
        this.scene.start('menuscene');
    }
}