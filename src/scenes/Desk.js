class Desk extends Phaser.Scene {
    constructor() {
        super("desk");
    }

    preload() {
        this.load.image("desk_Bg", './assets/desk.png');
        this.load.image("journalCover", './assets/journalCover.png');
        this.load.image("journal12", './assets/journal1-2.png');
        this.load.image("journal34", './assets/journal3-4.png');
    }
    
    create() {
        let bg = this.add.tileSprite(0, 0, 1000, 600, 'desk_Bg').setOrigin(0, 0);
        let journal = this.physics.add.sprite(300, 250, 'journalCover').setOrigin(0, 0);
        journal.setInteractive();
        this.input.setDraggable(journal);

        // need pointer for mouse coordinates to drag
        this.input.on('drag', function (pointer, journal, dragX, dragY) {
            journal.x = dragX;
            journal.y = dragY;
        });
    }
}