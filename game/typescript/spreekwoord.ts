class Spreekwoord{
    private posX : any;
    private posY : any;
    element : HTMLElement;
    sayings : Saying[];
    button : HTMLElement;

    constructor(x : any, y : any, ){
        this.posX = x;
        this.posY = y;
        this.sayings = []
        this.element = document.createElement("bubble");
        this.button = document.createElement("button");

        this.loadSayings();

    }

    loadSayings(){
        fetch("http://luchador.local/connection.php")
            .then(res => res.json())
            .then(res => this.pushSayings(res))
    }

    pushSayings(dbResults:any){
        console.log("klaar met laden");
        
        dbResults.forEach((saying : any) => {
            this.sayings.push(saying)
        });

        this.createBubble();
    }

    private createBubble(){
        let bubble = document.getElementById('content')!;
        bubble.appendChild(this.element);
        

        //set the position of the bubble
        this.element.style.left = this.posX  + "px";
        this.element.style.top = this.posY + "px";
        this.element.innerHTML = "test";
        // this.element.innerHTML = this.sayings[0].spreekwoord;

        this.element.appendChild(this.button);
        this.button.innerHTML = "Volgende Gezegde";

        this.button.addEventListener('click', this.clickSuccesHandler);
    }

    clickSuccesHandler(){
        console.log('Je hebt het goed geraden!');
    }
}