let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Preload, Menu, CutsceneOne, Desk],
}

let game = new Phaser.Game(config);

// desk variables
let lightOn = true;
let initial = true;
let whichPuzzle;
let content1;
let content2;
let topCounter = 0; // counter for moving stuff to top of scene

// cutscene variables
let counter = 1;
let complete = false;

// allocating keys
// let keySPACE;
let keyESC;

let journalConfig = {
    // fontFamily: 'Bahnschrift Light',
    // fontFamily: 'Century Gothic',
    fontFamily: 'Blackadder ITC',
    // fontFamily: 'Brush Script MT',
    fontSize: '44px',
    color: '#6D2817',
    align: 'left',
    wordWrap: {
        width: 500
    }
}

let menuConfig = {
    fontFamily: 'Century Gothic',
    // fontFamily: 'Blackadder ITC',
    fontSize: '16px',
    color: '#000000',
    align: 'left',
    wordWrap: {
        width: 300
    }
}

let cutsceneConfig = {
    fontFamily: 'Century Gothic',
    fontSize: '30px',
    bold: true,
    color: '#000000',
    align: 'left',
    wordWrap: {
        width: 300
    }
}

let alienFontConfig = {
    fontFamily: 'AlienScript',
    fontSize: '20px',
    color: '#6D2817',
    align: 'left',
    wordWrap: {
        width: 500
    }
}
