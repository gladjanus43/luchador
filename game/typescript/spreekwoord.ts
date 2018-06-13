class Spreekwoord{
    posX : any;
    posY : any;

    //HTML element variables
    button1 : HTMLElement;
    button2 : HTMLElement;
    button3 : HTMLElement;
    element : HTMLElement;
    span    : HTMLElement;

    //random Value var
    ran : any

    questions : Array <number>
    currentSayings : Array <Saying>

    //var to store the current correct answer
    correctAnswer : number
    

    constructor(x : any, y : any, ){
        this.posX = x;
        this.posY = y;

        this.questions= []
        this.currentSayings = []

        this.correctAnswer = this.randomInt(0,3)
        
        this.element = document.createElement("bubble");
        this.span = document.createElement("span");

        this.button1 = document.createElement("button");
        this.button2 = document.createElement("button");
        this.button3 = document.createElement("button");

        this.createArray()
        this.createBubble()
              
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

    createBubble(){
        this.element.addEventListener('click', this.changeInnerText.bind(this));
        let gameCanvas = document.getElementById('content')!;
        gameCanvas.appendChild(this.element);

        this.element.appendChild(this.span);
        
        //set the position of the bubble
        this.element.style.left = this.posX  + "px";
        this.element.style.top = this.posY + "px";

        this.element.appendChild(this.button1);
        this.element.appendChild(this.button2);
        this.element.appendChild(this.button3);

    }

    changeInnerText(e : any){
        //check if a button is pressed
        if(e.target.nodeName == "BUTTON"){
            //check if the text in the button is equal to the correct answer
            if(this.currentSayings[this.correctAnswer].antwoord == e.target.innerHTML){
                this.createArray()
            }
        }        
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
            this.currentSayings.push(   sayings[this.questions[i]])
        }
        this.fillButtons()
    }
    
    fillButtons(){
        this.span.innerHTML = this.currentSayings[this.correctAnswer].spreekwoord

        this.button1.innerHTML = this.currentSayings[0].antwoord
        this.button2.innerHTML = this.currentSayings[1].antwoord
        this.button3.innerHTML = this.currentSayings[2].antwoord
    }

    randomInt(begin : number, end : number){
        var ran = Math.floor(Math.random() * end + begin);
        return ran
    }
}