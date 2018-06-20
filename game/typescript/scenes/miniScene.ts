class MiniScene extends Scene {


    preload()
    {
        this.load.image('arrow-button',"./img/arrow-button.png");
        this.load.image('background',"./img/background-3.jpg");
        this.load.image('jump',"./img/jump.png");
        this.load.image('basketball',"./img/basketball.png");
        this.load.image('quiz',"./img/quiz.png");
        this.load.image('game-button', "./img/game-button.png");

    }

    create()
    {
        let background = this.add.tileSprite(0,0,this.game.world.centerX,this.game.world.centerY,'background');
        background.scale.set(2.5,2.5);

        let title = game.add.sprite(600,50,'game-button');
        title.scale.set(0.06);
        title.anchor.set(0.5);
        let titleText = this.createTextBlock('Spelletjes',30, 400);
        titleText.alignTo(title,Phaser.CENTER,-100,-45);


        // Platformer
        let jumpButton = game.add.button(250,150,'jump',() => { this.switchScenes('platformer') });
        jumpButton.scale.set(0.2);
        jumpButton.anchor.set(0.5);
        let jumpText = this.createTextBlock('Lekker rond springen',30, 400);
        jumpText.alignTo(jumpButton,Phaser.CENTER,-150,-80);
        jumpText.inputEnabled = true;
        jumpText.events.onInputUp.add(() => { this.switchScenes('platformer') },this);

        // Basketball knop
        let ballButton = game.add.button(250,150 + jumpButton.height,'basketball',() => { this.switchScenes('basketScene') });
        ballButton.scale.set(0.2);
        ballButton.anchor.set(0.5);
        let ballText = this.createTextBlock('Basketballen',30, 400);
        ballText.alignTo(ballButton,Phaser.CENTER,-150,-80);
        ballText.inputEnabled = true;
        ballText.events.onInputUp.add(() => { this.switchScenes('basketScene') },this);

        // Quiz knop
        let quizButton = game.add.button(250,150 + jumpButton.height + ballButton.height,'quiz',() => { this.switchScenes('fallgame') });
        quizButton.scale.set(0.2);
        quizButton.anchor.set(0.5);
        let quizText = this.createTextBlock('quiz',30, 400);
        quizText.alignTo(quizButton,Phaser.CENTER,-150,-80);
        quizText.inputEnabled = true;
        quizText.events.onInputUp.add(() => { this.switchScenes('fallgame') },this);

        this.setUpBackButton();
    }

    setUpBackButton() {
        let backBox = game.add.sprite(game.world.centerX - 360 ,game.world.centerY - 250,this.createBlock(50,100,''));
        backBox.anchor.setTo(0.5,0.5);

        let backButton = game.add.button(backBox.centerX, backBox.centerY, 'arrow-button', () => {
            this.switchScenes('playScene');
        }, this);
        backButton.scale.setTo(0.1, 0.1);
        backButton.anchor.setTo(0.5, 0.5);
        backButton.rotation = 3.15;

        new Phasetips(this.game,{
            targetObject: backButton,
            context: 'terug',
            strokeColor: 0xff0000,
            x:backButton.left - 10,
            y:backButton.centerY + 20
        });
    }


}