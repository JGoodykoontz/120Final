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
        this.load.image("CS3Part2", 'cinematic4.png');
        this.load.image("EndPart1", 'End12-1.png');
        this.load.image("EndControl1", 'End1-2.png');
        this.load.image("EndControl2", 'End1-3.png');
        this.load.image("EndFree1", 'End1-3.png');
        this.load.image("EndFree2", 'End2-2.png');
        
        // Interactive
        this.load.image("lamp", 'oilLamp.png');
        this.load.image("helpNote", 'helpButton.png');
        this.load.image("journal", 'book-closed.png');
        this.load.image("journalOpen", 'book-open.png');
        this.load.image("notepad", 'notepad-closed.png');
        this.load.image("notepadOpen", 'notepad-open.png');

        // Buttons
        this.load.image("playButton", 'button.png');
        this.load.image("close", 'closeButton.png');
        this.load.image('right', 'pageRight.png');
        this.load.image('left', 'pageLeft.png');
        this.load.image("pauseButton", 'pauseButton.png');

        // Puzzle
        // this.load.image("drop", 'dropZone.png');
        this.load.image("dropD", 'dropZone.png');
        this.load.image("dropR", 'dropZone.png');
        this.load.image("dropE", 'dropZone.png');
        this.load.image("dropA", 'dropZone.png');
        this.load.image("dropM", 'dropZone.png');
        this.load.image("dropK", 'dropZone.png');
        this.load.image("dropY", 'dropZone.png');
        this.load.image("dropI", 'dropZone.png');
        this.load.image("dropN", 'dropZone.png');
        this.load.image("dropG", 'dropZone.png');
        this.load.image("dropT", 'dropZone.png');
        this.load.image("dropW", 'dropZone.png');
        this.load.image("dropC", 'dropZone.png');
        this.load.image("dropO", 'dropZone.png');
        this.load.image("dropL", 'dropZone.png');
        this.load.image("dropF", 'dropZone.png');

        this.load.image("markD", 'markerD.png');
        this.load.image("markR", 'markerR.png');
        this.load.image("markE", 'markerE.png');
        this.load.image("markA", 'markerA.png');
        this.load.image("markM", 'markerM.png');
        this.load.image("markK", 'markerK.png');
        this.load.image("markY", 'markerY.png');
        this.load.image("markI", 'markerI.png');
        this.load.image("markN", 'markerN.png');
        this.load.image("markG", 'markerG.png');
        this.load.image("markT", 'markerT.png');
        // this.load.image("markW", 'markerW.png');
        this.load.image("markC", 'markerC.png');
        this.load.image("markO", 'markerO.png');
        this.load.image("markL", 'markerL.png');
        this.load.image("markF", 'markerF.png');

        // Sounds
        this.load.audio("openSfx", 'Sounds/Open.wav');
        this.load.audio("lampSfx", 'Sounds/Lamp_Click.wav');
        this.load.audio("closeSfx", 'Sounds/Close.wav');
        this.load.audio("turnSfx", 'Sounds/Page Flip.wav');
        this.load.audio("tapSfx", 'Sounds/Tapping.wav');
        this.load.audio("writeSfx", 'Sounds/writeSfx.wav');
        this.load.audio("whisper1Sfx", 'Sounds/Whispers Quiet.wav');
        this.load.audio("whisper2Sfx", 'Sounds/Whispers Loud.wav');
    }
    update() {
        this.scene.start('menuscene');
    }
}