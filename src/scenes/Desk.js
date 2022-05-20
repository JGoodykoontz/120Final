class Desk extends Phaser.Scene {
    constructor() {
        super("deskscene");
    }
    
    create() {
        // fades in the scene from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // initialize keybind
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // load journal.json cached data
        let data = this.cache.json.get('journalData');

        // add the background elements
        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.1).setPipeline('Light2D');   // setPipeline allows dynamic lighting
        bg.scaleX = 1.39;

        // add scene elements
        let lamp = this.physics.add.sprite(400, 135, 'lamp').setOrigin(0, 0).setScale(0.13).setDepth(-2).setPipeline('Light2D');
        let journal = this.add.sprite(125, 350, 'journal').setOrigin(0, 0).setScale(0.7).setPipeline('Light2D');
        let startnoteDesk = this.add.image(900, 330, 'helpNote').setVisible(false);
        journal.visible = true;

        // helpNote interactive settings
        startnoteDesk.setInteractive({
            draggable: true,
            useHandCursor: true
        });

        // Journal interactive settings
        journal.setInteractive({
            draggable: true,
            useHandCursor: true
        });
        // enables dragging
        this.input.on('drag', function (pointer, journal, dragX, dragY) {
            journal.x = dragX;
            journal.y = dragY;
        });

        // Lamp interactive settings
        lamp.setInteractive({
            draggable: false,
            useHandCursor: true
        });
        this.input.on('drag', function (pointer, lamp, dragX, dragY) {
            lamp.x = dragX;
            lamp.y = dragY;
        });

        // make HOW TO PLAY pop-up note at beginning
        let startnote = this.add.rectangle(0, 0, 350, 150, 0xd6ccc1).setOrigin(0);
        let startnoteText = this.add.text(175, 75, "HOW TO PLAY\n\n" +
            "DRAG and DOUBLE CLICK on objects to interact with them\n" +
            "Press ESC to open the menu", journalConfig).setOrigin(0.5);
        let startnoteClose = this.add.sprite(startnote.width - 25, 10, 'close').setOrigin(0);
        startnoteClose.setInteractive({ useHandCursor: true });

        // make note into container
        let startnoteContainer = this.add.container(325, 175, [startnote, startnoteText, startnoteClose]);
        startnoteContainer.setDepth(5);
        startnoteContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, startnote.width, startnote.height), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(startnoteContainer);
        // allow the start note to be dragged
        startnoteContainer.on('drag', function(pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        })

        // allow note to close
        startnoteClose.on('pointerup', () => {
            startnoteContainer.setVisible(false);
            startnoteDesk.setVisible(true);
        })

        // Makes the openJournal container and sets it invisible
        // initial runs on first load
        if(initial) {
            // use to set which puzzle and text to read from journal.json
            whichPuzzle = data.Puzzle.One;      
            content1 = whichPuzzle.Page12.Left;
            content2 = whichPuzzle.Page12.Right;

            // on start show help note
            startnoteContainer.setVisible(true);

            initial = false;    // end initial setup
        }

        // loads in the opened journal
        let journal2 = this.add.sprite(0, 0, 'journalOpen').setOrigin(0);

        // finds the top right corner for the button position
        let jw = (journal2.width) - 15;         // journal width
        let jh = (-journal2.height/2) + 142;    // journal height

        // makes the close button and interactivity
        let closeButton = this.physics.add.sprite(jw, jh, 'close').setScale(0.8);
        closeButton.setInteractive( { useHandCursor: true } );
        
        // makes the page turning buttons
        let turnRight = this.add.sprite(jw, journal2.height - 10, 'right').setScale(0.8);
        turnRight.setInteractive( { useHandCursor: true } );
        let turnLeft = this.add.sprite(10, journal2.height - 10, 'left').setScale(0.8);
        turnLeft.setInteractive( { useHandCursor: true } );

        // Fill in journal contents from journal.json
        let puzzleName = this.add.text(20, 10, whichPuzzle.Title, journalConfig).setScale(0.6);
        let page1 = this.add.text(20, 30, content1, journalConfig).setScale(0.5);
        let page2 = this.add.text(205, 30, content2, journalConfig).setScale(0.5);

        // make an array of components to be used in the container
        let jcContents = [journal2, closeButton, turnRight, turnLeft, puzzleName, page1, page2];

        // make container
        let journalContainer = this.add.container(100, 10, jcContents);
        journalContainer.setDepth(5);   // sets to top of scene
        journalContainer.setScale(1.5);
        journalContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, journal2.width, journal2.height), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(journalContainer);
        turnLeft.setVisible(false);     // defaults to first page so can't turn left

        // allows the opened journal to be dragged
        journalContainer.on('drag', function(pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        })

        // closes the open journal by making invisible
        // this saves the current position and page when next opened
        closeButton.on('pointerup', () => {
            // console.log('close journal');
            journalContainer.setVisible(false);
            journal.setVisible(true);
        })

        // Allows to turn pages
        turnRight.on('pointerup', () => {
            page1.setText(whichPuzzle.Page34.Left);
            page2.setText(whichPuzzle.Page34.Right);
            turnRight.setVisible(false);
            turnLeft.setVisible(true);
        })
        turnLeft.on('pointerup', () => {
            page1.setText(whichPuzzle.Page12.Left);
            page2.setText(whichPuzzle.Page12.Right);
            turnLeft.setVisible(false);
            turnRight.setVisible(true);
        })
        journalContainer.setVisible(false); // initially invisible on scene start

        // double click logic https://phaser.discourse.group/t/double-tap/3051
        // modified with the TheyAreListening code example from class
        // ****
        // USING DOUBLE CLICK TO INTERACT BECAUSE SINGLE CLICK CLASHES WITH THE DRAGGING FUNCTIONALITY
        // ****
        let lastTime = 0;
        this.input.on("gameobjectdown", (pointer, gameObject)=>{
            let clickDelay = this.time.now - lastTime;
            lastTime = this.time.now;
            if(clickDelay < 350) {
                console.log(`Pointer double clicked on '${gameObject.texture.key}'`);
                if(gameObject.texture.key == 'journal') {
                    // console.log('open journal');
                    journalContainer.setVisible(true);
                    journal.setVisible(false);
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
                if(gameObject.texture.key == 'helpNote') {
                    startnoteContainer.setVisible(true);
                    startnoteDesk.setVisible(false);
                }
            }
        });

        // enables dynamic lighting within the scene and on setPipeline("Light2D") objects
        let light = this.lights.addLight(485, 200, 5000, '0xFFFCBB').setIntensity(1.7); // makes a light
        this.lights.enable();                       // allows for dynamic lighting in the scene
        this.lights.setAmbientColor('0xA3A3A3');    // sets the scene's overall light (0x000000) == black/darkness
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('menuscene');
        }
    }
}