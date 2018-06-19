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
        game.load.image('bg', '../docs/images/sky.png')

        this.fallingSaying = new FallingSaying(300, 0, this.correctAnswer) 


        this.placeSayings()  
        this.createArray()
        
    }

    create(){
        game.add.image(0,0, 'bg')
    }

    update(){
        this.fallingSaying.update()
        this.checkSayingTouchingBox()
        // console.log(this.prevCorrect);
        
    }

    createArray(){
        this.correctAnswer = this.randomInt(0,3)
        this.questions = []
        this.currentSayings = []

        while(this.questions.length < 3){
            this.ran = this.randomInt(0,sayings.length);
            if(this.questions.indexOf(this.ran) == -1){
                this.questions.push(this.ran);
            }
        }
        for(let i = 0; i < 3; i++){
            this.currentSayings.push(sayings[this.questions[i]])
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
            this.boxes[i].style.top = "500px"
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
            this.scoreBoard.createNewBlock(558 - (this.streak * 50))
            this.prevCorrect = true
            this.streak +=1
        }else if(this.prevCorrect == true){
            this.scoreBoard.createNewBlock(558 - (this.streak * 50))
            this.streak +=1
        }
        console.log(this.streak);
        if(this.streak == 5){
            console.log('you finished the level!');
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

    
}
