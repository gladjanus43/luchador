var game : Phaser.Game

class Game{
    
    constructor(){
        game = new Phaser.Game(800, 600, Phaser.AUTO,'content',{
            create  : this.create,
            preload : this.preload,
            update : this.update
        });
    }

    preload(){

    }
    create(){
        
    }
    update(){

    }

}
window.onload = function(){
    new Game();
};