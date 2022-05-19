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
    scene: [Menu, Desk],
}

let game = new Phaser.Game(config);

let lightOn = true;
let whichPage = 0;
let content1;
let content2;

let keySPACE;

let journalConfig = {
    fontFamily: 'Bahnschrift Light',
    //fontFamily: 'Century Gothic',
    fontSize: '16px',
    color: '#000000',
    align: 'left',
    wordWrap: {
        width: 300
    }
}
