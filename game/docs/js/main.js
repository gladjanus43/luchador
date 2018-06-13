"use strict";
var game;
var sayings;
var Game = (function () {
    function Game() {
        game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            create: this.create,
            preload: this.preload,
            update: this.update
        });
        sayings = [];
        this.loadSayings();
    }
    Game.prototype.loadSayings = function () {
        var _this = this;
        fetch("http://localhost/Luchador/luchador/game/docs/connection.php")
            .then(function (res) { return res.json(); })
            .then(function (res) { return _this.pushSayings(res); });
    };
    Game.prototype.pushSayings = function (dbResults) {
        console.log("klaar met laden");
        dbResults.forEach(function (saying) {
            sayings.push(saying);
        });
    };
    Game.prototype.preload = function () {
        console.log('preload');
    };
    Game.prototype.create = function () {
        new Spreekwoord(200, 200);
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
        this.questions = [];
        this.currentSayings = [];
        this.correctAnswer = this.randomInt(0, 3);
        this.element = document.createElement("bubble");
        this.span = document.createElement("span");
        this.button1 = document.createElement("button");
        this.button2 = document.createElement("button");
        this.button3 = document.createElement("button");
        this.createArray();
        this.createBubble();
    }
    Spreekwoord.prototype.loadSayings = function () {
        var _this = this;
        fetch("http://localhost/Luchador/luchador/game/docs/connection.php")
            .then(function (res) { return res.json(); })
            .then(function (res) { return _this.pushSayings(res); });
    };
    Spreekwoord.prototype.pushSayings = function (dbResults) {
        console.log("klaar met laden");
        dbResults.forEach(function (saying) {
            sayings.push(saying);
        });
    };
    Spreekwoord.prototype.createBubble = function () {
        this.element.addEventListener('click', this.changeInnerText.bind(this));
        var gameCanvas = document.getElementById('content');
        gameCanvas.appendChild(this.element);
        this.element.appendChild(this.span);
        this.element.style.left = this.posX + "px";
        this.element.style.top = this.posY + "px";
        this.element.appendChild(this.button1);
        this.element.appendChild(this.button2);
        this.element.appendChild(this.button3);
    };
    Spreekwoord.prototype.changeInnerText = function (e) {
        if (e.target.nodeName == "BUTTON") {
            if (this.currentSayings[this.correctAnswer].antwoord == e.target.innerHTML) {
                this.createArray();
            }
        }
    };
    Spreekwoord.prototype.createArray = function () {
        this.correctAnswer = this.randomInt(0, 3);
        this.questions = [];
        this.currentSayings = [];
        while (this.questions.length < 3) {
            this.ran = this.randomInt(0, sayings.length);
            if (this.questions.indexOf(this.ran) == -1) {
                this.questions.push(this.ran);
            }
        }
        for (var i = 0; i < 3; i++) {
            this.currentSayings.push(sayings[this.questions[i]]);
        }
        this.fillButtons();
    };
    Spreekwoord.prototype.fillButtons = function () {
        this.span.innerHTML = this.currentSayings[this.correctAnswer].spreekwoord;
        this.button1.innerHTML = this.currentSayings[0].antwoord;
        this.button2.innerHTML = this.currentSayings[1].antwoord;
        this.button3.innerHTML = this.currentSayings[2].antwoord;
    };
    Spreekwoord.prototype.randomInt = function (begin, end) {
        var ran = Math.floor(Math.random() * end + begin);
        return ran;
    };
    return Spreekwoord;
}());
//# sourceMappingURL=main.js.map