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
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(game, x, y, image) {
        return _super.call(this, game, x, y, image) || this;
    }
    return Sprite;
}(Phaser.Sprite));
exports.default = Sprite;
//# sourceMappingURL=sprite.js.map