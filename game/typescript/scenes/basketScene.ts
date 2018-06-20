class BasketScene extends Scene{

    hoop
    left_rim
    right_rim
    ball
    front_rim
    current_score = 0
    current_score_text
    high_score = 0
    high_score_text
    current_best_text
    spawn
    collisionGroup
    backboard
    whoosh
    current_best_score_text
    cursors
    start_location

    location_interval
    isDown = false;
    start_location
    end_location

    preload() {

        game.load.image('ball', 'images/ball.png');
        game.load.image('hoop', 'images/hoop.png');
        game.load.image('side rim', 'images/side_rim.png');
        game.load.image('front rim', 'images/front_rim.png');
        this.load.image('quit',"./img/quit.png");
        this.load.image('restart',"./img/restart.png");

    }




    create(){

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0.63;
        game.physics.p2.gravity.y = 0;
        // this.setupRestartAndQuitButton();

        this.collisionGroup = game.physics.p2.createCollisionGroup();

        this.backboard = game.add.audio('backboard');
        this.spawn = game.add.audio('spawn');

        game.stage.backgroundColor = "#ffffff";

        this.current_score_text = game.add.text(187, 312, '', { font: 'Arial', fontSize: '40px', fill: '#000', align: 'center' });
        this.current_best_text = game.add.text(143, 281, '', { font: 'Arial', fontSize: '20px', fill: '#000', align: 'center' });
        this.current_best_score_text = game.add.text(187, 312, '', { font: 'Arial', fontSize: '40px', fill: '#00e6e6', align: 'center' });

        this.hoop = game.add.sprite(88, 62, 'hoop');
        this.left_rim = game.add.sprite(150, 184, 'side rim');
        this.right_rim = game.add.sprite(249, 184, 'side rim');

        game.physics.p2.enable([ this.left_rim, this.right_rim], false);

        this.left_rim.body.setCircle(2.5);
        this.left_rim.body.static = true;
        this.left_rim.body.setCollisionGroup(this.collisionGroup);
        this.left_rim.body.collides([this.collisionGroup]);

        this.right_rim.body.setCircle(2.5);
        this.right_rim.body.static = true;
        this.right_rim.body.setCollisionGroup(this.collisionGroup);
        this.right_rim.body.collides([this.collisionGroup]);

        this.createBall();

        this.cursors = game.input.keyboard.createCursorKeys();

        game.input.onDown.add(this.click, this);
        game.input.onUp.add(this.release, this);

        var instructions = document.createElement("span");
        document.body.appendChild(instructions);
    }

    update() {

        if (this.ball && this.ball.body.velocity.y > 0) {
            this.front_rim = game.add.sprite(148, 182, 'front rim');
            this.ball.body.collides([this.collisionGroup], this.hitRim, this);
        }

        if (this.ball && this.ball.body.velocity.y > 0 && this.ball.body.y > 188 && !this.ball.isBelowHoop) {
            this.ball.isBelowHoop = true;
            this.ball.body.collideWorldBounds = false;
            let rand = Math.floor(Math.random() * 5);
            if (this.ball.body.x > 151 && this.ball.body.x < 249) {
                this.current_score += 1;
                this.current_score_text.text = this.current_score;
            } else {

                if (this.current_score > this.high_score) {
                    this.high_score = this.current_score;
                }
                this.current_score = 0;
                this.current_score_text.text = '';
                this.current_best_text.text = 'Current Best';
                this.current_best_score_text.text = this.high_score;
            }

        }

        if (this.ball && this.ball.body.y > 1200) {
            game.physics.p2.gravity.y = 0;
            this.ball.kill();
            this.createBall();
        }

    }


    hitRim() {

        this.backboard.play();

    }

    createBall() {

        var xpos;
        if (this.current_score === 0) {
            xpos = 200;
        } else {
            xpos = 60 + Math.random() * 280;
        }
        this.spawn.play();
        this.ball = game.add.sprite(xpos, 547, 'ball');
        game.add.tween(this.ball.scale).from({x : 0.7, y : 0.7}, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
        game.physics.p2.enable(this.ball, false);
        this.ball.body.setCircle(60);
        this.ball.launched = false;
        this.ball.isBelowHoop = false;

    }



    click(pointer) {

        var bodies = game.physics.p2.hitTest(pointer.position, [ this.ball.body ]);
        if (bodies.length) {
            this.start_location = [pointer.x, pointer.y];
            this.isDown = true;
            this.location_interval = setInterval(function () {
                this.start_location = [pointer.x, pointer.y];
            }.bind(this), 200);
        }

    }

    release(pointer) {

        if (this.isDown) {
            window.clearInterval(this.location_interval);
            this.isDown = false;
            this.end_location = [pointer.x, pointer.y];

            if (this.end_location[1] < this.start_location[1]) {
                let slope = [this.end_location[0] - this.start_location[0], this.end_location[1] - this.start_location[1]];
                let x_traj = -2300 * slope[0] / slope[1];
                this.launch(x_traj);
            }
        }

    }

    launch(x_traj) {

        if (this.ball.launched === false) {
            this.ball.body.setCircle(36);
            this.ball.body.setCollisionGroup(this.collisionGroup);
            this.current_best_text.text = '';
            this.current_best_score_text.text = '';
            this.ball.launched = true;
            game.physics.p2.gravity.y = 3000;
            game.add.tween(this.ball.scale).to({x : 0.6, y : 0.6}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.ball.body.velocity.x = x_traj;
            this.ball.body.velocity.y = -1750;
            this.ball.body.rotateRight(x_traj / 3);
            this.whoosh.play();
        }

    }

    setupRestartAndQuitButton()
    {

        let quit = game.add.button(60, 20, 'quit', () => {
            let e = new Event('quit_game');
            document.body.dispatchEvent(e);
        });

        quit.anchor.set(0.5);
        quit.scale.set(0.06);
        new Phasetips(this.scene.game,{
            targetObject: quit,
            context: 'Stoppen',
            strokeColor: '#c1e5c1',
            x:quit.left - 10,
            y:quit.centerY + 20
        });
    }

}