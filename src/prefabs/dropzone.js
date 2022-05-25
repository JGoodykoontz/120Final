class Dropzone extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.setDepth(3);
        this.setInteractive({ dropZone: true });
        this.solved = false;
    }
    zoneComplete(target) {
        this.setTexture(target);
        this.solved = true;
    }
}