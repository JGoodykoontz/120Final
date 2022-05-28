class End extends Phaser.Scene {
    constructor() {
        super('endscene');
    }
    create() {
        // fades in the scene from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // initialize keybind
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);    // used for pause menu

        // add the background elements
        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setPipeline('Light2D');   // setPipeline allows dynamic lighting
        this.clouds = this.add.tileSprite(605, 0, 360, 240, 'clouds').setOrigin(0, 0).setDepth(-2);
        this.clouds.scaleX = 1.1;

        // let lamp = this.add.sprite(400, 135, 'lamp').setOrigin(0, 0).setScale(0.13).setPipeline('Light2D');
        // let journal = this.add.sprite(175, 350, 'journal').setOrigin(0, 0).setPipeline('Light2D');
        // let notepad = this.add.sprite(600, 380, 'notepad').setOrigin(0, 0).setPipeline('Light2D');
        let light = this.lights.addLight(500, 200, 500, '0xFFFCBB').setIntensity(1);
        let light2 = this.lights.addLight(185, 100, 500, '0xFFFCBB').setIntensity(0.5);
        let light3 = this.lights.addLight(885, 500, 500, '0xFFFCBB').setIntensity(0.5);
        let light4 = this.lights.addLight(100, 500, 500, '0xFFCBB').setIntensity(0.5);

        this.tweens.add({
            targets: light2,
            x: 450,
            y: 350,
            ease: "Linear",
            yoyo: true,
            duration: 10000,
            repeat: -1,
            repeatDelay: 5000
        })
        this.tweens.add({
            targets: light3,
            x: 525,
            y: 150,
            ease: "Linear",
            yoyo: true,
            duration: 10000,
            repeat: -1,
            repeatDelay: 5000
        })
        this.tweens.add({
            targets: light4,
            x: 825,
            y: 250,
            ease: "Linear",
            yoyo: true,
            duration: 15000,
            repeat: -1,
            repeatDelay: 5000
        })

        this.lights.enable();   // allows for dynamic lighting in the scene
        this.lights.setAmbientColor('0x3F1247');    // sets the scene's overall light (0x000000) == black/darkness

        let controlButton = this.add.image(300, 400, 'playButton').setScale(0.2);
        let controlButtonText = this.add.text(300, 400, 'CONTROL', cutsceneConfig).setOrigin(0.5);
        let freedomButton = this.add.image(700, 400, 'playButton').setScale(0.2);
        let freedomButtonText = this.add.text(700, 400, 'FREEDOM', cutsceneConfig).setOrigin(0.5);
        controlButton.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => controlButton.setTint(0x5797D2) )
        .on('pointerout', () => controlButton.setTint(0xffffff) )
        .on('pointerdown', () => controlButton.setTint(0xff00ff) )
        .on('pointerup', () => {
            controlButton.setTint(0xffffff);
            level = 6;  // control ending
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        })
        freedomButton.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => freedomButton.setTint(0x5797D2) )
        .on('pointerout', () => freedomButton.setTint(0xffffff) )
        .on('pointerdown', () => freedomButton.setTint(0xff00ff) )
        .on('pointerup', () => {
            level = 7;  // freedom ending
            freedomButton.setTint(0xffffff);
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        })
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('cutscene');
        })
    
    }
    update() {
        this.clouds.tilePositionX -= 0.07;
    }
}