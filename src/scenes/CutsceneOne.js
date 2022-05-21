class CutsceneOne extends Phaser.Scene {
    constructor() {
        super('cutsceneone');
    }
    create() {
        // fades in the scene from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        let scene1 = this.add.image(0, 0, 'CS1Part1').setOrigin(0, 0).setDepth(3).setInteractive();
        let scene2 = this.add.image(0, 0, 'CS1Part2').setOrigin(0, 0).setDepth(2).setInteractive();
        let scene3 = this.add.image(0, 0, 'CS1Part3').setOrigin(0, 0).setDepth(1).setInteractive();
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
            this.scene.start('deskscene');
        })
    }
}