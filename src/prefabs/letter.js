class Letter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.setDepth(100);
        this.setInteractive({
            useHandCursor: true,
            draggable: true
        })
        this.on('drag', function(pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
            this.setDepth(100);
        })
        this.drop = scene.sound.add("tapSfx");
    }
    letterDrop(correctTarget) {
        this.on('drop', (pointer, target) => {
            // console.log(`Dropped '${this.texture.key}' on '${target.texture.key}'`);
            if(target.texture.key === correctTarget) {
                this.destroy();
                this.drop.play();
                target.zoneComplete(this.texture);
            }
        })
    }
}