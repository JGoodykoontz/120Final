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
    scene: [Preload, Menu, Desk],
}

let game = new Phaser.Game(config);

let lightOn = true;
let initial = true;
let whichPuzzle;
let content1;
let content2;

let keySPACE;
let keyESC;

let journalConfig = {
    // fontFamily: 'Bahnschrift Light',
    // fontFamily: 'Century Gothic',
    fontFamily: 'Brush Script MT',
    fontSize: '30px',
    color: '#000000',
    align: 'left',
    wordWrap: {
        width: 500
    }
}

let menuConfig = {
    fontFamily: 'Century Gothic',
    fontSize: '16px',
    color: '#000000',
    align: 'left',
    wordWrap: {
        width: 300
    }
}
