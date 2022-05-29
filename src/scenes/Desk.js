class Desk extends Phaser.Scene {
    constructor() {
        super("deskscene");
    }
    
    create() {
        // fades in the scene from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // initialize keybind
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);    // used for pause menu

        // load journal.json cached data
        let data = this.cache.json.get('journalData');

        // add the background elements
        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setPipeline('Light2D');   // setPipeline allows dynamic lighting
        this.clouds = this.add.tileSprite(605, 0, 360, 240, 'clouds').setOrigin(0, 0).setDepth(-2);
        this.clouds.scaleX = 1.1;

        // add scene elements
        let lamp = this.physics.add.sprite(460, 135, 'lamp').setOrigin(0, 0).setScale(0.12).setDepth(-2).setPipeline('Light2D');
        let journal = this.add.sprite(125, 350, 'journal').setOrigin(0, 0).setPipeline('Light2D');
        let startnoteDesk = this.add.image(50, 325, 'helpNote').setVisible(false);
        journal.visible = true;
        let notepad = this.add.sprite(500, 360, 'notepad').setOrigin(0, 0).setPipeline('Light2D');

        // enables dynamic lighting within the scene and on setPipeline("Light2D") objects
        let light = this.lights.addLight(500, 200, 5000, '0xFFFCBB').setIntensity(1.7); // makes a light
        this.lights.enable();                       // allows for dynamic lighting in the scene
        // this.lights.setAmbientColor('0xA3A3A3');    // sets the scene's overall light (0x000000) == black/darkness


        // *******************************
        // Initialize Interactive Elements
        // *******************************

        // helpNote interactive settings
        this.makeInteractive(startnoteDesk, true, true);

        // Journal interactive settings
        this.makeInteractive(journal, true, true);

        // Notepad interactive settings
        this.makeInteractive(notepad, true, true);

        // Lamp interactive settings
        this.makeInteractive(lamp, false, true);


        // *****************************************
        // make HOW TO PLAY pop-up note at beginning
        // *****************************************
        let startnote = this.add.rectangle(0, 0, 350, 150, 0xd6ccc1).setOrigin(0);
        let startnoteText = this.add.text(175, 75, "HOW TO PLAY\n\n" +
            "DRAG and DOUBLE CLICK on objects to interact with them\n" +
            "Press ESC to open the menu", menuConfig).setOrigin(0.5);
        let startnoteClose = this.add.sprite(startnote.width - 25, 10, 'close').setOrigin(0);
        startnoteClose.setInteractive({ useHandCursor: true });

        // make note into container
        let startnoteContainer = this.add.container(325, 175, [startnote, startnoteText, startnoteClose]);
        startnoteContainer.setDepth(5);
        startnoteContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, startnote.width, startnote.height), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(startnoteContainer);
        startnoteContainer.setVisible(false);
        // allow the start note to be dragged
        startnoteContainer.on('drag', function(pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        })

        // allow note to close
        startnoteClose.on('pointerup', () => {
            startnoteContainer.setVisible(false);
            startnoteDesk.setVisible(true);
            this.sound.play("closeSfx", {volume: 2 });
        })

        // initial runs on first load, loads the hint note at start
        if(initial) {
            // on start show help note
            startnoteContainer.setVisible(true);
            initial = false;    // end initial setup
        }
        else {
            startnoteDesk.setVisible(true);
        }

        // ************************
        // SETUP NOTEPAD CONTAINER
        // ************************
        let notepad2 = this.add.sprite(0, 0, 'notepadOpen').setOrigin(0);
        let noteCloseButton = this.add.image(notepad2.width - 15, 50, 'close');
        noteCloseButton.setInteractive({ useHandCursor: true });
        let notepadText = this.add.text(80, 100, data.Puzzle.One.Page12.Word + " is the " + data.Puzzle.One.Page34.Word + "\n\n" +
                                                data.Puzzle.Two.Page12.Word + " is the " + data.Puzzle.Two.Page34.Word + "\n\n" +
                                                data.Puzzle.Three.Page12.Word + " or " + data.Puzzle.Three.Page34.Word, cutsceneConfig).setOrigin(0);
        let notepadContainer = this.add.container(500, 30, [notepad2, noteCloseButton, notepadText]);
        notepadContainer.setDepth(5+topCounter);   // sets to top of scene
        notepadContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, notepad2.width, notepad2.height), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(notepadContainer);
        notepadContainer.on('drag', function(pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        })
        noteCloseButton.on('pointerup', () => {
            // console.log('close journal');
            notepadContainer.setDepth(5);
            notepadContainer.setVisible(false);
            notepad.setVisible(true);
            this.sound.play("closeSfx", {volume: 3 });
        })
        notepadContainer.on('pointerdown', () => {
            notepadContainer.setDepth(5+topCounter);
            topCounter++;
        })
        notepadContainer.setVisible(false);


        // ************************
        // SETUP PUZZLE PARAMETERS
        // ************************

        // make puzzle1 components
        // zone markers
        p1z1 = new Dropzone(this, 310, 230, 'dropD').setScale(0.5).setVisible(false);
        p1z2 = new Dropzone(this, 340, 230, 'dropD').setScale(0.5).setVisible(false);
        p1z3 = new Dropzone(this, 370, 230, 'dropD').setScale(0.5).setVisible(false);
        p1z4 = new Dropzone(this, 400, 230, 'dropD').setScale(0.5).setVisible(false);
        p1z5 = new Dropzone(this, 430, 230, 'dropD').setScale(0.5).setVisible(false);
        p1z6 = new Dropzone(this, 460, 230, 'dropD').setScale(0.5).setVisible(false);
        p1z7 = new Dropzone(this, 490, 230, 'dropD').setScale(0.5).setVisible(false);
        // letters
        p1l1 = new Letter(this, 280, 290, 'markD').setScale(0.55).setVisible(false);
        p1l2 = new Letter(this, 320, 290, 'markD').setScale(0.55).setVisible(false);
        p1l3 = new Letter(this, 360, 290, 'markD').setScale(0.55).setVisible(false);
        p1l4 = new Letter(this, 400, 290, 'markD').setScale(0.55).setVisible(false);
        p1l5 = new Letter(this, 440, 290, 'markD').setScale(0.55).setVisible(false);
        p1l6 = new Letter(this, 480, 290, 'markD').setScale(0.55).setVisible(false);
        p1l7 = new Letter(this, 520, 290, 'markD').setScale(0.55).setVisible(false);

        // make puzzle1 components
        // zone markers
        p2z1 = new Dropzone(this, 310, 230, 'dropD').setScale(0.5).setVisible(false);
        p2z2 = new Dropzone(this, 340, 230, 'dropD').setScale(0.5).setVisible(false);
        p2z3 = new Dropzone(this, 370, 230, 'dropD').setScale(0.5).setVisible(false);
        p2z4 = new Dropzone(this, 400, 230, 'dropD').setScale(0.5).setVisible(false);
        p2z5 = new Dropzone(this, 430, 230, 'dropD').setScale(0.5).setVisible(false);
        p2z6 = new Dropzone(this, 460, 230, 'dropD').setScale(0.5).setVisible(false);
        p2z7 = new Dropzone(this, 490, 230, 'dropD').setScale(0.5).setVisible(false);
        // letters
        p2l1 = new Letter(this, 280, 290, 'markD').setScale(0.55).setVisible(false);
        p2l2 = new Letter(this, 320, 290, 'markD').setScale(0.55).setVisible(false);
        p2l3 = new Letter(this, 360, 290, 'markD').setScale(0.55).setVisible(false);
        p2l4 = new Letter(this, 400, 290, 'markD').setScale(0.55).setVisible(false);
        p2l5 = new Letter(this, 440, 290, 'markD').setScale(0.55).setVisible(false);
        p2l6 = new Letter(this, 480, 290, 'markD').setScale(0.55).setVisible(false);
        p2l7 = new Letter(this, 520, 290, 'markD').setScale(0.55).setVisible(false);


        // *******************************
        // SETUP LEVELS/PUZZLE CONTAINERS
        // *******************************
        if(level == 1) {
            this.lights.setAmbientColor('0xA3A3A3');    // sets the scene's overall light (0x000000) == black/darkness
            p1Check = false;
            p2Check = false;
            // use to set which puzzle and text to read from journal.json
            whichPuzzle = data.Puzzle.One;   
            whichPage = whichPuzzle.Page12;   
            content1 = whichPage.Left;
            content2 = whichPage.Right;
            hint = this.add.text(305, 180, whichPage.Hint, hintConfig).setScale(0.5);
            // Fill in journal contents from journal.json
            puzzleName = this.add.text(20, 10, whichPuzzle.Page12.Title, journalConfig).setScale(0.5);
            page1 = this.add.text(20, 40, content1, journalConfig).setScale(0.5);
            page2 = this.add.text(295, 40, content2, journalConfig).setScale(0.5);

            // Page12 puzzle
            // zones
            p1z2.setTexture('dropD').setVisible(true);
            p1z3.setTexture('dropR').setVisible(true);
            p1z4.setTexture('dropE').setVisible(true);
            p1z5.setTexture('dropA').setVisible(true);
            p1z6.setTexture('dropM').setVisible(true);
            // letters
            p1l2.setTexture('markE').setVisible(true);
            p1l3.setTexture('markA').setVisible(true);
            p1l4.setTexture('markM').setVisible(true);
            p1l5.setTexture('markD').setVisible(true);
            p1l6.setTexture('markR').setVisible(true);
            // letter drop target
            p1l2.letterDrop('dropE');
            p1l3.letterDrop('dropA');
            p1l4.letterDrop('dropM');
            p1l5.letterDrop('dropD');
            p1l6.letterDrop('dropR');
            puzzleContents1 = [p1z2, p1z3, p1z4, p1z5, p1z6, p1l2, p1l3, p1l4, p1l5, p1l6]
            p1 = [p1z2, p1z3, p1z4, p1z5, p1z6];
            p1container = this.add.container(0, 10, puzzleContents1);

            // Page34 puzzle
            // zones
            p2z3.setTexture('dropK').setVisible(true);
            p2z4.setTexture('dropE').setVisible(true);
            p2z5.setTexture('dropY').setVisible(true);
            // letters
            p2l3.setTexture('markY').setVisible(true);
            p2l4.setTexture('markK').setVisible(true);
            p2l5.setTexture('markE').setVisible(true);
            // letter drop target
            p2l3.letterDrop('dropY');
            p2l4.letterDrop('dropK');
            p2l5.letterDrop('dropE');
            puzzleContents2 = [p2z3, p2z4, p2z5, p2l3, p2l4, p2l5]
            p2 = [p2z3, p2z4, p2z5];
            p2container = this.add.container(0, 10, puzzleContents2);
        }
        if(level == 2) {
            this.lights.setAmbientColor('0x595C7A');    // sets the scene's overall light (0x000000) == black/darkness
            p1Check = false;
            p2Check = false;
            // use to set which puzzle and text to read from journal.json
            whichPuzzle = data.Puzzle.Two;   
            whichPage = whichPuzzle.Page12;   
            content1 = whichPage.Left;
            content2 = whichPage.Right;
            hint = this.add.text(305, 180, whichPage.Hint, hintConfig).setScale(0.5);
            // Fill in journal contents from journal.json
            puzzleName = this.add.text(20, 10, whichPuzzle.Page12.Title, journalConfig).setScale(0.5);
            page1 = this.add.text(20, 40, content1, journalConfig).setScale(0.5);
            page2 = this.add.text(295, 40, content2, journalConfig).setScale(0.5);

            // Page12 puzzle
            // zones
            p1z2.setTexture('dropM').setVisible(true);
            p1z3.setTexture('dropI').setVisible(true);
            p1z4.setTexture('dropN').setVisible(true);
            p1z5.setTexture('dropD').setVisible(true);
            // letters
            p1l2.setTexture('markN').setVisible(true);
            p1l3.setTexture('markM').setVisible(true);
            p1l4.setTexture('markD').setVisible(true);
            p1l5.setTexture('markI').setVisible(true);
            // letter drop target
            p1l2.letterDrop('dropN');
            p1l3.letterDrop('dropM');
            p1l4.letterDrop('dropD');
            p1l5.letterDrop('dropI');
            puzzleContents1 = [p1z2, p1z3, p1z4, p1z5, p1l2, p1l3, p1l4, p1l5];
            p1 = [p1z2, p1z3, p1z4, p1z5];
            p1container = this.add.container(0, 10, puzzleContents1);

            // Page34 puzzle
            // zones
            p2z2.setTexture('dropG').setVisible(true);
            p2z3.setTexture('dropA').setVisible(true);
            p2z4.setTexture('dropT').setVisible(true);
            p2z5.setTexture('dropE').setVisible(true);
            // letters
            p2l2.setTexture('markT').setVisible(true);
            p2l3.setTexture('markG').setVisible(true);
            p2l4.setTexture('markE').setVisible(true);
            p2l5.setTexture('markA').setVisible(true);
            // letter drop target
            p2l2.letterDrop('dropT');
            p2l3.letterDrop('dropG');
            p2l4.letterDrop('dropE');
            p2l5.letterDrop('dropA');
            puzzleContents2 = [p2z2, p2z3, p2z4, p2z5, p2l2, p2l3, p2l4, p2l5];
            p2 = [p2z2, p2z3, p2z4, p2z5];
            p2container = this.add.container(0, 10, puzzleContents2);
        }
        if(level == 3) {
            this.lights.setAmbientColor('0x1C204A');    // sets the scene's overall light (0x000000) == black/darkness
            p1Check = false;
            p2Check = false;
             // use to set which puzzle and text to read from journal.json
             whichPuzzle = data.Puzzle.Three;   
             whichPage = whichPuzzle.Page12;   
             content1 = whichPage.Left;
             content2 = whichPage.Right;
             hint = this.add.text(305, 180, whichPage.Hint, hintConfig).setScale(0.5);
             // Fill in journal contents from journal.json
             puzzleName = this.add.text(20, 10, whichPuzzle.Page12.Title, journalConfig).setScale(0.5);
             page1 = this.add.text(20, 40, content1, journalConfig).setScale(0.5);
             page2 = this.add.text(295, 40, content2, journalConfig).setScale(0.5);
 
             // Page12 puzzle
             // zones
             p1z1.setTexture('dropC').setVisible(true);
             p1z2.setTexture('dropO').setVisible(true);
             p1z3.setTexture('dropN').setVisible(true);
             p1z4.setTexture('dropT').setVisible(true);
             p1z5.setTexture('dropR').setVisible(true);
             p1z6.setTexture('dropO').setVisible(true);
             p1z7.setTexture('dropL').setVisible(true);
             // letters
             p1l1.setTexture('markN').setVisible(true);
             p1l2.setTexture('markT').setVisible(true);
             p1l3.setTexture('markC').setVisible(true);
             p1l4.setTexture('markO').setVisible(true);
             p1l5.setTexture('markL').setVisible(true);
             p1l6.setTexture('markR').setVisible(true);
             p1l7.setTexture('markO').setVisible(true);
             // letter drop target
             p1l1.letterDrop('dropN');
             p1l2.letterDrop('dropT');
             p1l3.letterDrop('dropC');
             p1l4.letterDrop('dropO');
             p1l5.letterDrop('dropL');
             p1l6.letterDrop('dropR');
             p1l7.letterDrop('dropO');
             puzzleContents1 = [p1z1, p1z2, p1z3, p1z4, p1z5, p1z6, p1z7, p1l1, p1l2, p1l3, p1l4, p1l5, p1l6, p1l7];
             p1 = [p1z1, p1z2, p1z3, p1z4, p1z5, p1z6, p1z7];
             p1container = this.add.container(0, 10, puzzleContents1);
 
             // Page34 puzzle
             // zones
             p2z1.setTexture('dropF').setVisible(true);
             p2z2.setTexture('dropR').setVisible(true);
             p2z3.setTexture('dropE').setVisible(true);
             p2z4.setTexture('dropE').setVisible(true);
             p2z5.setTexture('dropD').setVisible(true);
             p2z6.setTexture('dropO').setVisible(true);
             p2z7.setTexture('dropM').setVisible(true);
             // letters
             p2l1.setTexture('markE').setVisible(true);
             p2l2.setTexture('markD').setVisible(true);
             p2l3.setTexture('markM').setVisible(true);
             p2l4.setTexture('markF').setVisible(true);
             p2l5.setTexture('markE').setVisible(true);
             p2l6.setTexture('markR').setVisible(true);
             p2l7.setTexture('markO').setVisible(true);
             // letter drop target
             p2l1.letterDrop('dropE');
             p2l2.letterDrop('dropD');
             p2l3.letterDrop('dropM');
             p2l4.letterDrop('dropF');
             p2l5.letterDrop('dropE');
             p2l6.letterDrop('dropR');
             p2l7.letterDrop('dropO');
             puzzleContents2 = [p2z1, p2z2, p2z3, p2z4, p2z5, p2z6, p2z7, p2l1, p2l2, p2l3, p2l4, p2l5, p2l6, p2l7];
             p2 = [p2z1, p2z2, p2z3, p2z4, p2z5, p2z6, p2z7];
             p2container = this.add.container(0, 10, puzzleContents2);
        }

        // ************************
        // JOURNAL CONTAINER SETUP
        // ************************
        let journal2 = this.add.sprite(0, 0, 'journalOpen').setOrigin(0);
        // finds the top right corner for the button position
        let jw = (journal2.width) - 15;         // journal width
        let jh = 15;                            // journal height
        // makes the close button and interactivity
        let closeButton = this.physics.add.sprite(jw, jh, 'close').setScale(0.8);
        closeButton.setInteractive( { useHandCursor: true } );
        // makes the page turning buttons
        let turnRight = this.add.sprite(jw, journal2.height - 10, 'right').setScale(1.2);
        turnRight.setInteractive( { useHandCursor: true } );
        let turnLeft = this.add.sprite(15, journal2.height - 10, 'left').setScale(1.2);
        turnLeft.setInteractive( { useHandCursor: true } );
        // make container
        jcContents = [journal2, closeButton, turnRight, turnLeft, puzzleName, page1, page2, hint];
        journalContainer = this.add.container(100, 10, jcContents);
        journalContainer.setDepth(3);   // sets to top of scene
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
            this.sound.play("closeSfx", {volume: 4 });
            journalContainer.setDepth(5);
            journalContainer.setVisible(false);
            journal.setVisible(true);
        })
        journalContainer.on('pointerdown', () => {
            journalContainer.setDepth(5+topCounter);
            topCounter++;
        })

        // Page Turning Logic
        turnRight.on('pointerup', () => {
            this.sound.play("turnSfx", {volume: 4 });
            if(p2Check == true) {
                page1.setText(whichPuzzle.Page34.LeftSolved);
                page2.setText(whichPuzzle.Page34.RightSolved);
            }
            else {
                page1.setText(whichPuzzle.Page34.Left);
                page2.setText(whichPuzzle.Page34.Right);
            }
            puzzleName.setText(whichPuzzle.Page34.Title);
            hint.setText(whichPuzzle.Page34.Hint);
            p1container.setVisible(false);
            p2container.setVisible(true);
            turnRight.setVisible(false);
            turnLeft.setVisible(true);
        })
        turnLeft.on('pointerup', () => {
            this.sound.play("turnSfx", {volume: 4 });
            if(p1Check == true) {
                page1.setText(whichPuzzle.Page12.LeftSolved);
                page2.setText(whichPuzzle.Page12.RightSolved);
            }
            else {
                page1.setText(whichPuzzle.Page12.Left);
                page2.setText(whichPuzzle.Page12.Right);
            }
            puzzleName.setText(whichPuzzle.Page12.Title);
            hint.setText(whichPuzzle.Page12.Hint);
            p1container.setVisible(true);
            p2container.setVisible(false);
            turnLeft.setVisible(false);
            turnRight.setVisible(true);
        })

        // Add contents to Journal Container
        jcContents = [journal2, closeButton, turnRight, turnLeft, puzzleName, page1, page2, hint];
        journalContainer.add(p1container);
        journalContainer.add(p2container);
        p1container.setVisible(true);
        p2container.setVisible(false);
        
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
                    this.sound.play("openSfx", {volume: 4 });
                }
                if(gameObject.texture.key == 'lamp') {
                    this.sound.play("lampSfx", {volume: 2 });
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
                    this.sound.play("openSfx", {volume: 2 });
                    startnoteContainer.setVisible(true);
                    startnoteDesk.setVisible(false);
                }
                if(gameObject.texture.key == 'notepad') {
                    this.sound.play("openSfx", {volume: 3 });
                    notepadContainer.setVisible(true);
                    notepad.setVisible(false);
                }
            }
        });

        let sleepButton = this.add.image(850, 550, 'playButton').setScale(0.2);
        let sleepButtonText = this.add.text(850, 550, 'SLEEP', cutsceneConfig).setOrigin(0.5);
        sleepButton.setTint(0x5797D2);
        sleepButton.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => {
            if(p1Check && p2Check) {
                sleepButton.setTint(0x5797D2)
            }
        })
        .on('pointerout', () => {
            if(p1Check && p2Check) {
                sleepButton.setTint(0xffffff)
            }
            else {
                sleepButton.setTint(0x5797D2)
            }
        })
        .on('pointerdown', () => {
            if(p1Check && p2Check) {
                sleepButton.setTint(0xff00ff)
            }
            else {
                sleepButton.setTint(0x5797D2)
            }
        })
        .on('pointerup', () => {
            if(p1Check && p2Check) {
                sleepButton.setTint(0xffffff);
                level++;
                this.sound.play("lampSfx", {volume: 1});
                this.cameras.main.fadeOut(1000, 0, 0, 0);
            }
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            if(level == 4) {
                this.scene.start('endscene');
            }
            else {
                this.scene.start('cutscene');
            }
        })
    }

    update() {
        this.clouds.tilePositionX -= 0.07;
        if(Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('menuscene');
        }
        this.checkSolved(p1);
        this.checkSolved(p2);
        if(p1Check && p2Check) {
            this.sleepButton.clearTint();
        }
    }

    makeInteractive(obj, drag, cursor) {
        obj.setInteractive({
            draggable: drag,
            useHandCursor: cursor
        });
        if(drag) {
            this.makeDrag(obj);
        }
    }
    makeDrag(obj) {
        this.input.on('drag', function (pointer, obj, dragX, dragY) {
            obj.x = dragX;
            obj.y = dragY;
        });
    }
    checkSolved(puzzle) {
        for(let i = 0; i < puzzle.length; i++) {
            if(puzzle[i].solved == true) {
                continue;
            }
            else {
                return false;
            }
        }
        if(puzzle == p1) {
            p1Check = true;
        }
        if(puzzle == p2) {
            p2Check = true;
        }
    }
}