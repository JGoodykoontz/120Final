class Desk extends Phaser.Scene {
    constructor() {
        super("desk");
    }

    preload() {
        this.load.image("desk_Bg", './assets/desk.png');
        this.load.image("background", './assets/Background.png');
        this.load.image("lamp", './assets/oilLamp.png');

        // Journal
        this.load.image("journal", './assets/journalCover.png');
        this.load.image("journalOpen", './assets/journal1-2.png');
        this.load.image("close", './assets/closeButton.png');
    }
    
    create() {
        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.1);
        bg.scaleX = 1.39;

        let lamp = this.physics.add.sprite(400, 135, 'lamp').setOrigin(0, 0).setScale(0.13);
        let journal = this.physics.add.sprite(125, 350, 'journal').setOrigin(0, 0).setScale(0.7);
        journal.visible = true;

        journal.setInteractive({
            draggable: true,
            useHandCursor: true
        });
        //this.input.setDraggable(journal);
        // https://phaser.discourse.group/t/drag-vs-click-detection/4955/2
        // the pointer has to move 16 pixels before it's considered as a drag
        this.input.dragDistanceThreshold = 16;
        // need pointer for mouse coordinates to drag
        this.input.on('drag', function (pointer, journal, dragX, dragY) {
            journal.x = dragX;
            journal.y = dragY;
        });
        // double click logic https://phaser.discourse.group/t/double-tap/3051
        // modified with the TheyAreListening code example from class
        let lastTime = 0;
        this.input.on("gameobjectdown", (pointer, gameObject)=>{
            let clickDelay = this.time.now - lastTime;
            lastTime = this.time.now;
            if(clickDelay < 350) {
                console.log(`Pointer double clicked on '${gameObject.texture.key}'`);
                if(gameObject.texture.key == 'journal') {
                    this.openJournal();
                    // journal.alpha = 0;
                    journalOpen = true;
                }
            }
        });

        // lamp interactive stuff
        lamp.setInteractive({
            draggable: false,
            useHandCursor: true
        });
        this.input.on('drag', function (pointer, lamp, dragX, dragY) {
            lamp.x = dragX;
            lamp.y = dragY;
        });

    }

    update() {

    }

    openJournal() {
        console.log('open journal');
        let journal2 = this.physics.add.sprite(0, 0, 'journalOpen').setOrigin(0);
        let jw = (journal2.width) - 15;
        let jh = (-journal2.height/2) + 142;
        let closeButton = this.physics.add.sprite(jw, jh, 'close').setScale(0.8);
        closeButton.setInteractive({
            useHandCursor: true
        });

        let journalContainer = this.add.container(100, 10, [journal2, closeButton]);
        journalContainer.setDepth(5);
        journalContainer.setScale(2.3);
        journalContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, journal2.width, journal2.height), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(journalContainer);

        journalContainer.on('drag', function(pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        })

        closeButton.on('pointerup', () => {
            journalContainer.destroy();
            journalOpen = false;
        })
    }
}