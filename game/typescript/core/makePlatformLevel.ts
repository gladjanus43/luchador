class MakePlatformLevel{
    scene:Scene;
    player:Sprite;
    playerPosition:any;
    player:Sprite;
    cursors:Phaser.CursorKeys;
    jumpButton:Phaser.Key;
    facing:string = 'left';
    jumpTimer:number = 0;
    event:any;
    sayings:any[];
    collectedWords:string[] = [];
    appendedChildren:Sprite[] = [];

    islandTypes:any[] = [
        {
            name: 'island-1',
            type: 'platforms',
            scale: 0.2
        },
        {
            name: 'island-2',
            type: 'fallingPlatforms',
            scale: 0.15
        },
        {
            name: 'island-3',
            type: 'risingPlatforms',
            scale: 0.45
        }
    ];

    platforms:Phaser.Group;
    fallingPlatforms:Phaser.Group;
    risingPlatforms:Phaser.Group;
    words:Phaser.Group;
    parts:Sprite;
    positions:any[] = [];
    flag:Phaser.Sprite;
    background:string;

    constructor(scene:Scene,background:string, playerPos:any = {x:0, y:0},ledges:any,event:any)
    {
        this.scene = scene;
        this.playerPosition = playerPos;
        this.positions = ledges;
        this.event = event;
        this.background = background;

    }

    setupLevel(ground:string = 'ground')
    {
        this.sayings = MainGame.sayings;
        this.createBackground();
        this.setupRestartAndQuitButton();
        this.setupGroups();
        this.setupGround(ground);
        this.setupLedges();
        this.setupEnding();
        this.setupPlayer();
        this.setupWords();
    }


    createBackground(){
        let background = this.scene.add.tileSprite(0,0,this.scene.game.world.centerX,this.scene.game.world.centerY,this.background);
        background.scale.set(2.5,2.5);
        background.fixedToCamera = true;
    }

    setupGroups()
    {
        this.platforms = game.add.group();
        this.platforms.enableBody = true;

        this.risingPlatforms = game.add.group();
        this.risingPlatforms.enableBody = true;

        this.fallingPlatforms = game.add.group();
        this.fallingPlatforms.enableBody = true;

        this.words = game.add.group();
        this.words.enableBody = true;
    }

    setupRestartAndQuitButton()
    {
        let restart = game.add.button(20, 20, 'restart',() => {
            let e = new Event('restart_game');
            document.body.dispatchEvent(e);
        });
        restart.anchor.set(0.5);
        restart.scale.set(0.06);
        new Phasetips(this.scene.game,{
            targetObject: restart,
            context: 'Opnieuw',
            strokeColor: '#c1e5c1',
            x:restart.left - 10,
            y:restart.centerY + 20
        });


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

    setupGround(key:string)
    {
        let ground = this.platforms.create(100, 590,this.scene.createBlock(10,1600,''));
        ground.anchor.set(0.5);
        ground.body.immovable = true;
        ground.body.moves = false;

        let groundCover = game.add.sprite(ground.centerX,ground.centerY -5,key);
        groundCover.scale.setTo(2,0.2);
        groundCover.anchor.set(0.5);
    }

    setupLedges()
    {
        for(let pos of this.positions)
        {
            let island = this.getIsland(pos.key);
            let ledge = this[String(island.type)].create(pos.x, pos.y, this.scene.createBlock(10,110,''));
            ledge.anchor.set(0.5);
            ledge.body.immovable = true;
            ledge.body.moves = false;

            let cover = game.add.sprite(0,0 ,island.name);
            cover.scale.set(island.scale);
            cover.anchor.set(0.5);

            ledge.body.collideWorldBounds = true;
            ledge.addChild(cover);
        }
    }

    setupEnding()
    {
        let marker = game.add.sprite(0,0,'flag');
        let ending = this.platforms.create(750, 125, this.scene.createBlock(10,120,''));
        ending.anchor.set(0.5);
        ending.body.immovable = true;
        ending.body.moves = false;

        let island = game.add.sprite(ending.centerX,ending.centerY - 10 ,'end-platform');
        island.scale.set(0.3);
        island.anchor.set(0.5);

        marker.scale.set(0.08);
        marker.anchor.set(0.5);
        marker.alignTo(ending,Phaser.CENTER,0,0);

        this.flag = this.words.create(0,0,this.scene.createBlock(37,56,''));
        this.flag.anchor.set(0.5);
        this.flag.alignTo(marker,Phaser.CENTER,-30,-45);
        this.flag.body.gravity = 0;
        this.flag.spriteName = 'flag';
    }

    getIsland(name:string)
    {
        return this.islandTypes.find((island) => {
            return island.name == name;
        });
    }

    setupWords()
    {
        let random = Math.floor(Math.random() * this.sayings.length);
        let sentence = this.sayings[random];

        for(let word of sentence.spreekwoord.split(" ")){
            let text = game.add.text(0,0,word,{ font: 'bold 24px Arial', fill: "#ff346d", align: 'center' });
            let sprite = this.words.create(Math.floor(Math.random() * game.world.width), -400,this.scene.createBlock(50,20,''));
            sprite.addChild(text);
            sprite.body.gravity.y = 100;
            sprite.body.bounce.y = 0.5;
            sprite.body.collideWorldBounds = true;
            sprite.spriteText = word;
            sprite.spriteName = 'words';
        }
    }


    setupPlayer()
    {
        // Setup platform player
        this.player = this.scene.add.sprite(this.playerPosition.x,this.playerPosition.y, this.scene.createBlock(20,20,'#5DBCD2'));
        this.scene.game.physics.enable(this.player,Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 250;
        this.player.body.bounce.y = 0.2;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(20, 32);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.parts = this.scene.add.sprite(0,0,this.scene.createBlock(10,10,'#ffffff'));
    }

    setupPlayerControls()
    {
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -150;

            if (this.facing != 'left')
            {
                this.facing = 'left';
            }
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 150;

            if (this.facing != 'right')
            {
                this.facing = 'right';
            }
        }
        else
        {
            if (this.facing != 'idle')
            {
                if (this.facing == 'left')
                {
                    this.player.frame = 0;
                }
                else
                {
                    this.player.frame = 5;
                }

                this.facing = 'idle';
            }
        }

        if (this.jumpButton.isDown && (this.player.body.onFloor() || this.player.body.touching.down) && game.time.now > this.jumpTimer)
        {
            this.player.body.velocity.y = -250;
            this.jumpTimer = game.time.now + 750;
        }
    }

    risePlatform(player:Sprite,platform:Sprite)
    {
        console.log('rise');
        platform.body.immovable = false;
        platform.y -= 1;
    }

    dropPlatform(player:Sprite,platform:Sprite)
    {
        platform.body.immovable = false;
        platform.y += 1;
    }

    setupCollisionAndOverlaps()
    {
        game.physics.arcade.collide(this.player,this.platforms);
        game.physics.arcade.collide(this.player,this.risingPlatforms,this.risePlatform);
        game.physics.arcade.collide(this.player,this.fallingPlatforms,this.dropPlatform);
        game.physics.arcade.collide(this.words,this.platforms);
        game.physics.arcade.overlap(this.player,this.words, this.collectWords,undefined,this);
        game.physics.arcade.overlap(this.player,this.flag, this.reachedEnding,undefined,this);
    }

    update()
    {
        this.setupCollisionAndOverlaps();
        this.parts.alignIn(this.player,Phaser.CENTER,0,0);
        this.setupPlayerControls();
    }

    collectWords(player,word)
    {
        if(word.spriteText){
            this.collectedWords.push(word.spriteText);
            word.kill();
        }

    }

    reachedEnding(player,word)
    {
        if(word.spriteName !== null){
            let pop = game.add.sprite(game.world.centerX,game.world.centerY ,this.scene.createBlock(350,500,''));
            pop.anchor.set(0.5);

            let para = game.add.sprite(game.world.centerX,game.world.centerY ,this.scene.createBlock(300,600,''));
            para.anchor.set(0.5);

            let paraText = this.scene.createTextBlock('Je hebt nieuwe woorden vrijgespeeld. Deze spelen weer nieuwe spreekwoorden vrij.',400,400);
            paraText.alignIn(para,Phaser.TOP_CENTER,50,0);

            let nextBox = game.add.sprite(game.world.centerX,game.world.centerY ,this.scene.createBlock(40,80,''));
            nextBox.anchor.set(0.5);

            let nextCover = game.add.button(0,0,'arrow-button', () =>  {
                if(this.event != false){
                    let e = new Event(this.event);
                    document.body.dispatchEvent(e);
                }else{
                    this.scene.switchScenes('minigames');
                }
            });
            nextCover.anchor.set(0.5);
            nextCover.scale.set(0.2);

            nextCover.alignIn(nextBox,Phaser.CENTER,0,0);
            new Phasetips(this.scene.game,{
                targetObject: nextCover,
                context: 'Volgende level',
                strokeColor: '#c1e5c1',
                x:nextCover.left - 10,
                y:nextCover.centerY + 20
            });

            nextBox.alignIn(pop,Phaser.BOTTOM_CENTER,0,0);

        }
    }

}