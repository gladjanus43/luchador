class SpeechBubble{

    bubble:Phaser.Sprite;
    bubbleText:Phaser.Text;


    constructor(parentSprite:Phaser.Sprite,scale:number,position:number,xOffset:number = 0,yOffset:number = 0)
    {
        this.bubble = game.add.sprite(0,0,'speech-bubble');
        this.bubble.scale.set(scale);
        this.bubble.anchor.setTo(0.5,0.5);
        this.bubble.alignTo(parentSprite,position,xOffset,yOffset);
        this.bubble.visible = true;
        this.bubble.inputEnabled = true;

        this.bubbleText = game.add.text(0,0);

        this.bubble.events.onInputUp.add(() => {
            this.bubble.visible = false;
            this.bubbleText.visible = false;
        })
    }


    addTextToBubble(text:string,fontSize:string = "16px", fontFamily:string = "sans-serif", textColor:string = "black")
    {
        this.bubbleText = game.add.text(0,0,text,{
            font: fontSize + " " + fontFamily,
            fill: textColor,
            wordWrap: true,
            wordWrapWidth: this.bubble.width - 30,
            align: "center",
            backgroundColor: "white"
        });

        this.bubbleText.anchor.set(0.5);
        this.bubbleText.alignIn(this.bubble,Phaser.CENTER,0,-20);
    }





}