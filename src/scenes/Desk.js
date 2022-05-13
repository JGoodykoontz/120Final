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
    }
    
    create() {
        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.1);
        bg.scaleX = 1.39;

        let lamp = this.physics.add.sprite(400, 135, 'lamp').setOrigin(0, 0).setScale(0.13);
        let journal = this.physics.add.sprite(125, 350, 'journal').setOrigin(0, 0).setScale(0.7);
        
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

        lamp.setInteractive({
            draggable: false,
            useHandCursor: true
        });
        this.input.on('drag', function (pointer, lamp, dragX, dragY) {
            lamp.x = dragX;
            lamp.y = dragY;
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
                    console.log('open journal');
                }
            }
        });

        // **from TheyAreListening code example**
        // this.input.on('gameobjectdown', (pointer, gameObject, event) => {
        //     console.log(`Pointer clicked on '${gameObject.texture.key}'`);
        // });
    }
}