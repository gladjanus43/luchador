let game : Phaser.Game
let sayings : Saying[];
class Game{
    /**
     * constructor for the game
     */
    constructor(){
        game = new Phaser.Game(800, 600, Phaser.AUTO,'content',{
            create  : this.create,
            preload : this.preload,
            update  : this.update
        });
        sayings = []
        this.loadSayings();
    }

    loadSayings(){
        fetch("http://localhost/Luchador/luchador/game/docs/connection.php")
            .then(res => res.json())
            .then(res => this.pushSayings(res))
    }

    pushSayings(dbResults:any){
        console.log("klaar met laden");
        dbResults.forEach((saying : any) => {
            sayings.push(saying)
        });
    }

    /**
     * preload function of the game, here assets are loaded in
     */
    preload(){
        console.log('preload');
    } 

    /**
     * this is the render stage of the game, in the preload they are saved in memory
     * here they get actually placed in the game
     */
    create(){
        new Spreekwoord(200,200)
    }

    /**
     * gameLoop function
     */
    update(){
        
    }
}
window.onload = function(){
    new Game();
}; 