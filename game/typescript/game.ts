let game : Phaser.Game
let sayings : Saying[];
// let fallingGame : FallGame

class Game{

    fallingGame : FallGame
    /**
     * constructor for the game
     */
    constructor(){
        game = new Phaser.Game(800, 600, Phaser.AUTO,'content',{
            create  : this.create,
            preload : this.preload,
            update  : this.update
        })
        sayings = []

        this.fallingGame = new FallGame()

        game.state.add('fallGame', this.fallingGame)
        game.state.start('fallGame')
        
        this.loadSayings();
    }

    loadSayings(){
        fetch("http://localhost/Luchador/luchador/game/docs/connection.php")
            .then(res => res.json())
            .then(res => this.pushSayings(res))
    }

    pushSayings(dbResults:any){
        dbResults.forEach((saying : any) => {
            sayings.push(saying)
        });
    }

    // /**
    //  * preload function of the game, here assets are loaded in
    //  */
    preload(){
        // console.log('preload');
    } 

    /**
     * this is the render stage of the game, in the preload they are saved in memory
     * here they get actually placed in the game
     */
    create(){
        
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