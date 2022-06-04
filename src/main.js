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
    scene: [Preload, Menu, Cutscene, Desk, End, UIScene],
}

let game = new Phaser.Game(config);

// desk variables
let lightOn = true;
let initial = true;
let whichPuzzle;
let whichPage;
let content1;
let content2;
let topCounter = 0; // counter for moving stuff to top of scene
let p1Check = false;
let p2Check = false;
let sound1 = true, sound2 = true, sound3 = true;
let note1, note2;
let noteComplete1, noteComplete2, noteComplete3;
let p1, p2;
let level = 1;
let puzzleName, page1, page2;
let p1z1, p1z2, p1z3, p1z4, p1z5, p1z6, p1z7, p2z1, p2z2, p2z3, p2z4, p2z5, p2z6, p2z7;
let p1l1, p1l2, p1l3, p1l4, p1l5, p1l6, p1l7, p2l1, p2l2, p2l3, p2l4, p2l5, p2l6, p2l7;
let hint;
let journalContainer;
let p1container, p2container;
let puzzleContents1 = [];
let puzzleContents2 = [];
let jcContents = [];


// cutscene variables
let counter = 1;
let complete = false;
let scene1;
let scene2;
let scene3;
let sceneSfx;

// pause menu check
let isPaused = false;

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

let hintConfig = {
    fontFamily: 'Century Gothic',
    fontSize: '16px',
    color: '#000000',
    align: 'left',
}
