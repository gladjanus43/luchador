import Scene from "../core/scene";

export default class HomeScene extends Scene{

    text!:Phaser.Text;

    preload()
    {
        this.load.image('start-button',"./img/WrestlerWorld.png");
        this.style = { font: "Press Start 2P", size: 60, fill: "#00ff44" };
    }

    create()
    {
        this.stage.backgroundColor = '#ffffff';
        this.game.add.sprite(300,400,'start-button');
        this.createHomeScreen();
    }


    createHomeScreen()
    {
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY,"Start");
        this.text.anchor.setTo(0.5);

        this.text.font = "Press Start 2P";
        this.text.fontSize = 60;
        this.text.fill = '#00ff44';

        this.text.align = 'center';
        this.text.stroke = '#000000';
        this.text.strokeThickness = 2;
        this.text.setShadow(5,5,'rgba(0,0,0,0.5)', 5);
        this.text.inputEnabled = true;

        this.text.events.onInputOver.add(this.hoverOverText);
        this.text.events.onInputOut.add(this.hoverOutText);
    }

    hoverOverText()
    {
        this.text.fill = '#D03958';
    }

    hoverOutText()
    {
        this.text.fill = '#00ff44';
    }

}