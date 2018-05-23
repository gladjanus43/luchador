var game : Phaser.Game

class Game{
    
    constructor(){
        game = new Phaser.Game(800, 600, Phaser.AUTO,'content',{
            create  : this.create,
            preload : this.preload,
<<<<<<< HEAD
            update  : this.update
        });
    }

preload(){

}
create(){

}
update(){

}
=======
            update : this.update
        });
    }

    preload(){

    }
    create(){
        
    }
    update(){

    }
>>>>>>> gijs

}
window.onload = function(){
    new Game();
};