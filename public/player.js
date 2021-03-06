class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        this.name = "player";
        scene.add.sprite(this);
        scene.physics.add.sprite(this);
        scene.physics.world.enableBody(this);
        this.body.isCircle = true;
        scene.add.existing(this);

        this.health = 50;
        this.speed = 5;
        this.boost = 0;
        this.x = x;
        this.y = y;
        this.scale = 2;
        this.flipX = false;
        this.isInvincible = false;
        this.availableWeapons = {
            peashooter: true,
            shotgun: false,
            machineGun: true,
            lockers: false
        };
        this.weaponSlot = {
            slotOne: "machinegun",
            slotTwo: "none"
        };
        //Lockers: lock on to enemy and freeze them

        this.scene = scene;
        this.iFrame;



    }

    boost() {
        this.boost = 3;
    }

    moveX(direction=1) {
        this.x += (this.speed + this.boost) * direction;
    }
    moveY(direction=1) {
        this.y += (this.speed + this.boost) * direction;
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    playIFrame(hasStarted) {

        this.iFrame = this.scene.tweens.add({
            targets: this.scene.player,
            pause: true,
            alpha: 0.2,
            ease: 'Cubic.easeOut',
            onComplete: function() {
                this.isInvincible = false;
                ("done");

            },
            duration: 100,
            repeat: 5,
            yoyo: true
        });
        // if (this.iFrameTween.progress === 1) {
        //     hasStarted = true;
        // }
    };

}
