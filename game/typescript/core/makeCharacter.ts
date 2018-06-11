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
    mouthCollection:Phaser.Sprite;
    tears:Phaser.Sprite;

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

        this.tears = game.add.sprite(-100,0,'tears');
        this.tears.anchor.set(0.5);

        this.mouth = game.add.sprite(0,0,'mouth-empty');
        this.mouth.anchor.setTo(0.5,0.5);
        this.mouth.scale.setTo(0.25,0.25);
        this.mouth.alignIn(this.head,Phaser.CENTER,0,76);

        this.mouthCollection = game.add.sprite(0, 0, 'mouths');
        this.mouthCollection.anchor.set(0.5);
        this.mouthCollection.scale.set(0.5);
        this.mouthCollection.alignIn(this.mouth,Phaser.CENTER,0,5);
        this.mouthCollection.frame = 8;


        this.pants = game.add.sprite(0,0,'generic-pants');
        this.pants.anchor.setTo(0.5,0.5);
        this.pants.scale.setTo(0.25,0.25);
        this.pants.alignTo(this.body,Phaser.BOTTOM_CENTER,-2,-32);

        this.shoes = game.add.sprite(0,0,'generic-shoes');
        this.shoes.anchor.setTo(0.5,0.5);
        this.shoes.scale.setTo(0.25,0.25);
        this.shoes.alignTo(this.pants,Phaser.BOTTOM_CENTER,0,-10);
    }

    cry()
    {
        this.tears.alignIn(this.head,Phaser.CENTER,0,40);
        this.tears.animations.add('cry');
        this.tears.animations.play('cry',4,true);

        this.mouthCollection.animations.add('mouth-cry',[21,22,23,43,29,40]);
        this.mouthCollection.animations.play('mouth-cry',3,false);
    }

    setupCharacterColorPicker(callback:any)
    {
        this.head.inputEnabled = true;
        this.head.events.onInputUp.add(() => callback(this.head));

        this.decoration.inputEnabled = true;
        this.decoration.events.onInputUp.add(() => callback(this.decoration));

        this.pants.inputEnabled = true;
        this.pants.events.onInputUp.add(() => callback(this.pants));

        this.shoes.inputEnabled = true;
        this.shoes.events.onInputUp.add(() => callback(this.shoes));
    }

    static changeColor(item:Sprite|Phaser.Button,color:string)
    {
        item.tint = MakeCharacter.getColorCode(color);
    }

    stopCrying()
    {
        this.tears.animations.stop('cry');
        this.tears.visible = false;

        this.mouthCollection.animations.stop('mouth-cry');
        this.mouthCollection.frame = 3;
    }

    talk()
    {
        this.mouthCollection.animations.add('mouth-talk',[14,15,16,17]);
        this.mouthCollection.animations.play('mouth-talk',5,true);
    }

    stopTalking()
    {
        this.mouthCollection.animations.stop('mouth-talk');
        this.mouthCollection.frame = 8;
    }


    getCharacterHead():Phaser.Sprite
    {
        return this.head;
    }

    changeMaskColor(color:string)
    {
        this.head.tint = MakeCharacter.getColorCode(color);
        MainGame.character.head.color = color;
    }

    changePantsColor(color:string)
    {
        this.pants.tint = MakeCharacter.getColorCode(color);
        MainGame.character.pants.color = color;
    }

    changeMouthEmotion(emotion:string)
    {
        this.mouth.loadTexture('mouth-' + emotion);
    }

    getMouthSprite()
    {
        return this.mouth;
    }

    changeMouth()
    {

    }

    setMaskDecoration(imgKey:string,xOffset:number,yOffset:number,color:string = '')
    {
        this.changeMaskDecoration(imgKey, color);
        this.decoration.alignIn(this.head,Phaser.CENTER,xOffset,yOffset);

    }

    changeMaskDecoration(imgKey:string,color:string = '')
    {
        this.decoration.loadTexture("mask-extra-" + imgKey);
        MainGame.character.head.mask = imgKey;


        if(color !== ''){
            this.decoration.tint = MakeCharacter.getColorCode(color);
            MainGame.character.head.decorationColor = color;
        }
    }

    matchCorrectColorChange(key:string, color:string)
    {
        let types ={
            mask:   (color:string) => this.changeMaskColor(color),
            extra:  (color:string) => this.changeMaskDecorationColor(color),
            pants:  (color:string) => this.changePantsColor(color),
            shoes:  (color:string) => this.changeShoesColor(color)
        };

        for(let type in types){
            if(key.includes(type)){
                types[type](color);
                break;
            }
        }
    }

    changeMaskDecorationColor(color:string)
    {
        this.decoration.tint = MakeCharacter.getColorCode(color);
        MainGame.character.head.decorationColor = color;
    }

    changeShoesColor(color:string)
    {
        this.shoes.tint = MakeCharacter.getColorCode(color);
        MainGame.character.shoes.color = color;
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

    static getColorCode(hexColor:string)
    {
        let code = hexColor.split("#");
        return Number("0x" + code[1]);
    }

    static loadCharacterAssets(scene:Scene)
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
        scene.load.image('mouth-empty',"./img/mouth-empty.png");


        // Generic clothing
        scene.load.image('generic-mask',"./img/generic-head.png");
        scene.load.image('generic-pants',"./img/generic-pants.png");
        scene.load.image('generic-shoes',"./img/shoes.png");
        scene.load.image('wrestler-body',"./img/wrestler-body.png");

        // Mask decorations
        scene.load.image('mask-extra-horn',"./img/mask-extra-horn.png");
        scene.load.image('mask-extra-star',"./img/mask-extra-star.png");
        scene.load.image('mask-extra-ex',"./img/mask-extra-ex.png");

        // Extra mouths
        scene.load.spritesheet('mouths',"./img/mouth-list.png",100,100,43);
        scene.load.spritesheet('tears',"./img/tears.png",200,200,3);
    }

}