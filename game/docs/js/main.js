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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super.call(this) || this;
    }
    return Scene;
}(Phaser.State));
var menuImageFallingGame;
var buttonFallingGame;
var FallGame = (function (_super) {
    __extends(FallGame, _super);
    function FallGame() {
        var _this = _super.call(this) || this;
        _this.questions = [];
        _this.currentSayings = [];
        _this.boxes = [];
        _this.correctAnswer = 0;
        _this.ran = 0;
        _this.fallingSaying = '';
        _this.wasOn = false;
        _this.scoreBoard = new Score();
        _this.streak = 0;
        _this.prevCorrect = false;
        return _this;
    }
    FallGame.prototype.preload = function () {
        game.load.image('bg', '../docs/images/sky.png');
        game.load.image('menu', '../docs/images/menu.png');
        game.load.image('startButton', '../docs/images/startButton.png');
        this.fallingSaying = new FallingSaying(300, 0, this.correctAnswer);
        this.placeSayings();
        this.createArray();
    };
    FallGame.prototype.create = function () {
        game.add.image(0, 0, 'bg');
        this.createMenu();
    };
    FallGame.prototype.update = function () {
        this.fallingSaying.update();
        this.checkSayingTouchingBox();
    };
    FallGame.prototype.createArray = function () {
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
        for (var i = 0; i < 3; i++) {
            this.boxes[i].innerHTML = this.currentSayings[i].antwoord;
            this.boxes[i].dataset.boxNr = i;
        }
        this.fallingSaying.setInnerHtml(this.currentSayings[this.correctAnswer].spreekwoord);
        this.fallingSaying.setDataSet(this.correctAnswer);
    };
    FallGame.prototype.randomInt = function (begin, end) {
        var ran = Math.floor(Math.random() * end + begin);
        return ran;
    };
    FallGame.prototype.placeSayings = function () {
        this.boxes = [];
        for (var i = 0; i < 3; i++) {
            this.boxes.push(document.createElement('box'));
            this.boxes[i].style.left = 100 + (i * 200) + "px";
            this.boxes[i].style.top = "450px";
            document.body.appendChild(this.boxes[i]);
        }
    };
    FallGame.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    FallGame.prototype.checkSayingTouchingBox = function () {
        var hit0;
        hit0 = this.checkCollision(this.fallingSaying.getRectangle(), this.boxes[0].getBoundingClientRect());
        var hit1;
        hit1 = this.checkCollision(this.fallingSaying.getRectangle(), this.boxes[1].getBoundingClientRect());
        var hit2;
        hit2 = this.checkCollision(this.fallingSaying.getRectangle(), this.boxes[2].getBoundingClientRect());
        if (hit0 == true) {
            if (this.fallingSaying.getDataSet() == this.boxes[0].dataset.boxNr) {
                if (this.wasOn == false) {
                    this.createArray();
                    this.wasOn = true;
                    this.fallingSaying.resetPos();
                    this.guessedCorrectAnswer();
                }
            }
            else {
                this.guessedWrong();
            }
        }
        else if (hit1 == true) {
            if (this.fallingSaying.getDataSet() == this.boxes[1].dataset.boxNr) {
                if (this.wasOn == false) {
                    this.createArray();
                    this.wasOn = true;
                    this.fallingSaying.resetPos();
                    this.guessedCorrectAnswer();
                }
            }
            else {
                this.guessedWrong();
            }
        }
        else if (hit2 == true) {
            if (this.fallingSaying.getDataSet() == this.boxes[2].dataset.boxNr) {
                if (this.wasOn == false) {
                    this.createArray();
                    this.wasOn = true;
                    this.fallingSaying.resetPos();
                    this.guessedCorrectAnswer();
                }
            }
            else {
                this.guessedWrong();
            }
        }
        else {
            this.wasOn = false;
        }
    };
    FallGame.prototype.guessedCorrectAnswer = function () {
        if (this.streak == 0) {
            this.scoreBoard.createNewBlock(550 - (this.streak * 50));
            this.prevCorrect = true;
            this.streak += 1;
        }
        else if (this.prevCorrect == true) {
            this.scoreBoard.createNewBlock(550 - (this.streak * 50));
            this.streak += 1;
        }
        console.log(this.streak);
        if (this.streak == 5) {
            console.log('you finished the level!');
            game.paused = true;
        }
    };
    FallGame.prototype.guessedWrong = function () {
        this.streak = 0;
        this.prevCorrect = false;
        var scoreblock = document.body.getElementsByTagName('scoreblock');
        for (var i = 0; i < scoreblock.length; i++) {
            document.body.removeChild(scoreblock[i]);
        }
    };
    FallGame.prototype.createMenu = function () {
        menuImageFallingGame = game.add.sprite(250, 100, 'menu');
        buttonFallingGame = game.add.button(350, 320, 'startButton', this.startGame);
        game.paused = true;
    };
    FallGame.prototype.startGame = function () {
        menuImageFallingGame.destroy();
        buttonFallingGame.destroy();
        game.paused = false;
    };
    return FallGame;
}(Phaser.State));
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
        this.fallingGame = new FallGame();
        game.state.add('fallGame', this.fallingGame);
        game.state.start('fallGame');
        this.loadSayings();
    }
    Game.prototype.loadSayings = function () {
        var _this = this;
        fetch("http://localhost/Luchador/luchador/game/docs/connection.php")
            .then(function (res) { return res.json(); })
            .then(function (res) { return _this.pushSayings(res); });
    };
    Game.prototype.pushSayings = function (dbResults) {
        dbResults.forEach(function (saying) {
            sayings.push(saying);
        });
    };
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
var FallingSaying = (function () {
    function FallingSaying(x, y, correctAnswer) {
        this.posX = x;
        this.posY = y;
        this.speedY = 0;
        this.speedX = 0;
        this.correctAnswer = correctAnswer;
        this.fallingSaying = document.createElement('falling');
        this.fallingSaying.style.top = this.posY + "px";
        this.create();
        window.addEventListener('keydown', this.keyDown.bind(this));
    }
    FallingSaying.prototype.create = function () {
        document.body.appendChild(this.fallingSaying);
        this.fallingSaying.innerHTML = '';
        this.fallingSaying.dataset.correctAnswer = this.correctAnswer;
    };
    FallingSaying.prototype.keyDown = function (e) {
        if (e.keyCode == 65) {
            if (this.posX >= 300) {
                this.posX -= 200;
            }
        }
        if (e.keyCode == 68) {
            if (this.posX <= 300) {
                this.posX += 200;
            }
        }
    };
    FallingSaying.prototype.move = function () {
        this.posY += 2;
        this.fallingSaying.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
        if (this.posY > 450) {
            this.posY = 0;
        }
    };
    FallingSaying.prototype.update = function () {
        this.move();
    };
    FallingSaying.prototype.getRectangle = function () {
        return this.fallingSaying.getBoundingClientRect();
    };
    FallingSaying.prototype.getInnerHtml = function () {
        return this.fallingSaying.innerHTML;
    };
    FallingSaying.prototype.setInnerHtml = function (string) {
        this.fallingSaying.innerHTML = string;
    };
    FallingSaying.prototype.getDataSet = function () {
        return this.fallingSaying.dataset.correctAnswer;
    };
    FallingSaying.prototype.setDataSet = function (number) {
        this.fallingSaying.dataset.correctAnswer = number;
    };
    FallingSaying.prototype.resetPos = function () {
        this.posY = 0;
    };
    return FallingSaying;
}());
var Score = (function () {
    function Score() {
        this.streak = 0;
        this.posX = 20;
        this.posY = 550;
    }
    Score.prototype.createNewBlock = function (y) {
        var element = document.createElement('scoreBlock');
        document.body.appendChild(element);
        element.style.left = this.posX + 'px';
        element.style.top = y + 'px';
    };
    Score.prototype.getStreak = function () {
        return this.streak;
    };
    Score.prototype.setStreak = function (int) {
        this.streak = int;
    };
    return Score;
}());
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