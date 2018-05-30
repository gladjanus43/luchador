
class HomeScene extends Scene{

    text!:Phaser.Text;

    preload()
    {
        this.load.image('start-button',"./img/start-button-lucha.png");
    }

    create()
    {
        game.stage.backgroundColor = '#ffffff';
        let start = game.add.sprite(game.world.centerX, game.world.centerY,'start-button');
        start.anchor.setTo(0.5,0.5);
        start.scale.setTo(0.2,0.2);

        let text = game.add.text(game.world.centerX, game.world.centerY + start.height / 1.5,"Start");
        text.anchor.setTo(0.5,0.5);

        text.font = "Press Start 2P";
        text.fontSize = 50;
        text.fill = '#00ff44';

        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5,5,'rgba(0,0,0,0.5)', 5);
        text.inputEnabled = true;

        text.events.onInputUp.add(() => { game.state.start('playScene') });
        text.events.onInputOver.add((textp = text) => this.hoverOverText(textp));
        text.events.onInputOut.add((textp = text) => this.hoverOutText(textp));

        // this.createHomeScreen(start);
    }


    // createHomeScreen(start:Phaser.Sprite)
    // {
    //
    // }

    hoverOverText(text:Phaser.Text)
    {
        text.fill = '#D03958';
    }

    hoverOutText(text:Phaser.Text)
    {
        text.fill = '#00ff44';
    }

}