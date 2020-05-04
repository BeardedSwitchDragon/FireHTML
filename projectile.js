class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, speed, damageToDeal, rateOfFire, x, y, name, life) {

        super(scene, x, y, name);
        this.speed = 0;
        this.damageToDeal = 0;
        this.rateOfFire = 0;
        this.x = x;
        this.y = y;
        this.begin = x;
        console.log(this.x);
        scene.add.sprite(this);
        scene.projectiles.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 100 + (speed * 20);
        console.log("spawned");


    }

    update() {
        if (this.x - this.begin > this.life) {

        }
    }

    // shoot() {
    //     console.log(this.x);
    //     var timer = window.setTimeout(function() {
    //         console.log(this.x);
    //         while (this.x < 800) {
    //
    //             this.x += this.speed;
    //             console.log("goiiing")
    //         }
    //         //console.log(this.x);
    //     }, (this.rateOfFire * 1000));
    //     // window.clearTimeout(timer);
    // }


}

class Peashooter extends Projectile {
    constructor(scene, x, y) {
        super(scene, 8, 5, 1, x, y, "peashooter", 400);
        console.log("created");
        this.play("peashooter_anim", true);
        console.log("playing anim");
    }
}
