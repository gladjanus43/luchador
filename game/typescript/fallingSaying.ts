let menuImageFallingGame : any
let buttonFallingGame : any
class FallGame extends Phaser.State{
    questions : Array <number>
    currentSayings : Array <Saying>
    correctAnswer : number
    
    ran : number 
    boxes : Array <any>

    fallingSaying : any
    wasOn : boolean

    scoreBoard : Score

    streak : number
    prevCorrect : boolean

    menu : any
    button : any


    constructor(){
        super()
        this.questions= []
        this.currentSayings = []
        this.boxes = []

        this.correctAnswer = 0
        this.ran = 0
        this.fallingSaying = ''
        this.wasOn = false

        this.scoreBoard = new Score()

        this.streak = 0
        this.prevCorrect = false

        
    }

    preload(){
        game.load.image('bg', './images/sky.png')
        game.load.image('menu', './images/menu.png')
        game.load.image('startButton', './images/startButton.png')
        this.load.image('quit',"./img/quit.png");
        this.load.image('restart',"./img/restart.png");
        
        this.fallingSaying = new FallingSaying(300, 0, this.correctAnswer)
        this.placeSayings()
        this.createArray()


    }

    create(){
        game.add.image(0,0, 'bg')
        this.createMenu()
        this.setupRestartAndQuitButton();

        // document.body.addEventListener('quit_game',() => {
        //     this.finishedGame();
        //     game.state.start('playScene');
        // })
    }

    update(){
        this.fallingSaying.update()
        this.checkSayingTouchingBox()
        // console.log(this.prevCorrect);
        this.finishedGame();
        
    }

    createArray(){
        this.correctAnswer = this.randomInt(0,3)
        this.questions = []
        this.currentSayings = []

        while(this.questions.length < 3){
            this.ran = this.randomInt(0,MainGame.sayings.length);
            if(this.questions.indexOf(this.ran) == -1){
                this.questions.push(this.ran);
            }
        }
        for(let i = 0; i < 3; i++){
            this.currentSayings.push(MainGame.sayings[this.questions[i]])
        }   
        
        for(let i = 0; i < 3; i++){
            this.boxes[i].innerHTML = this.currentSayings[i].antwoord
            this.boxes[i].dataset.boxNr = i
        }

        this.fallingSaying.setInnerHtml(this.currentSayings[this.correctAnswer].spreekwoord)
        this.fallingSaying.setDataSet(this.correctAnswer)      
    }

    randomInt(begin : number, end : number){
        var ran = Math.floor(Math.random() * end + begin);
        return ran
    }

    placeSayings(){
        this.boxes = []
        for(let i = 0; i<3; i++){
            this.boxes.push(document.createElement('box'))
            this.boxes[i].style.left = 100+(i*200)+ "px"
            this.boxes[i].style.top = "450px"
            document.body.appendChild(this.boxes[i])
        }
    }

    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    checkSayingTouchingBox(){     
        let hit0
        hit0 = this.checkCollision(this.fallingSaying.getRectangle(), this.boxes[0].getBoundingClientRect())

        let hit1
        hit1 = this.checkCollision(this.fallingSaying.getRectangle(), this.boxes[1].getBoundingClientRect())

        let hit2
        hit2 = this.checkCollision(this.fallingSaying.getRectangle(), this.boxes[2].getBoundingClientRect())

        if(hit0 == true){            
            if(this.fallingSaying.getDataSet() == this.boxes[0].dataset.boxNr){
                if(this.wasOn == false){
                    this.createArray()
                    this.wasOn = true
                    this.fallingSaying.resetPos()  
                    this.guessedCorrectAnswer()                  
                }
            }else{
                this.guessedWrong()
            }
        }else if(hit1 == true){            
            if(this.fallingSaying.getDataSet() == this.boxes[1].dataset.boxNr){
                if(this.wasOn == false){
                    this.createArray()
                    this.wasOn = true
                    this.fallingSaying.resetPos()
                    this.guessedCorrectAnswer()
                }
            }else{
                this.guessedWrong()
            }
            
        }else if(hit2 == true){            
            if(this.fallingSaying.getDataSet() == this.boxes[2].dataset.boxNr){
                if(this.wasOn == false){
                    this.createArray()
                    this.wasOn = true
                    this.fallingSaying.resetPos() 
                    this.guessedCorrectAnswer()                  
                }
            }else{
                this.guessedWrong()
            }
        }else{
            this.wasOn = false
        }
    }

    guessedCorrectAnswer(){
        if(this.streak == 0){
            this.scoreBoard.createNewBlock(550 - (this.streak * 50))
            this.prevCorrect = true
            this.streak +=1
        }else if(this.prevCorrect == true){
            this.scoreBoard.createNewBlock(550 - (this.streak * 50))
            this.streak +=1
        }

    }

    finishedGame(){
        if(this.streak == 5){
            let allElements = document.body.childNodes;
            for(let i = allElements.length-1; i>=0; i--){
                if(allElements[i].nodeName != 'DIV'){
                    // document.body.removeChild(allElements[i])
                    document.body.removeChild(allElements[i])
                }
            }

            this.game.state.start('playScene',true,false);
        }
    }

    removeElement(tag : string){
        let items = document.body.getElementsByTagName(tag)
        for(let i = 0; i < items.length; i++){
            document.body.removeChild(items[i])
        }
    }

    guessedWrong(){
        this.streak = 0
        this.prevCorrect = false
        let scoreblock = document.body.getElementsByTagName('scoreblock')
        for(let i = 0; i < scoreblock.length; i++){
            document.body.removeChild(scoreblock[i])
        }
    }    

    createMenu(){
        menuImageFallingGame = game.add.sprite(250,100, 'menu')
        buttonFallingGame = game.add.button(350, 320, 'startButton', this.startGame)
        game.paused = true; 
    }

    startGame(){
        menuImageFallingGame.destroy()
        buttonFallingGame.destroy()
        game.paused = false
    }

    setupRestartAndQuitButton()
    {

        let quit = game.add.button(60, 20, 'quit', () => {
            let e = new Event('quit_game');
            document.body.dispatchEvent(e);
        });

        quit.anchor.set(0.5);
        quit.scale.set(0.06);
        new Phasetips(this.game,{
            targetObject: quit,
            context: 'Stoppen',
            strokeColor: '#c1e5c1',
            x:quit.left - 10,
            y:quit.centerY + 20
        });
    }

    
    
}
