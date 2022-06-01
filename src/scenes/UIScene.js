class UIScene extends Phaser.Scene {
    constructor() {
        super('ui');
    }
    create() {
        // *****************************************************************
        // Made with the help of https://www.youtube.com/watch?v=G3GrBuTFJbI
        // *****************************************************************
        let settingsButton = this.add.image(game.config.width - 30, 30, 'pauseButton').setScale(0.1);

        let container = this.add.container(game.config.width/2, -300).setDepth(1000);
        let resumeButton = this.add.image(0, 0, 'playButton').setScale(0.2);
        let resumeButtonText = this.add.text(0, 0, 'RESUME', cutsceneConfig).setOrigin(0.5);

        let menuButton = this.add.image(0, 100, 'playButton').setScale(0.2);
        let menuButtonText = this.add.text(0, 100, 'MENU', cutsceneConfig).setOrigin(0.5);

        // transparent dark veil
        this.veil = this.add.graphics({ x: 0, y: 0});
        this.veil.fillStyle('0x000000', 0.3);
        this.veil.fillRect(0, 0, game.config.width, game.config.height);
        this.veil.setDepth(100);
        this.veil.setScrollFactor(0);
        this.veil.setVisible(false);

        container.add(resumeButton);
        container.add(resumeButtonText);
        container.add(menuButton);
        container.add(menuButtonText);

        resumeButton.setInteractive()
            .on('pointerover', () => resumeButton.setTint(0x5797D2) )
            .on('pointerout', () => resumeButton.setTint(0xffffff) )
            .on('pointerdown', () => resumeButton.setTint(0xff00ff) )
            .on('pointerup', () => { 
                resumeButton.setTint(0xffffff);
                this.sound.play("lampSfx", {volume: 1}); 

                // close the settings menu
                isPaused = false;
                this.tweens.add({
                    targets: container,
                    y: -300,
                    duration: 300,
                    ease: 'Sine.InOut'
                })
                this.veil.setVisible(false);
                this.scene.resume('deskscene');
            })

        menuButton.setInteractive()
            .on('pointerover', () => menuButton.setTint(0x5797D2) )
            .on('pointerout', () => menuButton.setTint(0xffffff) )
            .on('pointerdown', () => menuButton.setTint(0xff00ff) )
            .on('pointerup', () => { 
                menuButton.setTint(0xffffff);
                this.sound.play("lampSfx", {volume: 1}); 

                // go to menu scene
                isPaused = false;
                level = 0;
                this.scene.resume('deskscene');
                this.cameras.main.fadeOut(250, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.stop('ui');
                })
            })

        settingsButton.setInteractive() 
            .on('pointerover', () => settingsButton.setTint(0x5797D2) )
            .on('pointerout', () => settingsButton.setTint(0xffffff) )
            .on('pointerdown', () => settingsButton.setTint(0xff00ff) )
            .on('pointerup', () => {
                settingsButton.setTint(0xffffff);
                this.sound.play("lampSfx", {volume: 1});

                // toggle button
                if(!isPaused) {
                    isPaused = true;
                    this.tweens.add({
                        targets: container,
                        y: 300,
                        duration: 300,
                        ease: 'Sine'
                    })
                    this.veil.setVisible(true);
                    this.scene.pause('deskscene');
                }
                else {
                    isPaused = false;
                    this.tweens.add({
                        targets: container,
                        y: -300,
                        duration: 300,
                        ease: 'Sine.InOut'
                    })
                    this.veil.setVisible(false);
                    this.scene.resume('deskscene');
                }
            })
    }
}