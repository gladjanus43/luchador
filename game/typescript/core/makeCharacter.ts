class MakeCharacter{

    body:Phaser.Sprite;
    head:Phaser.Sprite;
    leftEye:Phaser.Sprite;
    rightEye:Phaser.Sprite;
    mouth:Phaser.Sprite;
    pants:Phaser.Sprite;
    decoration:Phaser.Sprite;
    shoes:Phaser.Sprite;
    emotion:string;

    constructor(emotion:string)
    {
        this.emotion = emotion;

        this.body = game.add.sprite(game.world.centerX,game.world.centerY + 100,'wrestler-body');
        this.body.anchor.setTo(0.5,0.5);
        this.body.scale.setTo(0.25,0.25);
        this.body.inputEnabled = true;

        this.head = game.add.sprite(0,0,'generic-mask');
        this.head.anchor.setTo(0.5,0.5);
        this.head.scale.setTo(0.25,0.25);
        this.head.alignTo(this.body,Phaser.TOP_CENTER,0,-20);
        this.head.tint = 0x1BC500;

        this.decoration = game.add.sprite(0,0);
        this.decoration.anchor.setTo(0.5,0.5);
        this.decoration.scale.setTo(0.25,0.25);

        this.leftEye = game.add.sprite(0,0,'left-'+ this.emotion +'-blue');
        this.leftEye.anchor.setTo(0.5,0.5);
        this.leftEye.scale.setTo(0.25,0.25);
        this.leftEye.alignIn(this.head,Phaser.CENTER,-50,20);

        this.rightEye = game.add.sprite(0,0,'right-'+ this.emotion +'-blue');
        this.rightEye.anchor.setTo(0.5,0.5);
        this.rightEye.scale.setTo(0.25,0.25);
        this.rightEye.alignIn(this.head,Phaser.CENTER,50,20);

        this.mouth = game.add.sprite(0,0,'mouth-' + this.emotion);
        this.mouth.anchor.setTo(0.5,0.5);
        this.mouth.scale.setTo(0.25,0.25);
        this.mouth.alignIn(this.head,Phaser.CENTER,0,76);

        this.pants = game.add.sprite(0,0,'generic-pants');
        this.pants.anchor.setTo(0.5,0.5);
        this.pants.scale.setTo(0.25,0.25);
        this.pants.alignTo(this.body,Phaser.BOTTOM_CENTER,-2,-32);

        this.shoes = game.add.sprite(0,0,'generic-shoes');
        this.shoes.anchor.setTo(0.5,0.5);
        this.shoes.scale.setTo(0.25,0.25);
        this.shoes.alignTo(this.pants,Phaser.BOTTOM_CENTER,0,-10);
    }

    getCharacterHead():Phaser.Sprite
    {
        return this.head;
    }

    changeMaskColor(color:string)
    {
        this.head.tint = this.getColorCode(color);
    }

    changePantsColor(color:string)
    {
        this.pants.tint = this.getColorCode(color);
    }

    setMaskDecoration(imgKey:string,xOffset:number,yOffset:number,color:string = '')
    {
        this.changeMaskDecoration(imgKey, color);
        this.decoration.alignIn(this.head,Phaser.CENTER,xOffset,yOffset);

    }

    changeMaskDecoration(imgKey:string,color:string = '')
    {
        this.decoration.loadTexture(imgKey);
        if(color !== ''){
            this.decoration.tint = this.getColorCode(color);
        }
    }

    changeMaskDecorationColor(color:string)
    {
        this.decoration.tint = this.getColorCode(color);
    }

    changeShoesColor(color:string)
    {
        this.shoes.tint = this.getColorCode(color);
    }

    switchEyeColor(color:string)
    {
        this.leftEye.loadTexture('left-'+ this.emotion + '-' + color);
    }

    changeSingleEye(eye:string,emotion:string,color:string = 'blue')
    {
        if(eye === 'left'){
            this.leftEye.loadTexture('left-'+emotion+'-'+color);
        }else{
            this.rightEye.loadTexture('right-'+emotion+'-'+color);
        }
    }

    getColorCode(hexColor:string)
    {
        let code = hexColor.split("#");
        return Number("0x" + code[1]);
    }

    static loadCharacterAssets(scene:Phaser.State)
    {
        // Blue Eyes; left and right; devious, sad, happy
        // Devious
        scene.load.image('left-devious-blue',"./img/left-devious-eye-blue.png");
        scene.load.image('right-devious-blue',"./img/right-devious-eye-blue.png");

        // Sad
        scene.load.image('left-sad-blue',"./img/left-sad-eye-blue.png");
        scene.load.image('right-sad-blue',"./img/right-sad-eye-blue.png");

        // Smile
        scene.load.image('left-smile-blue',"./img/left-smile-eye-blue.png");
        scene.load.image('right-smile-blue',"./img/right-smile-eye-blue.png");


        // White Eyes; left and right; devious, sad, happy
        // Devious
        scene.load.image('left-devious-white',"./img/left-devious-eye-white.png");
        scene.load.image('right-devious-white',"./img/right-devious-eye-white.png");

        // Sad
        scene.load.image('left-sad-white',"./img/left-sad-eye-white.png");
        scene.load.image('right-sad-white',"./img/right-sad-eye-white.png");

        // Smile
        scene.load.image('left-smile-white',"./img/left-smile-eye-white.png");
        scene.load.image('right-smile-white',"./img/right-smile-eye-white.png");

        // Mouth
        scene.load.image('mouth-devious',"./img/mouth-devious.png");
        scene.load.image('mouth-sad',"./img/mouth-sad.png");
        scene.load.image('mouth-smile',"./img/mouth-smile.png");


        // Generic clothing
        scene.load.image('generic-mask',"./img/generic-head.png");
        scene.load.image('generic-pants',"./img/generic-pants.png");
        scene.load.image('generic-shoes',"./img/shoes.png");
        scene.load.image('wrestler-body',"./img/wrestler-body.png");

        // Mask decorations
        scene.load.image('mask-extra-horn',"./img/mask-extra-horn.png");
        scene.load.image('mask-extra-star',"./img/mask-extra-star.png");
        scene.load.image('mask-extra-ex',"./img/mask-extra-ex.png");
    }




}