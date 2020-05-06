class Intro extends Phaser.Scene {
    constructor() {
        super("introScene");
    }

    create() {
        this.add.text(this.sys.canvas.width / 2, this.sys.canvas.width / 2, "VT323", "loading...");
        this.scene.start("mainGame");

    }
}
