class Desk extends Phaser.Scene {
    constructor() {
        super("deskscene");
    }

    preload() {
        this.load.image("desk_Bg", './assets/desk.png');
        this.load.image("background", './assets/Background.png');
        this.load.image("lamp", './assets/oilLamp.png');

        // Journal
        this.load.image("journal", './assets/journalCover.png');
        this.load.image("journalOpen", './assets/journal1-2.png');
        this.load.image("close", './assets/closeButton.png');

        this.load.audio("openTemp", './assets/open.wav');

        this.load.json("journalData", './assets/journal.json');
    }
    
    create() {
        let data = this.cache.json.get('journalData');
        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.1).setPipeline('Light2D');
        bg.scaleX = 1.39;

        let lamp = this.physics.add.sprite(400, 135, 'lamp').setOrigin(0, 0).setScale(0.13).setPipeline('Light2D');
        let journal = this.add.sprite(125, 350, 'journal').setOrigin(0, 0).setScale(0.7).setPipeline('Light2D');
        journal.visible = true;

        journal.setInteractive({
            draggable: true,
            useHandCursor: true
        });
        //this.input.setDraggable(journal);
        // https://phaser.discourse.group/t/drag-vs-click-detection/4955/2
        // the pointer has to move 16 pixels before it's considered as a drag
        // this.input.dragDistanceThreshold = 16; (not sure if needed)
        // need pointer for mouse coordinates to drag
        this.input.on('drag', function (pointer, journal, dragX, dragY) {
            journal.x = dragX;
            journal.y = dragY;
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

        // Makes the Open Journal container and sets it invisible
        if(whichPage == 0) {
            content1 = data.Puzzle.One.Page12.Left;
            content2 = data.Puzzle.One.Page12.Right;
            whichPage = 1;
        }
        console.log('open journal');
        let journal2 = this.add.sprite(0, 0, 'journalOpen').setOrigin(0);
        let jw = (journal2.width) - 15;
        let jh = (-journal2.height/2) + 142;
        let closeButton = this.physics.add.sprite(jw, jh, 'close').setScale(0.8);
        closeButton.setInteractive({
            useHandCursor: true
        });
        let turnButton = this.add.sprite(10, 10, 'close').setScale(0.8);
        turnButton.setInteractive({
            useHandCursor: true
        });

        let puzzleName = this.add.text(20, 10, data.Puzzle.One.Title, journalConfig).setScale(0.6);
        let page1 = this.add.text(20, 30, content1, journalConfig).setScale(0.5);
        let page2 = this.add.text(205, 30, content2, journalConfig).setScale(0.5);
        let jcContents = [journal2, closeButton, turnButton, puzzleName, page1, page2];

        let journalContainer = this.add.container(100, 10, jcContents);
        journalContainer.setDepth(5);
        journalContainer.setScale(2.3);
        journalContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, journal2.width, journal2.height), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(journalContainer);

        journalContainer.on('drag', function(pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        })

        closeButton.on('pointerup', () => {
            journalContainer.setVisible(false);
            journal.setVisible(true);
            journalOpen = false;
        })

        // Allows to turn pages with temp button
        turnButton.on('pointerup', () => {
            if(whichPage == 1) {
                page1.setText(data.Puzzle.One.Page34.Left);
                page2.setText(data.Puzzle.One.Page34.Right);
                whichPage = 2
            }
            else if(whichPage == 2) {
                page1.setText(data.Puzzle.One.Page12.Left);
                page2.setText(data.Puzzle.One.Page12.Right);
                whichPage = 1;
            }
        })
        journalContainer.setVisible(false);


        // double click logic https://phaser.discourse.group/t/double-tap/3051
        // modified with the TheyAreListening code example from class
        let lastTime = 0;
        this.input.on("gameobjectdown", (pointer, gameObject)=>{
            let clickDelay = this.time.now - lastTime;
            lastTime = this.time.now;
            if(clickDelay < 350) {
                console.log(`Pointer double clicked on '${gameObject.texture.key}'`);
                if(gameObject.texture.key == 'journal') {
                    journalContainer.setVisible(true);
                    journal.setVisible(false);
                    journalOpen = true;
                    this.sound.play("openTemp");
                }
                if(gameObject.texture.key == 'lamp') {
                    if(lightOn) {
                        lightOn = false;
                        light.setIntensity(0);
                        console.log('light off');
                    }
                    else {
                        lightOn = true;
                        light.setIntensity(1.7);
                        console.log('light on');
                    }
                }
            }
        });

        let light = this.lights.addLight(485, 200, 5000, '0xFFFCBB').setIntensity(1.7);
        this.lights.enable();   // allows for dynamic lighting in the scene
        this.lights.setAmbientColor('0xA3A3A3');    // sets the scene's overall light (0x000000) == black/darkness
    
        // just saying what you can do
        this.add.text(500, 400, "double click journal and lamp, drag journal\nSpace to go back to menu\n");
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuscene');
        }
    }
}