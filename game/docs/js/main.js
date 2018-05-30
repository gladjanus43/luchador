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
        console.log('preload');
    };
    Game.prototype.create = function () {
        var bubble = new Spreekwoord(200, 200);
    };
    Game.prototype.update = function () {
    };
    return Game;
}());
window.onload = function () {
    new Game();
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
        fetch("http://localhost/Luchador/luchador/game/docs/connection.php")
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
        this.element.innerHTML = this.sayings[0].spreekwoord;
        this.element.appendChild(this.button);
        this.button.innerHTML = "Volgende Gezegde";
        this.button.addEventListener('click', this.clickSuccesHandler);
    };
    Spreekwoord.prototype.clickSuccesHandler = function () {
        console.log('Je hebt het goed geraden!');
    };
    return Spreekwoord;
}());
//# sourceMappingURL=main.js.map