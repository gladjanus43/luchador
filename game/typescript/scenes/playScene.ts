class PlayScene extends Scene{

    foodBoxActive:boolean = false;
    itemsConsumed:number = 0;
    foodBoxItems:Phaser.Sprite[] = [];
    maskBoxItems:any[] = [];
    powerBoxItems:any[] = [];

    preload()
    {
        MakeCharacter.loadCharacterAssets(this);

        this.load.image('food-button',"./img/food-button.png");
        this.load.image('pizza-item',"./img/pizza.png");
        this.load.image('pumpkin-item',"./img/pumpkin-pie.png");
        this.load.image('burger-item',"./img/cheeseburger.png");
        this.load.image('hot-dog-item',"./img/hot-dog.png");

        this.load.image('store-button',"./img/shopping-cart.png");
        this.load.image('game-button',"./img/game-button.png");
        this.load.image('mask-button',"./img/mask-button.png");
        this.load.image('power-up-button',"./img/power-up.png");

        this.load.image('mask_one',"./img/new-mask-1.png");
        this.load.image('mask_two',"./img/new-mask-2.png");
        this.load.image('mask_three',"./img/new-mask-3.png");
        this.load.image('fire-power-up',"./img/fire-power-up.png");
        this.load.image('money-power-up',"./img/money-power-up.png");

        this.loadBackgroundMusic();
    }

    create()
    {
        let music = game.add.audio('background-music');
        // music.volume += 1;
        music.loop = true;
        music.play();



        let character = new MakeCharacter('sad');
        character.setMaskDecoration("mask-extra-ex",0,0);
        character.changePantsColor("#2be28a");
        character.changeShoesColor("#E00707");

        let charachterOptionBox = game.add.sprite(game.world.centerX - 350, game.world.centerY ,this.createBlock(300,70,"red"));
        charachterOptionBox.anchor.setTo(0.5,0.5);

        let foodOption = game.add.button(charachterOptionBox.centerX,charachterOptionBox.centerY - 120,'food-button',() => {
            this.toggleBox(this.foodBoxItems);
        });
        foodOption.anchor.setTo(0.5,0.5);
        foodOption.scale.setTo(0.02,0.02);

        let maskOption = game.add.button(charachterOptionBox.centerX,charachterOptionBox.centerY,'mask-button',() => {
            this.toggleBox(this.maskBoxItems);
        });
        maskOption.anchor.setTo(0.5,0.5);
        maskOption.scale.setTo(0.02,0.02);

        let powerUpOption =  game.add.button(charachterOptionBox.centerX,charachterOptionBox.centerY + 120,'power-up-button',() => {
            // this.toggleFoodBox(foodOption);
        });
        powerUpOption.anchor.setTo(0.5,0.5);
        powerUpOption.scale.setTo(0.02,0.02);


        let gameOptionBox = game.add.sprite(game.world.centerX + 350, game.world.centerY - 200, this.createBlock(150,70,"red"));
        gameOptionBox.anchor.setTo(0.5,0.5);

        let storeOption = game.add.button(gameOptionBox.centerX,gameOptionBox.centerY - 40, 'store-button',() => {
            this.switchScenes('storeScene');
        });
        storeOption.anchor.setTo(0.5,0.5);
        storeOption.scale.setTo(0.020,0.020);

        let gameOption = game.add.button(gameOptionBox.centerX,gameOptionBox.centerY + 40, 'game-button',() => {
            this.switchScenes('homeScene');
        });
        gameOption.anchor.setTo(0.5,0.5);
        gameOption.scale.setTo(0.035,0.035);

        this.setUpFoodBoxAndItems(character.getCharacterHead());
        this.faceChanges(character);

        this.setupMaskBoxAndItems();
    }



    private setUpFoodBoxAndItems(head:Phaser.Sprite) {
        let foodBox = game.add.sprite(game.world.centerX, game.world.centerY -250, this.createBlock(80, 400, "red"));
        foodBox.anchor.setTo(0.5, 0.5);
        foodBox.visible = false;
        let pizza = this.createBoxItem('pizza-item',0.05,-150,foodBox,head,this.consumeFood.bind(this));
        let pumpkin = this.createBoxItem('pumpkin-item',0.1,-50,foodBox,head,this.consumeFood.bind(this));
        let burger = this.createBoxItem('burger-item',0.1,+50,foodBox,head,this.consumeFood.bind(this));
        let hotDog = this.createBoxItem('hot-dog-item',0.1,+150,foodBox,head,this.consumeFood.bind(this));
        this.foodBoxItems = [foodBox,pizza,pumpkin,burger,hotDog];
    }

    setupMaskBoxAndItems()
    {
        let maskBox = game.add.sprite(game.world.centerX, game.world.centerY -250, this.createBlock(80, 400, "red"));
        maskBox.anchor.setTo(0.5, 0.5);
        maskBox.visible = false;
        // let items = mainGame.getOwnedMasks();

        this.maskBoxItems.push(maskBox);

        // for(let item of items){
        //     // let sprite = item.getButtonObject();
        //
        //     // sprite.alignIn(maskBox,Phaser.CENTER,maskBox.width / items.length,0);
        //     // sprite.scale.x *= -1;
        //     // sprite.inputEnabled = true;
        //     // sprite.visible = false;
        //     // // sprite.input.enableDrag(true);
        //     // // this.addActionOnCollision(sprite, collisionTarget,callback);
        //     // this.maskBoxItems.push(sprite);
        // }

    }

    toggleBox(items:Phaser.Sprite[]){
        for(let item of items){
            console.log(item.visible);
            item.visible = !item.visible;
        }
    }

    createBoxItem(imgKey:string,scale:number, xOffset:number,box:Phaser.Sprite,collisionTarget:Phaser.Sprite,callback:any):Phaser.Sprite
    {
        let item = game.add.sprite(0, 0, imgKey);
        item.scale.set(scale);
        item.anchor.setTo(0.5, 0.5);
        item.alignIn(box,Phaser.CENTER,xOffset,0);
        item.scale.x *= -1;
        item.inputEnabled = true;
        item.visible = false;
        item.input.enableDrag(true);
        this.addActionOnCollision(item, collisionTarget,callback);

        return item;
    }

    faceChanges(character:MakeCharacter)
    {
        window.addEventListener('imfull',() => {
            character.changeMaskColor("#ff8082");
        });
    }


    addActionOnCollision(item:any, overlapItem:any, callback:any)
    {
        console.log("colision:",item);
        item.events.onDragStop.add(()=> {
            if(Phaser.Rectangle.intersects(overlapItem.getBounds(),item.getBounds())){
                callback(item);
            }
        });
    }

    private consumeFood(item: any) {
        let startX = item.centerX;
        let startY = item.centerY;

        if (this.itemsConsumed < 2) {
            this.itemsConsumed++;
            item.visible = false;
        } else {
            window.dispatchEvent(new Event('imfull'));
            item.x = startX;
            item.y = startY;
        }
    }
}