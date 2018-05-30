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
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    Scene.prototype.setFontStyle = function (styling) {
        if (styling === void 0) { styling = {}; }
        this.style = styling;
    };
    Scene.prototype.switchScenes = function (sceneName) {
        this.game.state.start(sceneName);
    };
    return Scene;
}(Phaser.State));
exports.default = Scene;
//# sourceMappingURL=scene.js.map