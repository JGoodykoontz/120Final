class Menu extends Phaser.Scene {
    constructor() {
        super('menuscene');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        let bg = this.add.image(0, 0, 'background').setOrigin(0).setDepth(-1).setPipeline('Light2D');
        // bg.scaleX = 1.39;
        this.clouds = this.add.tileSprite(605, 0, 360, 240, 'clouds').setOrigin(0, 0).setDepth(-2);
        this.clouds.scaleX = 1.1;

        // init sounds
        let bgm = this.sound.add('bgSfx', {
            mute: false,
            volume: 0.3,
            rate: 1,
            loop: true
        });
        bgm.play();
        let confirmSfx = this.sound.add("confirmSfx", {volume: 0.5});

        // let lamp = this.add.sprite(400, 135, 'lamp').setOrigin(0, 0).setScale(0.13).setPipeline('Light2D');
        let journal = this.add.sprite(175, 350, 'journal').setOrigin(0, 0).setPipeline('Light2D');
        let notepad = this.add.sprite(600, 380, 'notepad').setOrigin(0, 0).setPipeline('Light2D');

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

        // init level to always be 1
        level = 1;

        // setup menu containers
        let startContainer = this.add.container(0, 0);
        let levelContainer = this.add.container(0, -600);
        let creditContainer = this.add.container(0, -600);

        let logo = this.add.image(500, 150, 'logo').setScale(0.4);
        let logo2 = this.add.image(500, 150, 'logo').setScale(0.4);
        let playButton = this.add.image(500, 350, 'playButton').setScale(0.2);
        let playButtonText = this.add.text(500, 350, 'PLAY', cutsceneConfig).setOrigin(0.5);

        let levelButton = this.add.image(500, 450, 'playButton').setScale(0.2);
        let levelButtonText = this.add.text(500, 450, 'LEVEL SELECT', cutsceneConfig).setOrigin(0.5).setScale(0.9);

        let creditButton = this.add.image(500, 550, 'playButton').setScale(0.2);
        let creditButtonText = this.add.text(500, 550, 'CREDITS', cutsceneConfig).setOrigin(0.5);

        let creditConfig = {
            fontFamily: 'Century Gothic',
            fontSize: '30px',
            bold: true,
            // backgroundColor: '#504e31',
            color: '#FFFFFF',
            align: 'left',
            wordWrap: {
                width: 300
            },
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            }
        }
        // let cpanel = this.add.image(500, 370, 'playButton').setScale(0.8);
        let c1 = this.add.text(200, 370, 'Programming\n\n - Jonathan Lewis\n', creditConfig).setOrigin(0.5);
        let c2 = this.add.text(500, 370, 'Art\n\n - Jacquelyn Goodykoontz', creditConfig).setOrigin(0.5);
        let c3 = this.add.text(800, 370, 'Sounds\n\n - Lucas Moore\n- Jonathan Lewis', creditConfig).setOrigin(0.5);

        let lvl1Button = this.add.image(500, 200, 'playButton').setScale(0.2);
        let lvl1ButtonText = this.add.text(500, 200, 'LEVEL 1', cutsceneConfig).setOrigin(0.5);
        let lvl2Button = this.add.image(500, 300, 'playButton').setScale(0.2);
        let lvl2ButtonText = this.add.text(500, 300, 'LEVEL 2', cutsceneConfig).setOrigin(0.5);
        let lvl3Button = this.add.image(500, 400, 'playButton').setScale(0.2);
        let lvl3ButtonText = this.add.text(500, 400, 'LEVEL 3', cutsceneConfig).setOrigin(0.5);
        let backButton = this.add.image(500, 500, 'playButton').setScale(0.2);
        let backButtonText = this.add.text(500, 500, 'BACK', cutsceneConfig).setOrigin(0.5);
        let backButton2 = this.add.image(500, 500, 'playButton').setScale(0.2);
        let backButtonText2 = this.add.text(500, 500, 'BACK', cutsceneConfig).setOrigin(0.5);

        playButton.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => playButton.setTint(0x5797D2) )
        .on('pointerout', () => playButton.setTint(0xffffff) )
        .on('pointerdown', () => playButton.setTint(0xff00ff) )
        .on('pointerup', () => {
            playButton.setTint(0xffffff);
            confirmSfx.play();
            this.tweens.add({
                targets: [confirmSfx, bgm],
                volume: 0,
                ease: 'Linear',
                duration: 2000
            });
            this.cameras.main.fadeOut(2000, 0, 0, 0);
        })

        levelButton.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => levelButton.setTint(0x5797D2) )
        .on('pointerout', () => levelButton.setTint(0xffffff) )
        .on('pointerdown', () => levelButton.setTint(0xff00ff) )
        .on('pointerup', () => {
            levelButton.setTint(0xffffff);
            this.sound.play("lampSfx", {volume: 1});

            // hide other menu and open level menu
            this.tweens.add({
                targets: startContainer,
                y: -600,
                duration: 300,
                ease: 'Sine.InOut'
            })
            this.tweens.add({
                targets: levelContainer,
                y: 0,
                duration: 300,
                ease: 'Sine.InOut'
            })

        })

        creditButton.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => creditButton.setTint(0x5797D2) )
        .on('pointerout', () => creditButton.setTint(0xffffff) )
        .on('pointerdown', () => creditButton.setTint(0xff00ff) )
        .on('pointerup', () => {
            creditButton.setTint(0xffffff);
            this.sound.play("lampSfx", {volume: 1});

            // hide other menu and open level menu
            this.tweens.add({
                targets: startContainer,
                y: -600,
                duration: 300,
                ease: 'Sine.InOut'
            })
            this.tweens.add({
                targets: creditContainer,
                y: 0,
                duration: 300,
                ease: 'Sine.InOut'
            })

        })

        lvl1Button.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => lvl1Button.setTint(0x5797D2) )
        .on('pointerout', () => lvl1Button.setTint(0xffffff) )
        .on('pointerdown', () => lvl1Button.setTint(0xff00ff) )
        .on('pointerup', () => {
            lvl1Button.setTint(0xffffff);
            confirmSfx.play();
            this.tweens.add({
                targets: [confirmSfx, bgm],
                volume: 0,
                ease: 'Linear',
                duration: 2000
            });
            level = 1;
            this.cameras.main.fadeOut(2000, 0, 0, 0);
        })
        lvl2Button.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => lvl2Button.setTint(0x5797D2) )
        .on('pointerout', () => lvl2Button.setTint(0xffffff) )
        .on('pointerdown', () => lvl2Button.setTint(0xff00ff) )
        .on('pointerup', () => {
            lvl2Button.setTint(0xffffff);
            confirmSfx.play();
            this.tweens.add({
                targets: [confirmSfx, bgm],
                volume: 0,
                ease: 'Linear',
                duration: 2000
            });
            level = 2;
            this.cameras.main.fadeOut(2000, 0, 0, 0);
        })
        lvl3Button.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => lvl3Button.setTint(0x5797D2) )
        .on('pointerout', () => lvl3Button.setTint(0xffffff) )
        .on('pointerdown', () => lvl3Button.setTint(0xff00ff) )
        .on('pointerup', () => {
            lvl3Button.setTint(0xffffff);
            confirmSfx.play();
            this.tweens.add({
                targets: [confirmSfx, bgm],
                volume: 0,
                ease: 'Linear',
                duration: 2000
            });
            level = 3;
            this.cameras.main.fadeOut(2000, 0, 0, 0);
        })
        backButton.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => backButton.setTint(0x5797D2) )
        .on('pointerout', () => backButton.setTint(0xffffff) )
        .on('pointerdown', () => backButton.setTint(0xff00ff) )
        .on('pointerup', () => {
            backButton.setTint(0xffffff);
            this.sound.play("lampSfx", {volume: 1});

            // toggle back to main menu
            this.tweens.add({
                targets: startContainer,
                y: 0,
                duration: 300,
                ease: 'Sine.InOut'
            })
            this.tweens.add({
                targets: levelContainer,
                y: -600,
                duration: 300,
                ease: 'Sine.InOut'
            })
        })
        backButton2.setInteractive({
            useHandCursor: true 
        })
        .on('pointerover', () => backButton2.setTint(0x5797D2) )
        .on('pointerout', () => backButton2.setTint(0xffffff) )
        .on('pointerdown', () => backButton2.setTint(0xff00ff) )
        .on('pointerup', () => {
            backButton2.setTint(0xffffff);
            this.sound.play("lampSfx", {volume: 1});

            // toggle back to main menu
            this.tweens.add({
                targets: startContainer,
                y: 0,
                duration: 300,
                ease: 'Sine.InOut'
            })
            this.tweens.add({
                targets: creditContainer,
                y: -600,
                duration: 300,
                ease: 'Sine.InOut'
            })
        })

        startContainer.add(logo);
        startContainer.add(playButton);
        startContainer.add(playButtonText);
        startContainer.add(levelButton);
        startContainer.add(levelButtonText);
        startContainer.add(creditButton);
        startContainer.add(creditButtonText);

        levelContainer.add(lvl1Button);
        levelContainer.add(lvl1ButtonText);
        levelContainer.add(lvl2Button);
        levelContainer.add(lvl2ButtonText);
        levelContainer.add(lvl3Button);
        levelContainer.add(lvl3ButtonText);
        levelContainer.add(backButton);
        levelContainer.add(backButtonText);

        creditContainer.add(logo2);
        // creditContainer.add(cpanel);
        creditContainer.add(c1);
        creditContainer.add(c2);
        creditContainer.add(c3);
        creditContainer.add(backButton2);
        creditContainer.add(backButtonText2);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('cutscene');
        })
    }
    update() {
        this.clouds.tilePositionX -= 0.07;
    }
}