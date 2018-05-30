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
var homeScene_1 = require("../scenes/homeScene");
var playScene_1 = require("../scenes/playScene");
var settingScene_1 = require("../scenes/settingScene");
var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
        var _this = _super.call(this, 1000, 800, Phaser.AUTO, 'content', {
            "create": function () {
                _this.state.add('HomeScene', homeScene_1.default);
                _this.state.add('PlayScene', playScene_1.default);
                _this.state.add('SettingScene', settingScene_1.default);
                _this.state.start('HomeScene');
            }
        }) || this;
        return _this;
    }
    return MainGame;
}(Phaser.Game));
exports.default = MainGame;
//# sourceMappingURL=game.js.map