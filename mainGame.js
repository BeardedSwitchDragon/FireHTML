
class MainGame extends Phaser.Scene {
    constructor() {
        super("mainGame");

    }





    create() {
        const GROUND_HEIGHT = game.config.height * 3;
        this.cameras.main.setBackgroundColor("#F2C0A2");

        // this.clouds = this.add.tileSprite(0,0, game.config.width, GROUND_HEIGHT, "cloud_bg");
        // this.clouds.setOrigin(0,0);
        // //this.clouds.setScale(5,5);
        // this.clouds.tilePositionX = game.config.width / 2;
        // this.clouds.tilePositionY = game.config.height / 2;


        this.mountain_bg = this.add.tileSprite(0, 0, game.config.width, GROUND_HEIGHT, "mountain_bg");

        this.mountain_bg.tilePositionY = 240;
        this.mountain_bg.setOrigin(0,0);
        this.mountain_bg.setScrollFactor(0);

        this.ground_bg = this.add.tileSprite(0.5, 0.5, game.config.width, GROUND_HEIGHT, "ground_bg");
        //this.ground_bg.flipY = true;


        this.ground_bg.setOrigin(0,0);
        this.ground_bg.setScrollFactor(0);

        this.sun = this.add.sprite(2,2, "sun");
        this.sun.setOrigin(0,0);
        this.sun.scale = 3;



        // this.mountain_bg.tileScaleX = 1.1;
        // this.mountain_bg.tileScaleY = 1.1;
        //this.mountain_bg.setSize(game.config.width, GROUND_HEIGHT);
        this.enemies = this.add.group();
        this.player = this.makePlayer(this.sys.canvas.width / 2, this.sys.canvas.height / 2);
        this.testEnemy = new Homikazee(this, this.sys.canvas.width * 1.25, this.sys.canvas.height/2);
        this.secondEnemy = new Homikazee(this, this.sys.canvas.width * 1.2, this.sys.canvas.height * 0.5);

        this.testEnemy.scale = 3;
        this.secondEnemy.scale = 3;


        this.canShoot = true;
        this.projectiles = this.add.group();

        this.projectileROF = {
            peashooter: 500,
            shotgun: 750

        };

        this.playerHealthLabel = this.add.bitmapText(game.config.width * 0.1, game.config.height * 0.8, "pixelFont", "hp: " + this.player.health, 50);
        this.playerHealthLabel.setDepth(10);


        //input keys
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.commaKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
        this.periodKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);


        var hasStarted = false;

        this.peaTimer = new Date().getTime();
        this.shotTimer = new Date().getTime();




        this.testEnemy.play("homikazee_anim");


        this.physics.add.collider(this.projectiles, this.enemies, function(projectile, enemy) {
            ("collision is working");
            (projectile.body);
            (enemy.body);
            (projectile.damageToDeal);
            enemy.takeDamage(projectile.damageToDeal);
            projectile.destroy();


        });

        this.physics.add.overlap(this.enemies, this.player, function(enemy, player) {

            if (player.isInvincible === false) {
                enemy.destruct();
                player.takeDamage(10);
                player.playIFrame(hasStarted);
                player.isInvincible = true;

            }


            // if (hasStarted === false) {
            //
            //
            //     hasStarted = true;
            // }
            //(this.iframe.progress);

            // if (this.iframe.progress === 1) {
            //     hasStarted = false;
            //     player.isInvincible = false;
            // }



        });
        //(this.player.body);
        this.player.play("player_anim");
        this.sun.play("sun_anim");

        //this.player.playIFrame();

        //this.testEnemy.travel(this.player, this);
        //this.cameras.main.startFollow(this.player);
    }


    // canShootAgain() {
    //     return function () {
    //         if (new Date().now - lastCall < projectileROF.peashooter) {
    //             return false;
    //         }
    //         this.lastCall = new Date().now;
    //         (this.lastCall);
    //     //do stuff
    //     }
    // }



    update() {


        if (this.player.iFrame != undefined && this.player.iFrame.progress === 1) {
            this.player.isInvincible = false;
        }
        //(this.player.isInvincible);
        this.playerHealthLabel.text = "hp: " + this.player.health;


    // if (this.invincible === true) {
    //     if (this.hasStarted )
    //     this.hasStarted = true;
    //     if (this.iFrameTween.progress === 1) {
    //         this.hasStarted;
    //     }
    //     ("progresss:  " + this.iFrameTween.progress);
    //
    //
    // }

        let width = this.sys.canvas.width;
        let height = this.sys.canvas.height;
        this.projectiles.getChildren().forEach(function(projectile) {
            console.log(projectile.name);
            projectile.update();
        });

        for (var enemyIndex = 0; enemyIndex < this.enemies.getChildren().length; enemyIndex++) {
            this.updateEnemies(this.enemies.getChildren()[enemyIndex]);
        }




        this.mountain_bg.tilePositionX += 0.25;
        this.ground_bg.tilePositionX += 0.5;




        if (this.rightKey.isDown) {

            this.player.moveX();
            //(this.player.stats.speed + this.player.stats.boost);
            this.player.flipX = false;

        } else if (this.leftKey.isDown) {

            this.player.moveX(-1);
            this.player.flipX = true;
        }
        if (this.upKey.isDown) {
            this.player.moveY(-1);
        }

        if (this.downKey.isDown) {
            this.player.moveY();

        }

        if (this.player.x <= this.cameras.main.scrollX) {
            this.player.x = this.cameras.main.scrollX + 10;
        } else if (this.player.x >= width -
            (this.player.displayWidth * this.player.originX)  + this.cameras.main.scrollX) {
                this.player.x -= 20;
            }

//README: THIS MUST BE THE LAST TEST (SHIFT TO BOOST)
        if (this.commaKey.isDown && (new Date().getTime() - this.peaTimer > this.projectileROF.peashooter)) {

            this.shootProjectile("peashooter");
            this.canShoot = false;
            this.peaTimer = new Date().getTime();
        } else if (this.periodKey.isDown && (new Date().getTime() - this.shotTimer > this.projectileROF.shotgun)) {
            this.shootProjectile("shotgun");
            this.canShoot = false;
            this.shotTimer = new Date().getTime();
        } else if (this.shiftKey.isDown) {

            this.player.boost = 3;
            //("pressing shift");
            this.player.play("player_boost", true);
        }
        else {
            this.player.boost = 0;

            this.player.play("player_anim", true);
        }
        //(this.cameras.main.scrollX + " + " + this.player.x);
        this.cameras.main.scrollX++;
        this.player.x++;
        this.sun.x++;
        this.playerHealthLabel.x++;


    }

    makePlayer(x,y) {
        var p = new Player(this, x, y);
        p.setOrigin(0.5);


        return p;
    }

    setInvincible() {
        ("callled");
        this.invincible = true;


    }

    updateEnemies(enemy) {
        if (enemy.body != undefined) {
            enemy.travel(this.player, this);
            enemy.update();
        }
    }


    shootProjectile(projectile_name) {
        let rateOfFire = 0;
        const x = this.player.x + 20;
        const y = this.player.y;
        (this.player.flipX);
        let projectile;

        switch (projectile_name) {
            case "peashooter":
            projectile = new Peashooter(this, x, y, this.player.flipX);

            break;
            case "shotgun":
            projectile = new Shotgun(this, x, y, this.player.flipX);
            break;
            default:
                ("gun not found");

        }
        //(this.enemies.getChildren());
        this.physics.add.sprite(projectile);
        //(this.player.x);
    }


}
