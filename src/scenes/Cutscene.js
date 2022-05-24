class Cutscene extends Phaser.Scene {
    constructor() {
        super('cutscene');
    }
    create() {
        // fades in the scene from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        
        if(level == 1) {
            scene1 = this.add.image(0, 0, 'CS1Part1').setOrigin(0, 0).setDepth(3).setInteractive();
            scene2 = this.add.image(0, 0, 'CS1Part2').setOrigin(0, 0).setDepth(2).setInteractive();
            scene3 = this.add.image(0, 0, 'CS1Part3').setOrigin(0, 0).setDepth(1).setInteractive();
        }
        if(level == 2) {
            scene1 = this.add.image(0, 0, 'CS2Part1').setOrigin(0, 0).setDepth(3).setInteractive();
            scene2 = this.add.image(0, 0, 'CS2Part2').setOrigin(0, 0).setDepth(2).setInteractive();
            scene3 = this.add.image(0, 0, 'CS2Part3').setOrigin(0, 0).setDepth(1).setInteractive();
        }

        // play the cutscene on first time loading
        if(initial) {
            this.add.text(500, 550, "Click to continue", cutsceneConfig).setOrigin(0.5, 0.5).setDepth(5);   

            scene1.on('pointerup', () => {
                scene1.destroy();
                counter++;
            })
            scene2.on('pointerup', () => {
                scene2.destroy();
                counter++;
            })
            scene3.on('pointerup', () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0);
            })
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                scene3.destroy();
                this.scene.start('deskscene');
            })
        }
        // otherwise skip straight to desk
        if(!initial) {
            this.cameras.main.fadeOut(10, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('deskscene');
            })
        }
    }
}