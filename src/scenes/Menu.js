class Menu extends Phaser.Scene {
    constructor() {
        super('menuscene');
    }

    create() {
        let bg = this.add.image(0, 0, 'background').setOrigin(0).setDepth(-1).setPipeline('Light2D');
        // bg.scaleX = 1.39;
        this.clouds = this.add.tileSprite(605, 0, 360, 240, 'clouds').setOrigin(0, 0).setDepth(-2);
        this.clouds.scaleX = 1.1;

        // let lamp = this.add.sprite(400, 135, 'lamp').setOrigin(0, 0).setScale(0.13).setPipeline('Light2D');
        // let journal = this.add.sprite(350, 350, 'journal').setOrigin(0, 0).setScale(0.7).setPipeline('Light2D');

        let light = this.lights.addLight(500, 200, 50000, '0xFFFCBB').setIntensity(2);
        let light2 = this.lights.addLight(185, 100, 5000, '0xFFFCBB').setIntensity(1);
        let light3 = this.lights.addLight(885, 500, 5000, '0xFFFCBB').setIntensity(1);
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
        this.lights.setAmbientColor('0x661313');    // sets the scene's overall light (0x000000) == black/darkness

        let playButton = this.add.image(500, 300, 'playButton').setScale(1.5);

        playButton.setInteractive({
            useHandCursor: true 
        })
            .on('pointerover', () => playButton.setTint(0x5797D2) )
            .on('pointerout', () => playButton.setTint(0xffffff) )
            .on('pointerdown', () => playButton.setTint(0xff00ff) )
            .on('pointerup', () => {
                playButton.setTint(0xffffff);
                this.cameras.main.fadeOut(1000, 0, 0, 0);
            })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('cutsceneone');
        })
    }
    update() {
        this.clouds.tilePositionX -= 0.3;
    }
}