"use strict";
var game;
var Game = (function () {
    function Game() {
        game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            create: this.create,
            preload: this.preload,
            update: this.update
        });
    }
    Game.prototype.preload = function () {
    };
    Game.prototype.create = function () {
    };
    Game.prototype.update = function () {
    };
    return Game;
}());
window.onload = function () {
    new Game();
};
//# sourceMappingURL=main.js.map