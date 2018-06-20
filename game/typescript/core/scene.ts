class Scene extends Phaser.State{
    style!:object;
    startButton!:Phaser.Sprite;
    musicButton!:Phaser.Sprite;
    // mainGame:MainGame;

    constructor(){
        super();

        // this.mainGame = game;
    }
    /**
     * Method to load standard assets for setting buttons
     */
    protected loadStandardButtons():void
    {
        this.load.image("start-button","./img/start-button.png");
        this.load.image("music-button","./img/music-button.png");
    }


    /**
     * Method to create standard setting buttons
     */
    protected createStandardButtons():void
    {
        this.startButton = this.add.sprite(20,15,"start-button");
        this.startButton.scale.set(0.06,0.06);
        this.startButton.inputEnabled = true;
        this.startButton.events.onInputUp.add(() => {
            // this.game.add.sprite(x,y,bitmap);,this.game.world.centerX,this.game.world.centerY
        },this);


        this.musicButton = this.add.sprite(80,20,"music-button");
        this.musicButton.scale.set(0.05,0.05);
        this.musicButton.inputEnabled = true;
        this.musicButton.events.onInputUp.add(()=>{
            this.switchScenes('SettingScreen');
        })

    }


    /**
     *
     * @param blockObj
     * @param x
     * @param y
     * @param func
     */
    protected createClickableBlock(blockObj:any, x:number,y:number, func:any): Phaser.Sprite
    {
        let block;
        // Check if param is not a Sprite
        if(!(blockObj instanceof Phaser.Sprite)){
            // If not sprite; create new sprite and overwrite block variable
            block = this.game.add.sprite(x,y,this.createBlock(blockObj.height,blockObj.width,blockObj.color));
        }else{
            block = this.game.add.sprite(x,y,blockObj);
        }

        // anchor block
        block.anchor.setTo(0.5,0.5);

        // Enable option to add listener to block
        block.inputEnabled = true;
        block.events.onInputUp.add(() => {
            // call function
            func();
        },this);

        // return Sprite
        return block;
    }

    public createTextBlock(text:string,height:number,width:number)
    {
        let spriteText = game.add.text(0,0,text,{ font: 'bold 24px Arial', fill: "#ff346d", align: 'center',wordWrap: true, wordWrapWidth: width});
        let sprite = game.add.sprite(0,0,this.createBlock(height,width,''));
        sprite.addChild(spriteText);
        return sprite;
    }

    /**
     * Method to create a block on the screen
     * @param {number} height
     * @param {number} width
     * @param {string} color
     * @returns {Phaser.BitmapData}
     */
    public createBlock(height:number, width:number, color:string)
    {
        let bitmap = this.game.add.bitmapData(width,height);

        bitmap.ctx.beginPath();
        bitmap.ctx.rect(0,0,width,height);


        if(color !== ""){
            // console.log("test");
            bitmap.ctx.fillStyle = color;
            bitmap.ctx.fill();
        }else{
            bitmap.fill(0,0,0,0);

        }

        return bitmap;
    }



    protected loadBackgroundMusic()
    {
        game.load.audio('background-music', ['./audio/background-music.mp3']);
    }

    /**
     * Method to set font style
     * @param {{}} styling
     */
    protected setFontStyle(styling = {}):void
    {
        this.style = styling;
    }

    /**
     * Method to switch scenes
     * @param {string} sceneName
     */
    public switchScenes(sceneName:string):void
    {
        this.game.state.start(sceneName,true,false);
    }
}