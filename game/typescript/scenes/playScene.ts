class PlayScene extends Scene {

    foodBoxActive: boolean = false;
    itemsConsumed: number = 0;
    foodBoxItems: Phaser.Sprite[] = [];
    maskBoxItems: any[] = [];
    powerBoxItems: any[] = [];
    character: MakeCharacter;
    allBoxesAndContent: any[] = [];
    colors: object = {
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "aqua": "#00ffff",
        "aquamarine": "#7fffd4",
        "azure": "#f0ffff",
        "beige": "#f5f5dc",
        "bisque": "#ffe4c4",
        "black": "#000000",
        "blanchedalmond": "#ffebcd",
        "blue": "#0000ff",
        "blueviolet": "#8a2be2",
        "brown": "#a52a2a",
        "burlywood": "#deb887",
        "cadetblue": "#5f9ea0",
        "chartreuse": "#7fff00",
        "chocolate": "#d2691e",
        "coral": "#ff7f50",
        "cornflowerblue": "#6495ed",
        "cornsilk": "#fff8dc",
        "crimson": "#dc143c",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9",
        "darkgreen": "#006400",
        "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b",
        "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00",
        "darkorchid": "#9932cc",
        "darkred": "#8b0000",
        "darksalmon": "#e9967a",
        "darkseagreen": "#8fbc8f",
        "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f",
        "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3",
        "deeppink": "#ff1493",
        "deepskyblue": "#00bfff",
        "dimgray": "#696969",
        "dodgerblue": "#1e90ff",
        "firebrick": "#b22222",
        "floralwhite": "#fffaf0",
        "forestgreen": "#228b22",
        "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc",
        "ghostwhite": "#f8f8ff",
        "gold": "#ffd700",
        "goldenrod": "#daa520",
        "gray": "#808080",
        "green": "#008000",
        "greenyellow": "#adff2f",
        "honeydew": "#f0fff0",
        "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c",
        "indigo": "#4b0082",
        "ivory": "#fffff0",
        "khaki": "#f0e68c",
        "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5",
        "lawngreen": "#7cfc00",
        "lemonchiffon": "#fffacd",
        "lightblue": "#add8e6",
        "lightcoral": "#f08080",
        "lightcyan": "#e0ffff",
        "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3",
        "lightgreen": "#90ee90",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa",
        "lightskyblue": "#87cefa",
        "lightslategray": "#778899",
        "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0",
        "lime": "#00ff00",
        "limegreen": "#32cd32",
        "linen": "#faf0e6",
        "magenta": "#ff00ff",
        "maroon": "#800000",
        "mediumaquamarine": "#66cdaa",
        "mediumblue": "#0000cd",
        "mediumorchid": "#ba55d3",
        "mediumpurple": "#9370d8",
        "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a",
        "mediumturquoise": "#48d1cc",
        "mediumvioletred": "#c71585",
        "midnightblue": "#191970",
        "mintcream": "#f5fffa",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "navy": "#000080",
        "oldlace": "#fdf5e6",
        "olive": "#808000",
        "olivedrab": "#6b8e23",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98",
        "paleturquoise": "#afeeee",
        "palevioletred": "#d87093",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "peru": "#cd853f",
        "pink": "#ffc0cb",
        "plum": "#dda0dd",
        "powderblue": "#b0e0e6",
        "purple": "#800080",
        "rebeccapurple": "#663399",
        "red": "#ff0000",
        "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1",
        "saddlebrown": "#8b4513",
        "salmon": "#fa8072",
        "sandybrown": "#f4a460",
        "seagreen": "#2e8b57",
        "seashell": "#fff5ee",
        "sienna": "#a0522d",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "slateblue": "#6a5acd",
        "slategray": "#708090",
        "snow": "#fffafa",
        "springgreen": "#00ff7f",
        "steelblue": "#4682b4",
        "tan": "#d2b48c",
        "teal": "#008080",
        "thistle": "#d8bfd8",
        "tomato": "#ff6347",
        "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3",
        "white": "#ffffff",
        "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00",
        "yellowgreen": "#9acd32"
    };

    preload() {
        MakeCharacter.loadCharacterAssets(this);

        this.load.image('food-button', "./img/food-button.png");
        this.load.image('pizza-item', "./img/pizza.png");
        this.load.image('pumpkin-item', "./img/pumpkin-pie.png");
        this.load.image('burger-item', "./img/cheeseburger.png");
        this.load.image('hot-dog-item', "./img/hot-dog.png");

        this.load.image('store-button', "./img/shopping-cart.png");
        this.load.image('game-button', "./img/game-button.png");
        this.load.image('mask-button', "./img/mask-button.png");
        this.load.image('power-up-button', "./img/power-up.png");

        this.load.image('horn', "./img/new-mask-1.png");
        this.load.image('ex', "./img/new-mask-2.png");
        this.load.image('star', "./img/new-mask-3.png");
        this.load.image('fire-power-up', "./img/fire-power-up.png");
        this.load.image('money-power-up', "./img/money-power-up.png");

        this.loadBackgroundMusic();
    }

    create() {
        // let music = game.add.audio('background-music');
        // // music.volume += 1;
        // music.loop = true;
        // music.play();


        console.log(MainGame.character);

        this.character = new MakeCharacter('sad');
        this.character.changeMaskColor(MainGame.character.head.color);
        this.character.setMaskDecoration(MainGame.character.head.mask, 0, 0);
        this.character.changeMaskDecorationColor(MainGame.character.head.decorationColor);
        this.character.changePantsColor(MainGame.character.pants.color);
        this.character.changeShoesColor(MainGame.character.shoes.color);

        this.character.setupCharacterColorPicker((sprite: Sprite | Button) => this.colorPicker(sprite));

        setTimeout(() => {
            let bubble = new SpeechBubble(this.character.getCharacterHead(), 0.1, Phaser.RIGHT_CENTER);
            bubble.addTextToBubble("Ik heb honger!", "22px");
        }, 1000);

        let charachterOptionBox = game.add.sprite(game.world.centerX - 350, game.world.centerY, this.createBlock(300, 70, "red"));
        charachterOptionBox.anchor.setTo(0.5, 0.5);

        let foodOption = game.add.button(charachterOptionBox.centerX, charachterOptionBox.centerY - 120, 'food-button', () => {
            this.toggleBox(this.foodBoxItems);
        });
        foodOption.anchor.setTo(0.5, 0.5);
        foodOption.scale.setTo(0.02, 0.02);

        let maskOption = game.add.button(charachterOptionBox.centerX, charachterOptionBox.centerY, 'mask-button', () => {
            this.toggleBox(this.maskBoxItems);
        });
        maskOption.anchor.setTo(0.5, 0.5);
        maskOption.scale.setTo(0.02, 0.02);

        let powerUpOption = game.add.button(charachterOptionBox.centerX, charachterOptionBox.centerY + 120, 'power-up-button', () => {
            this.toggleBox(this.powerBoxItems);
        });
        powerUpOption.anchor.setTo(0.5, 0.5);
        powerUpOption.scale.setTo(0.02, 0.02);


        let gameOptionBox = game.add.sprite(game.world.centerX + 350, game.world.centerY - 200, this.createBlock(150, 70, "red"));
        gameOptionBox.anchor.setTo(0.5, 0.5);

        let storeOption = game.add.button(gameOptionBox.centerX, gameOptionBox.centerY - 40, 'store-button', () => {
            this.switchScenes('storeScene');
        });
        storeOption.anchor.setTo(0.5, 0.5);
        storeOption.scale.setTo(0.020, 0.020);

        let gameOption = game.add.button(gameOptionBox.centerX, gameOptionBox.centerY + 40, 'game-button', () => {
            this.switchScenes('homeScene');
        });
        gameOption.anchor.setTo(0.5, 0.5);
        gameOption.scale.setTo(0.035, 0.035);

        this.setUpFoodBoxAndItems(this.character.getMouthSprite());
        this.setupMaskBoxAndItems();
        this.setupPowerBoxAndItems();

        this.faceChanges(this.character);

    }


    private colorPicker(item: Sprite | Button) {

        let colorBox = game.add.sprite(game.world.centerX , game.world.centerY + 270 , this.createBlock(80, 400, "red"));
        colorBox.anchor.set(0.5);
        // colorBox.visible = false;

        let i = 0;
        let j = 0;
        let start = 0;

        for(let color in this.colors){
            if(i != 0 && i % 33 == 0)
            {
                j++;
                start = 0;
            }

            let colorBlock = game.add.sprite(colorBox.left + 8 + start * 12,colorBox.top + 10 + 12 * j,this.createBlock(10,10,String(this.colors[color])));
            colorBlock.anchor.set(0.5);
            colorBlock.inputEnabled = true;
            colorBlock.events.onInputUp.add(() => {

                let key = String(item.key);
                if(key.includes('extra')){
                    key = 'extra';
                }
                this.character.matchCorrectColorChange(key, this.colors[color]);
            });

            start++;
            i++;
        }
    }


    private setUpFoodBoxAndItems(head: Phaser.Sprite) {
        let foodBox = game.add.sprite(game.world.centerX, game.world.centerY - 250, this.createBlock(80, 400, "red"));
        foodBox.anchor.setTo(0.5, 0.5);
        foodBox.visible = false;
        let pizza = this.createBoxItem('pizza-item', 0.05, -150, foodBox, head, "consumeFood");
        let pumpkin = this.createBoxItem('pumpkin-item', 0.1, -50, foodBox, head, "consumeFood");
        let burger = this.createBoxItem('burger-item', 0.1, +50, foodBox, head, "consumeFood");
        let hotDog = this.createBoxItem('hot-dog-item', 0.1, +150, foodBox, head, "consumeFood");
        this.foodBoxItems = [foodBox, pizza, pumpkin, burger, hotDog];

        this.allBoxesAndContent = this.checkforUniqueValues(this.allBoxesAndContent.concat(this.foodBoxItems));

    }


    setupMaskBoxAndItems() {
        let maskBox = game.add.sprite(game.world.centerX, game.world.centerY - 250, this.createBlock(80, 400, "red"));
        maskBox.anchor.setTo(0.5, 0.5);
        maskBox.visible = false;
        let items = mainGame.getOwnedMasks();

        let i = 0;

        for (let item of items) {

            let sprite = game.add.sprite((maskBox.x - 160) + (i * 90), maskBox.y, item.getButtonObject().key);
            sprite.scale.set(0.035);
            sprite.anchor.set(0.5);
            sprite.visible = false;
            sprite.inputEnabled = true;
            sprite.input.enableDrag(true);

            this.addActionOnCollision(sprite, this.character.getCharacterHead(), () => {
                let points = sprite.input.dragStartPoint;
                this.character.changeMaskDecoration(String(sprite.key));
                sprite.x = points.x;
                sprite.y = points.y;
            });

            if (!this.checkifArrayContainsItem(sprite, this.maskBoxItems)) {
                this.maskBoxItems.push(sprite);
                i++;
            }

        }

        if (!this.checkifArrayContainsItem(maskBox, this.maskBoxItems)) {
            this.maskBoxItems.push(maskBox);
        }

        this.allBoxesAndContent = this.checkforUniqueValues(this.allBoxesAndContent.concat(this.maskBoxItems));
    }


    checkforUniqueValues(array: any) {
        for (let i = 0; i < array.length; ++i) {
            for (let j = i + 1; j < array.length; ++j) {
                if (array[i] === array[j])
                    array.splice(j--, 1);
            }
        }

        return array;
    }

    setupPowerBoxAndItems() {
        let powerBox = game.add.sprite(game.world.centerX, game.world.centerY - 250, this.createBlock(80, 400, "red"));
        powerBox.anchor.set(0.5);
        powerBox.visible = false;
        let items = mainGame.getOwnedPowers();

        let i = 0;

        for (let item of items) {
            let sprite = this.createBoxItem(String(item.getButtonObject().key), 0.030, -160 + (i * 90), powerBox, this.character.getCharacterHead(), () => {
                console.log("Works");
            });
            if (!this.checkifArrayContainsItem(sprite, this.powerBoxItems)) {
                this.powerBoxItems.push(sprite);
                i++;
            }
        }

        if (!this.checkifArrayContainsItem(powerBox, this.powerBoxItems)) {
            this.powerBoxItems.push(powerBox);
        }
        this.allBoxesAndContent = this.checkforUniqueValues(this.allBoxesAndContent.concat(this.powerBoxItems));
    }

    checkifArrayContainsItem(item: any, array: any) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === item) {
                return true;
            }
        }
        return false;
    }


    toggleBox(items: Phaser.Sprite[]) {
        console.log(items);
        let check = items[0].visible;
        for (let target of this.allBoxesAndContent) {
            target.visible = false;
        }

        for (let item of items) {
            if (!check) {
                item.visible = true;
            }
        }
    }

    createBoxItem(imgKey: string, scale: number, xOffset: number, box: Phaser.Sprite, collisionTarget: Phaser.Sprite, callback: any): Phaser.Sprite {
        let item = game.add.sprite(0, 0, imgKey);
        item.scale.set(scale);
        item.anchor.setTo(0.5, 0.5);
        item.alignIn(box, Phaser.CENTER, xOffset, 0);
        item.scale.x *= -1;
        item.inputEnabled = true;
        item.visible = false;
        item.input.enableDrag(true);
        this.addActionOnCollision(item, collisionTarget, callback);

        return item;
    }

    faceChanges(character: MakeCharacter) {
        window.addEventListener('imfull', () => {
            character.changeMaskColor("#ff0000");
            character.changeMouthEmotion('smile');
            character.changeSingleEye('left', 'smile');
            character.changeSingleEye('right', 'smile');

            let bubble = new SpeechBubble(character.getCharacterHead(), 0.1, Phaser.RIGHT_CENTER);
            bubble.addTextToBubble("Ik ben vol", "22px");
        });
    }


    addActionOnCollision(item: any, overlapItem: any, callback: any) {

        item.events.onDragStop.add(() => {
            if (Phaser.Rectangle.intersects(overlapItem.getBounds(), item.getBounds())) {
                if (typeof callback == "string") {
                    this[String(callback)](item);
                }
                else {
                    callback(item);
                }
            }
        });
    }

    public addPower(item: any) {

    }

    public consumeFood(item: any) {
        let points = item.input.dragStartPoint;
        if (this.itemsConsumed < 2) {

            this.character.talk();

            setTimeout(() => {
                item.destroy();
                this.character.stopTalking();
            }, 1500);


            this.itemsConsumed++;
        } else {
            item.x = points.x;
            item.y = points.y;
            window.dispatchEvent(new Event('imfull'));

        }


    }
}