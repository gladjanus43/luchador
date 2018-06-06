"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
var homeScene;
var playScene;
var settingScene;
var storeScene;
var gameScene;
var mainGame;
var MainGame = (function () {
    function MainGame() {
        this.playerMoney = 10000;
        homeScene = new HomeScene();
        playScene = new PlayScene();
        settingScene = new SettingScene();
        storeScene = new StoreScene();
        gameScene = new GameScene();
        game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }
    MainGame.prototype.getOwnedMasks = function () {
        return MainGame.ownedMasks;
    };
    MainGame.prototype.buyMask = function (mask) {
        MainGame.ownedMasks.push(mask);
    };
    MainGame.prototype.getOwnedPowers = function () {
        return MainGame.ownedPowers;
    };
    MainGame.prototype.buyPower = function (power) {
        MainGame.ownedPowers.push(power);
    };
    MainGame.prototype.getPlayerMoney = function () {
        return this.playerMoney;
    };
    MainGame.prototype.setPlayerMoney = function (money) {
        if (this.getPlayerMoney() >= 0) {
            this.playerMoney = money;
        }
    };
    MainGame.prototype.preload = function () {
        game.load.image('speech-bubble', "./img/speech-bubble.png");
        game.load.image('arrow-button', "./img/arrow-button.png");
        game.load.image('mask-button', "./img/mask-button.png");
        game.load.image('store-button', "./img/store-button.png");
        game.load.image('power-button', "./img/power-button.png");
        game.load.image('power-up-button', "./img/power-up.png");
        game.load.image('mask_one', "./img/new-mask-1.png");
        game.load.image('mask_two', "./img/new-mask-2.png");
        game.load.image('mask_three', "./img/new-mask-3.png");
        game.load.image('fire-power-up', "./img/fire-power-up.png");
        game.load.image('money-power-up', "./img/money-power-up.png");
    };
    MainGame.prototype.create = function () {
        game.state.add('homeScene', homeScene);
        game.state.add('gameScene', gameScene);
        game.state.add('playScene', PlayScene);
        game.state.add('settingScene', SettingScene);
        game.state.add('storeScene', StoreScene);
        game.state.start('playScene');
    };
    MainGame.prototype.update = function () {
    };
    MainGame.ownedMasks = [];
    MainGame.ownedPowers = [];
    MainGame.character = {
        head: {
            color: "#00b0e7",
            mask: "ex",
            mouth: 4,
            decorationColor: "#C8AAD0"
        },
        pants: {
            color: "#00385d",
        },
        shoes: {
            color: "#004bbc"
        }
    };
    return MainGame;
}());
window.onload = function () {
    mainGame = new MainGame();
};
var Spreekwoord = (function () {
    function Spreekwoord(x, y) {
        this.posX = x;
        this.posY = y;
        this.sayings = [];
        this.element = document.createElement("bubble");
        this.button = document.createElement("button");
        this.loadSayings();
    }
    Spreekwoord.prototype.loadSayings = function () {
        var _this = this;
        fetch("http://luchador.local/connection.php")
            .then(function (res) { return res.json(); })
            .then(function (res) { return _this.pushSayings(res); });
    };
    Spreekwoord.prototype.pushSayings = function (dbResults) {
        var _this = this;
        console.log("klaar met laden");
        dbResults.forEach(function (saying) {
            _this.sayings.push(saying);
        });
        this.createBubble();
    };
    Spreekwoord.prototype.createBubble = function () {
        var bubble = document.getElementById('content');
        bubble.appendChild(this.element);
        this.element.style.left = this.posX + "px";
        this.element.style.top = this.posY + "px";
        this.element.innerHTML = "test";
        this.element.appendChild(this.button);
        this.button.innerHTML = "Volgende Gezegde";
        this.button.addEventListener('click', this.clickSuccesHandler);
    };
    Spreekwoord.prototype.clickSuccesHandler = function () {
        console.log('Je hebt het goed geraden!');
    };
    return Spreekwoord;
}());
var Icon = (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Icon;
}(Phaser.Button));
var MakeCharacter = (function () {
    function MakeCharacter(emotion) {
        this.emotion = emotion;
        this.body = game.add.sprite(game.world.centerX, game.world.centerY + 100, 'wrestler-body');
        this.body.anchor.setTo(0.5, 0.5);
        this.body.scale.setTo(0.25, 0.25);
        this.body.inputEnabled = true;
        this.head = game.add.sprite(0, 0, 'generic-mask');
        this.head.anchor.setTo(0.5, 0.5);
        this.head.scale.setTo(0.25, 0.25);
        this.head.alignTo(this.body, Phaser.TOP_CENTER, 0, -20);
        this.head.tint = 0x1BC500;
        this.decoration = game.add.sprite(0, 0);
        this.decoration.anchor.setTo(0.5, 0.5);
        this.decoration.scale.setTo(0.25, 0.25);
        this.leftEye = game.add.sprite(0, 0, 'left-' + this.emotion + '-blue');
        this.leftEye.anchor.setTo(0.5, 0.5);
        this.leftEye.scale.setTo(0.25, 0.25);
        this.leftEye.alignIn(this.head, Phaser.CENTER, -50, 20);
        this.rightEye = game.add.sprite(0, 0, 'right-' + this.emotion + '-blue');
        this.rightEye.anchor.setTo(0.5, 0.5);
        this.rightEye.scale.setTo(0.25, 0.25);
        this.rightEye.alignIn(this.head, Phaser.CENTER, 50, 20);
        this.tears = game.add.sprite(-100, 0, 'tears');
        this.tears.anchor.set(0.5);
        this.mouth = game.add.sprite(0, 0, 'mouth-empty');
        this.mouth.anchor.setTo(0.5, 0.5);
        this.mouth.scale.setTo(0.25, 0.25);
        this.mouth.alignIn(this.head, Phaser.CENTER, 0, 76);
        this.mouthCollection = game.add.sprite(0, 0, 'mouths');
        this.mouthCollection.anchor.set(0.5);
        this.mouthCollection.scale.set(0.5);
        this.mouthCollection.alignIn(this.mouth, Phaser.CENTER, 0, 5);
        this.mouthCollection.frame = 8;
        this.pants = game.add.sprite(0, 0, 'generic-pants');
        this.pants.anchor.setTo(0.5, 0.5);
        this.pants.scale.setTo(0.25, 0.25);
        this.pants.alignTo(this.body, Phaser.BOTTOM_CENTER, -2, -32);
        this.shoes = game.add.sprite(0, 0, 'generic-shoes');
        this.shoes.anchor.setTo(0.5, 0.5);
        this.shoes.scale.setTo(0.25, 0.25);
        this.shoes.alignTo(this.pants, Phaser.BOTTOM_CENTER, 0, -10);
    }
    MakeCharacter.prototype.cry = function () {
        this.tears.alignIn(this.head, Phaser.CENTER, 0, 40);
        this.tears.animations.add('cry');
        this.tears.animations.play('cry', 4, true);
        this.mouthCollection.animations.add('mouth-cry', [21, 22, 23, 43, 29, 40]);
        this.mouthCollection.animations.play('mouth-cry', 3, false);
    };
    MakeCharacter.prototype.setupCharacterColorPicker = function (callback) {
        var _this = this;
        this.head.inputEnabled = true;
        this.head.events.onInputUp.add(function () { return callback(_this.head); });
        this.decoration.inputEnabled = true;
        this.decoration.events.onInputUp.add(function () { return callback(_this.decoration); });
        this.pants.inputEnabled = true;
        this.pants.events.onInputUp.add(function () { return callback(_this.pants); });
        this.shoes.inputEnabled = true;
        this.shoes.events.onInputUp.add(function () { return callback(_this.shoes); });
    };
    MakeCharacter.changeColor = function (item, color) {
        item.tint = MakeCharacter.getColorCode(color);
    };
    MakeCharacter.prototype.stopCrying = function () {
        this.tears.animations.stop('cry');
        this.tears.visible = false;
        this.mouthCollection.animations.stop('mouth-cry');
        this.mouthCollection.frame = 3;
    };
    MakeCharacter.prototype.talk = function () {
        this.mouthCollection.animations.add('mouth-talk', [14, 15, 16, 17]);
        this.mouthCollection.animations.play('mouth-talk', 5, true);
    };
    MakeCharacter.prototype.stopTalking = function () {
        this.mouthCollection.animations.stop('mouth-talk');
        this.mouthCollection.frame = 8;
    };
    MakeCharacter.prototype.getCharacterHead = function () {
        return this.head;
    };
    MakeCharacter.prototype.changeMaskColor = function (color) {
        this.head.tint = MakeCharacter.getColorCode(color);
    };
    MakeCharacter.prototype.changePantsColor = function (color) {
        this.pants.tint = MakeCharacter.getColorCode(color);
    };
    MakeCharacter.prototype.changeMouthEmotion = function (emotion) {
        this.mouth.loadTexture('mouth-' + emotion);
    };
    MakeCharacter.prototype.getMouthSprite = function () {
        return this.mouth;
    };
    MakeCharacter.prototype.changeMouth = function () {
    };
    MakeCharacter.prototype.setMaskDecoration = function (imgKey, xOffset, yOffset, color) {
        if (color === void 0) { color = ''; }
        this.changeMaskDecoration(imgKey, color);
        this.decoration.alignIn(this.head, Phaser.CENTER, xOffset, yOffset);
    };
    MakeCharacter.prototype.changeMaskDecoration = function (imgKey, color) {
        if (color === void 0) { color = ''; }
        this.decoration.loadTexture("mask-extra-" + imgKey);
        if (color !== '') {
            this.decoration.tint = MakeCharacter.getColorCode(color);
        }
    };
    MakeCharacter.prototype.changeMaskDecorationColor = function (color) {
        this.decoration.tint = MakeCharacter.getColorCode(color);
    };
    MakeCharacter.prototype.changeShoesColor = function (color) {
        this.shoes.tint = MakeCharacter.getColorCode(color);
    };
    MakeCharacter.prototype.switchEyeColor = function (color) {
        this.leftEye.loadTexture('left-' + this.emotion + '-' + color);
    };
    MakeCharacter.prototype.changeSingleEye = function (eye, emotion, color) {
        if (color === void 0) { color = 'blue'; }
        if (eye === 'left') {
            this.leftEye.loadTexture('left-' + emotion + '-' + color);
        }
        else {
            this.rightEye.loadTexture('right-' + emotion + '-' + color);
        }
    };
    MakeCharacter.getColorCode = function (hexColor) {
        var code = hexColor.split("#");
        return Number("0x" + code[1]);
    };
    MakeCharacter.loadCharacterAssets = function (scene) {
        scene.load.image('left-devious-blue', "./img/left-devious-eye-blue.png");
        scene.load.image('right-devious-blue', "./img/right-devious-eye-blue.png");
        scene.load.image('left-sad-blue', "./img/left-sad-eye-blue.png");
        scene.load.image('right-sad-blue', "./img/right-sad-eye-blue.png");
        scene.load.image('left-smile-blue', "./img/left-smile-eye-blue.png");
        scene.load.image('right-smile-blue', "./img/right-smile-eye-blue.png");
        scene.load.image('left-devious-white', "./img/left-devious-eye-white.png");
        scene.load.image('right-devious-white', "./img/right-devious-eye-white.png");
        scene.load.image('left-sad-white', "./img/left-sad-eye-white.png");
        scene.load.image('right-sad-white', "./img/right-sad-eye-white.png");
        scene.load.image('left-smile-white', "./img/left-smile-eye-white.png");
        scene.load.image('right-smile-white', "./img/right-smile-eye-white.png");
        scene.load.image('mouth-devious', "./img/mouth-devious.png");
        scene.load.image('mouth-sad', "./img/mouth-sad.png");
        scene.load.image('mouth-smile', "./img/mouth-smile.png");
        scene.load.image('mouth-empty', "./img/mouth-empty.png");
        scene.load.image('generic-mask', "./img/generic-head.png");
        scene.load.image('generic-pants', "./img/generic-pants.png");
        scene.load.image('generic-shoes', "./img/shoes.png");
        scene.load.image('wrestler-body', "./img/wrestler-body.png");
        scene.load.image('mask-extra-horn', "./img/mask-extra-horn.png");
        scene.load.image('mask-extra-star', "./img/mask-extra-star.png");
        scene.load.image('mask-extra-ex', "./img/mask-extra-ex.png");
        scene.load.spritesheet('mouths', "./img/mouth-list.png", 100, 100, 43);
        scene.load.spritesheet('tears', "./img/tears.png", 200, 200, 3);
    };
    return MakeCharacter;
}());
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super.call(this) || this;
    }
    Scene.prototype.loadStandardButtons = function () {
        this.load.image("start-button", "./images/start-button.png");
        this.load.image("music-button", "./images/music-button.png");
    };
    Scene.prototype.createStandardButtons = function () {
        var _this = this;
        this.startButton = this.add.sprite(20, 15, "start-button");
        this.startButton.scale.set(0.06, 0.06);
        this.startButton.inputEnabled = true;
        this.startButton.events.onInputUp.add(function () {
        }, this);
        this.musicButton = this.add.sprite(80, 20, "music-button");
        this.musicButton.scale.set(0.05, 0.05);
        this.musicButton.inputEnabled = true;
        this.musicButton.events.onInputUp.add(function () {
            _this.switchScenes('SettingScreen');
        });
    };
    Scene.prototype.createClickableBlock = function (blockObj, x, y, func) {
        var block;
        if (!(blockObj instanceof Phaser.Sprite)) {
            block = this.game.add.sprite(x, y, this.createBlock(blockObj.height, blockObj.width, blockObj.color));
        }
        else {
            block = this.game.add.sprite(x, y, blockObj);
        }
        block.anchor.setTo(0.5, 0.5);
        block.inputEnabled = true;
        block.events.onInputUp.add(function () {
            func();
        }, this);
        return block;
    };
    Scene.prototype.createBlock = function (height, width, color) {
        var bitmap = this.game.add.bitmapData(width, height);
        bitmap.ctx.beginPath();
        bitmap.ctx.rect(0, 0, width, height);
        bitmap.ctx.fillStyle = color;
        bitmap.ctx.fill();
        return bitmap;
    };
    Scene.prototype.loadBackgroundMusic = function () {
        game.load.audio('background-music', ['./audio/background-music.mp3']);
    };
    Scene.prototype.setFontStyle = function (styling) {
        if (styling === void 0) { styling = {}; }
        this.style = styling;
    };
    Scene.prototype.switchScenes = function (sceneName) {
        this.game.state.start(sceneName, true, false);
    };
    return Scene;
}(Phaser.State));
var SpeechBubble = (function () {
    function SpeechBubble(parentSprite, scale, position, xOffset, yOffset) {
        if (xOffset === void 0) { xOffset = 0; }
        if (yOffset === void 0) { yOffset = 0; }
        var _this = this;
        this.bubble = game.add.sprite(0, 0, 'speech-bubble');
        this.bubble.scale.set(scale);
        this.bubble.anchor.setTo(0.5, 0.5);
        this.bubble.alignTo(parentSprite, position, xOffset, yOffset);
        this.bubble.visible = true;
        this.bubble.inputEnabled = true;
        this.bubbleText = game.add.text(0, 0);
        this.bubble.events.onInputUp.add(function () {
            _this.bubble.visible = false;
            _this.bubbleText.visible = false;
        });
    }
    SpeechBubble.prototype.addTextToBubble = function (text, fontSize, fontFamily, textColor) {
        if (fontSize === void 0) { fontSize = "16px"; }
        if (fontFamily === void 0) { fontFamily = "sans-serif"; }
        if (textColor === void 0) { textColor = "black"; }
        this.bubbleText = game.add.text(0, 0, text, {
            font: fontSize + " " + fontFamily,
            fill: textColor,
            wordWrap: true,
            wordWrapWidth: this.bubble.width - 30,
            align: "center",
            backgroundColor: "white"
        });
        this.bubbleText.anchor.set(0.5);
        this.bubbleText.alignIn(this.bubble, Phaser.CENTER, 0, -20);
    };
    return SpeechBubble;
}());
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(game, x, y, image) {
        return _super.call(this, game, x, y, image) || this;
    }
    return Sprite;
}(Phaser.Sprite));
var StoreItem = (function () {
    function StoreItem(title, imgKey, price, itemBox, visible, xOffset, operator) {
        if (visible === void 0) { visible = true; }
        this.textArray = [];
        this._price = price;
        if (operator) {
            this.storeItem = game.add.button(itemBox.centerX - xOffset, itemBox.centerY, imgKey);
        }
        else {
            this.storeItem = game.add.button(itemBox.centerX + xOffset, itemBox.centerY, imgKey);
        }
        this.storeItem.anchor.setTo(0.5, 0.5);
        this.storeItem.scale.setTo(0.07, 0.07);
        this.storeItem.visible = visible;
        var topText = game.add.text(this.storeItem.centerX, this.storeItem.centerY - this.storeItem.height / 1.8, title);
        topText.anchor.setTo(0.5, 0.5);
        topText.visible = visible;
        var bottomText = game.add.text(this.storeItem.centerX, this.storeItem.centerY + this.storeItem.height / 1.5, '$' + String(this.price));
        bottomText.anchor.setTo(0.5, 0.5);
        bottomText.visible = visible;
        this.textArray.push(topText);
        this.textArray.push(bottomText);
    }
    StoreItem.prototype.setUpItemActionOnClick = function (callback) {
        var _this = this;
        this.storeItem.events.onInputUp.add(function () { return _this.buyItem(callback); });
    };
    StoreItem.prototype.scaleStoreItem = function (scale) {
        this.storeItem.scale.set(scale);
    };
    StoreItem.prototype.buyItem = function (callback) {
        var spendMoney = new Event('money_change');
        if (mainGame.getPlayerMoney() > this.price) {
            this.storeItem.inputEnabled = false;
            mainGame.setPlayerMoney(mainGame.getPlayerMoney() - this.price);
            this.storeItem.tint = 0x1BC500;
            window.dispatchEvent(spendMoney);
            callback();
        }
        else {
            console.log("No funds");
        }
    };
    StoreItem.prototype.getButtonObject = function () {
        return this.storeItem;
    };
    StoreItem.prototype.getTextArray = function () {
        return this.textArray;
    };
    Object.defineProperty(StoreItem.prototype, "price", {
        get: function () {
            return this._price;
        },
        enumerable: true,
        configurable: true
    });
    StoreItem.prototype.changeVisibility = function (val) {
        this.getButtonObject().visible = val;
    };
    StoreItem.prototype.changeVisibilityText = function (val) {
        for (var _i = 0, _a = this.getTextArray(); _i < _a.length; _i++) {
            var text = _a[_i];
            text.visible = val;
        }
    };
    return StoreItem;
}());
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameScene.prototype.preload = function () {
        MakeCharacter.loadCharacterAssets(this);
    };
    GameScene.prototype.create = function () {
        var character = new MakeCharacter("sad");
        character.setMaskDecoration("mask-extra-ex", 0, 0);
        character.changePantsColor("#2be28a");
        character.changeShoesColor("#E00707");
        character.talk();
        var sprite = game.add.sprite(40, 100, 'mouths');
        sprite.animations.add('talk');
        sprite.animations.play('talk', 5, true);
    };
    return GameScene;
}(Scene));
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomeScene.prototype.preload = function () {
        this.load.image('start-button', "./img/start-button-lucha.png");
    };
    HomeScene.prototype.create = function () {
        var _this = this;
        game.stage.backgroundColor = '#ffffff';
        var start = game.add.sprite(game.world.centerX, game.world.centerY, 'start-button');
        start.anchor.setTo(0.5, 0.5);
        start.scale.setTo(0.2, 0.2);
        var text = game.add.text(game.world.centerX, game.world.centerY + start.height / 1.5, "Start");
        text.anchor.setTo(0.5, 0.5);
        text.font = "Press Start 2P";
        text.fontSize = 50;
        text.fill = '#00ff44';
        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        text.inputEnabled = true;
        text.events.onInputUp.add(function () { game.state.start('playScene'); });
        text.events.onInputOver.add(function (textp) {
            if (textp === void 0) { textp = text; }
            return _this.hoverOverText(textp);
        });
        text.events.onInputOut.add(function (textp) {
            if (textp === void 0) { textp = text; }
            return _this.hoverOutText(textp);
        });
    };
    HomeScene.prototype.hoverOverText = function (text) {
        text.fill = '#D03958';
    };
    HomeScene.prototype.hoverOutText = function (text) {
        text.fill = '#00ff44';
    };
    return HomeScene;
}(Scene));
var PlayScene = (function (_super) {
    __extends(PlayScene, _super);
    function PlayScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.foodBoxActive = false;
        _this.itemsConsumed = 0;
        _this.foodBoxItems = [];
        _this.maskBoxItems = [];
        _this.powerBoxItems = [];
        _this.allBoxesAndContent = [];
        _this.colors = {
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
        return _this;
    }
    PlayScene.prototype.preload = function () {
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
    };
    PlayScene.prototype.create = function () {
        var _this = this;
        this.character = new MakeCharacter('sad');
        this.character.changeMaskColor(MainGame.character.head.color);
        this.character.setMaskDecoration(MainGame.character.head.mask, 0, 0);
        this.character.changeMaskDecorationColor(MainGame.character.head.decorationColor);
        this.character.changePantsColor(MainGame.character.pants.color);
        this.character.changeShoesColor(MainGame.character.shoes.color);
        this.character.setupCharacterColorPicker(function (sprite) { return _this.colorPicker(sprite); });
        setTimeout(function () {
            var bubble = new SpeechBubble(_this.character.getCharacterHead(), 0.1, Phaser.RIGHT_CENTER);
            bubble.addTextToBubble("Ik heb honger!", "22px");
        }, 1000);
        var charachterOptionBox = game.add.sprite(game.world.centerX - 350, game.world.centerY, this.createBlock(300, 70, "red"));
        charachterOptionBox.anchor.setTo(0.5, 0.5);
        var foodOption = game.add.button(charachterOptionBox.centerX, charachterOptionBox.centerY - 120, 'food-button', function () {
            _this.toggleBox(_this.foodBoxItems);
        });
        foodOption.anchor.setTo(0.5, 0.5);
        foodOption.scale.setTo(0.02, 0.02);
        var maskOption = game.add.button(charachterOptionBox.centerX, charachterOptionBox.centerY, 'mask-button', function () {
            _this.toggleBox(_this.maskBoxItems);
        });
        maskOption.anchor.setTo(0.5, 0.5);
        maskOption.scale.setTo(0.02, 0.02);
        var powerUpOption = game.add.button(charachterOptionBox.centerX, charachterOptionBox.centerY + 120, 'power-up-button', function () {
            _this.toggleBox(_this.powerBoxItems);
        });
        powerUpOption.anchor.setTo(0.5, 0.5);
        powerUpOption.scale.setTo(0.02, 0.02);
        var gameOptionBox = game.add.sprite(game.world.centerX + 350, game.world.centerY - 200, this.createBlock(150, 70, "red"));
        gameOptionBox.anchor.setTo(0.5, 0.5);
        var storeOption = game.add.button(gameOptionBox.centerX, gameOptionBox.centerY - 40, 'store-button', function () {
            _this.switchScenes('storeScene');
        });
        storeOption.anchor.setTo(0.5, 0.5);
        storeOption.scale.setTo(0.020, 0.020);
        var gameOption = game.add.button(gameOptionBox.centerX, gameOptionBox.centerY + 40, 'game-button', function () {
            _this.switchScenes('homeScene');
        });
        gameOption.anchor.setTo(0.5, 0.5);
        gameOption.scale.setTo(0.035, 0.035);
        this.setUpFoodBoxAndItems(this.character.getMouthSprite());
        this.setupMaskBoxAndItems();
        this.setupPowerBoxAndItems();
        this.faceChanges(this.character);
    };
    PlayScene.prototype.colorPicker = function (item) {
        var _this = this;
        var colorBox = game.add.sprite(game.world.centerX, game.world.centerY + 270, this.createBlock(80, 400, "red"));
        colorBox.anchor.set(0.5);
        var i = 0;
        var j = 0;
        var start = 0;
        var _loop_1 = function (color) {
            if (i != 0 && i % 33 == 0) {
                console.log();
                j++;
                start = 0;
            }
            var colorBlock = game.add.sprite(colorBox.left + 8 + start * 12, colorBox.top + 10 + 12 * j, this_1.createBlock(10, 10, String(this_1.colors[color])));
            colorBlock.anchor.set(0.5);
            colorBlock.inputEnabled = true;
            colorBlock.events.onInputUp.add(function () {
                item.tint = MakeCharacter.getColorCode(_this.colors[color]);
            });
            start++;
            i++;
        };
        var this_1 = this;
        for (var color in this.colors) {
            _loop_1(color);
        }
    };
    PlayScene.prototype.setUpFoodBoxAndItems = function (head) {
        var foodBox = game.add.sprite(game.world.centerX, game.world.centerY - 250, this.createBlock(80, 400, "red"));
        foodBox.anchor.setTo(0.5, 0.5);
        foodBox.visible = false;
        var pizza = this.createBoxItem('pizza-item', 0.05, -150, foodBox, head, "consumeFood");
        var pumpkin = this.createBoxItem('pumpkin-item', 0.1, -50, foodBox, head, "consumeFood");
        var burger = this.createBoxItem('burger-item', 0.1, +50, foodBox, head, "consumeFood");
        var hotDog = this.createBoxItem('hot-dog-item', 0.1, +150, foodBox, head, "consumeFood");
        this.foodBoxItems = [foodBox, pizza, pumpkin, burger, hotDog];
        this.allBoxesAndContent = this.checkforUniqueValues(this.allBoxesAndContent.concat(this.foodBoxItems));
    };
    PlayScene.prototype.setupMaskBoxAndItems = function () {
        var _this = this;
        var maskBox = game.add.sprite(game.world.centerX, game.world.centerY - 250, this.createBlock(80, 400, "red"));
        maskBox.anchor.setTo(0.5, 0.5);
        maskBox.visible = false;
        var items = mainGame.getOwnedMasks();
        var i = 0;
        var _loop_2 = function (item) {
            var sprite = game.add.sprite((maskBox.x - 160) + (i * 90), maskBox.y, item.getButtonObject().key);
            sprite.scale.set(0.035);
            sprite.anchor.set(0.5);
            sprite.visible = false;
            sprite.inputEnabled = true;
            sprite.input.enableDrag(true);
            this_2.addActionOnCollision(sprite, this_2.character.getCharacterHead(), function () {
                var points = sprite.input.dragStartPoint;
                _this.character.changeMaskDecoration(String(sprite.key));
                sprite.x = points.x;
                sprite.y = points.y;
            });
            if (!this_2.checkifArrayContainsItem(sprite, this_2.maskBoxItems)) {
                this_2.maskBoxItems.push(sprite);
                i++;
            }
        };
        var this_2 = this;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            _loop_2(item);
        }
        if (!this.checkifArrayContainsItem(maskBox, this.maskBoxItems)) {
            this.maskBoxItems.push(maskBox);
        }
        this.allBoxesAndContent = this.checkforUniqueValues(this.allBoxesAndContent.concat(this.maskBoxItems));
    };
    PlayScene.prototype.checkforUniqueValues = function (array) {
        for (var i = 0; i < array.length; ++i) {
            for (var j = i + 1; j < array.length; ++j) {
                if (array[i] === array[j])
                    array.splice(j--, 1);
            }
        }
        return array;
    };
    PlayScene.prototype.setupPowerBoxAndItems = function () {
        var powerBox = game.add.sprite(game.world.centerX, game.world.centerY - 250, this.createBlock(80, 400, "red"));
        powerBox.anchor.set(0.5);
        powerBox.visible = false;
        var items = mainGame.getOwnedPowers();
        var i = 0;
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            var sprite = this.createBoxItem(String(item.getButtonObject().key), 0.030, -160 + (i * 90), powerBox, this.character.getCharacterHead(), function () {
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
    };
    PlayScene.prototype.checkifArrayContainsItem = function (item, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === item) {
                return true;
            }
        }
        return false;
    };
    PlayScene.prototype.toggleBox = function (items) {
        console.log(items);
        var check = items[0].visible;
        for (var _i = 0, _a = this.allBoxesAndContent; _i < _a.length; _i++) {
            var target = _a[_i];
            target.visible = false;
        }
        for (var _b = 0, items_3 = items; _b < items_3.length; _b++) {
            var item = items_3[_b];
            if (!check) {
                item.visible = true;
            }
        }
    };
    PlayScene.prototype.createBoxItem = function (imgKey, scale, xOffset, box, collisionTarget, callback) {
        var item = game.add.sprite(0, 0, imgKey);
        item.scale.set(scale);
        item.anchor.setTo(0.5, 0.5);
        item.alignIn(box, Phaser.CENTER, xOffset, 0);
        item.scale.x *= -1;
        item.inputEnabled = true;
        item.visible = false;
        item.input.enableDrag(true);
        this.addActionOnCollision(item, collisionTarget, callback);
        return item;
    };
    PlayScene.prototype.faceChanges = function (character) {
        window.addEventListener('imfull', function () {
            character.changeMaskColor("#ff0000");
            character.changeMouthEmotion('smile');
            character.changeSingleEye('left', 'smile');
            character.changeSingleEye('right', 'smile');
            var bubble = new SpeechBubble(character.getCharacterHead(), 0.1, Phaser.RIGHT_CENTER);
            bubble.addTextToBubble("Ik ben vol", "22px");
        });
    };
    PlayScene.prototype.addActionOnCollision = function (item, overlapItem, callback) {
        var _this = this;
        item.events.onDragStop.add(function () {
            if (Phaser.Rectangle.intersects(overlapItem.getBounds(), item.getBounds())) {
                if (typeof callback == "string") {
                    _this[String(callback)](item);
                }
                else {
                    callback(item);
                }
            }
        });
    };
    PlayScene.prototype.addPower = function (item) {
    };
    PlayScene.prototype.consumeFood = function (item) {
        var _this = this;
        var points = item.input.dragStartPoint;
        if (this.itemsConsumed < 2) {
            this.character.talk();
            setTimeout(function () {
                item.destroy();
                _this.character.stopTalking();
            }, 1500);
            this.itemsConsumed++;
        }
        else {
            item.x = points.x;
            item.y = points.y;
            window.dispatchEvent(new Event('imfull'));
        }
    };
    return PlayScene;
}(Scene));
var SettingScene = (function (_super) {
    __extends(SettingScene, _super);
    function SettingScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingScene.prototype.preload = function () {
        MakeCharacter.loadCharacterAssets(this);
    };
    SettingScene.prototype.create = function () {
        var character = new MakeCharacter('smile');
        character.setMaskDecoration("mask-extra-horn", 0, 0);
        character.changePantsColor("#2be28a");
        character.changeShoesColor("#E00707");
        setTimeout(function () {
            character.changeMaskDecoration('mask-extra-star', "#E00707");
            character.changeSingleEye('left', 'sad', 'white');
            character.changeSingleEye('right', 'devious', 'blue');
            var bubble = new SpeechBubble(character.getCharacterHead(), 0.1, Phaser.RIGHT_CENTER);
            bubble.addTextToBubble("Ik heb Honger! dsasd asdda sadasda");
            console.log("dasssd");
        }, 1000);
    };
    return SettingScene;
}(Scene));
var Button = Phaser.Button;
var StoreScene = (function (_super) {
    __extends(StoreScene, _super);
    function StoreScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.powerUps = [];
        _this.masks = [];
        _this.powerText = [];
        _this.maskText = [];
        return _this;
    }
    StoreScene.prototype.preload = function () {
        this.load.image('arrow-button', "./img/arrow-button.png");
        this.load.image('mask-button', "./img/mask-button.png");
        this.load.image('store-button', "./img/store-button.png");
        this.load.image('power-button', "./img/power-button.png");
        this.load.image('power-up-button', "./img/power-up.png");
        this.load.image('horn', "./img/new-mask-1.png");
        this.load.image('ex', "./img/new-mask-2.png");
        this.load.image('star', "./img/new-mask-3.png");
        this.load.image('fire-power-up', "./img/fire-power-up.png");
        this.load.image('money-power-up', "./img/money-power-up.png");
    };
    StoreScene.prototype.create = function () {
        this.setUpBackButton();
        this.setUpOptionBox();
        this.setUpMoneyBox();
        var itemBox = game.add.sprite(game.world.centerX, game.world.centerY + 100, this.createBlock(350, 600, '#C70000'));
        itemBox.anchor.setTo(0.5, 0.5);
        this.setUpPowerGroup(itemBox);
        this.setUpMaskGroup(itemBox);
    };
    StoreScene.prototype.setUpOptionBox = function () {
        var _this = this;
        var optionBox = game.add.sprite(game.world.centerX, game.world.centerY - 200, this.createBlock(50, 300, '#C70000'));
        optionBox.anchor.setTo(0.5, 0.5);
        var powerUp = game.add.button(optionBox.centerX - 50, optionBox.centerY, 'power-up-button', function () { return _this.changeToPowerItems(); });
        powerUp.scale.setTo(0.02, 0.02);
        powerUp.anchor.setTo(0.5, 0.5);
        var maskPower = game.add.button(optionBox.centerX + 50, optionBox.centerY, 'mask-button', function () { return _this.changeToMaskItems(); });
        maskPower.scale.setTo(0.02, 0.02);
        maskPower.anchor.setTo(0.5, 0.5);
    };
    StoreScene.prototype.setUpMoneyBox = function () {
        var moneyBox = game.add.sprite(game.world.centerX, game.world.centerY - 125, this.createBlock(50, 250, '#C70000'));
        moneyBox.anchor.setTo(0.5, 0.5);
        var moneyText = game.add.text(moneyBox.centerX, moneyBox.centerY, "$ " + mainGame.getPlayerMoney());
        moneyText.anchor.setTo(0.5, 0.5);
        window.addEventListener('money_change', function () {
            moneyText.setText("$ " + String(mainGame.getPlayerMoney()));
        });
    };
    StoreScene.prototype.setUpBackButton = function () {
        var _this = this;
        var backBox = game.add.sprite(game.world.centerX - 325, game.world.centerY - 250, this.createBlock(50, 100, '#C70000'));
        backBox.anchor.setTo(0.5, 0.5);
        var backButton = game.add.button(backBox.centerX, backBox.centerY, 'arrow-button', function () {
            _this.switchScenes('playScene');
        }, this);
        backButton.scale.setTo(0.1, 0.1);
        backButton.anchor.setTo(0.5, 0.5);
        backButton.rotation = 3.15;
    };
    StoreScene.prototype.changeToMaskItems = function () {
        this.changeVisibilityItems(this.powerUps, false);
        this.changeVisibilityItems(this.masks, true);
    };
    StoreScene.prototype.changeToPowerItems = function () {
        this.changeVisibilityItems(this.masks, false);
        this.changeVisibilityItems(this.powerUps, true);
    };
    StoreScene.prototype.changeVisibilityItems = function (items, val) {
        for (var _i = 0, items_4 = items; _i < items_4.length; _i++) {
            var item = items_4[_i];
            item.changeVisibility(val);
            item.changeVisibilityText(val);
        }
    };
    StoreScene.prototype.setUpPowerGroup = function (itemBox) {
        var firePower = new StoreItem("Vuur power", 'fire-power-up', 1000, itemBox, true, 150, true);
        firePower.setUpItemActionOnClick(function () { mainGame.buyPower(firePower); });
        this.powerText.concat(firePower.getTextArray());
        this.powerUps.push(firePower);
        var moneyPower = new StoreItem("Meer geld", "money-power-up", 3000, itemBox, true, 150, false);
        moneyPower.setUpItemActionOnClick(function () { mainGame.buyPower(moneyPower); });
        this.powerText.concat(moneyPower.getTextArray());
        this.powerUps.push(moneyPower);
    };
    StoreScene.prototype.setUpMaskGroup = function (itemBox) {
        var mask_one = new StoreItem("Masker 1", "horn", 1000, itemBox, false, 150, true);
        mask_one.setUpItemActionOnClick(function () { mainGame.buyMask(mask_one); });
        this.maskText.concat(mask_one.getTextArray());
        this.masks.push(mask_one);
        console.log(mask_one.getButtonObject().key);
        var mask_two = new StoreItem("Masker 2", "star", 1000, itemBox, false, 0, true);
        mask_two.setUpItemActionOnClick(function () { mainGame.buyMask(mask_two); });
        this.maskText.concat(mask_two.getTextArray());
        this.masks.push(mask_two);
        var mask_three = new StoreItem("Masker 3", "ex", 1000, itemBox, false, 150, false);
        mask_three.setUpItemActionOnClick(function () { mainGame.buyMask(mask_three); });
        this.maskText.concat(mask_three.getTextArray());
        this.masks.push(mask_three);
    };
    return StoreScene;
}(Scene));
//# sourceMappingURL=main.js.map