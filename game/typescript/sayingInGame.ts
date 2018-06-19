class FallingSaying{
    fallingSaying : HTMLElement
    posX : number
    posY : number 
    speedX : number
    speedY : number
    correctAnswer : any

    constructor(x : number, y : number, correctAnswer : number){
        this.posX = x
        this.posY = y
        this.speedY = 0
        this.speedX = 0
        this.correctAnswer = correctAnswer

        this.fallingSaying = document.createElement('falling')
        // this.fallingSaying.style.left = this.posX  + "px";
        this.fallingSaying.style.top = this.posY + "px";

        this.create()

        window.addEventListener('keydown', this.keyDown.bind(this))
    }

    create(){
        document.body.appendChild(this.fallingSaying)
        this.fallingSaying.innerHTML = ''
        this.fallingSaying.dataset.correctAnswer = this.correctAnswer
    }

    keyDown(e:KeyboardEvent){
            if(e.keyCode == 65){
                if(this.posX >= 300){
                    this.posX -= 200
                }
            }
            if(e.keyCode == 68){
                if(this.posX <= 300){
                    this.posX += 200
                }
            }
        
    }
    
    move(){
        this.posY += 4 //speed of falling saying
        this.fallingSaying.style.transform = `translate(${this.posX}px, ${this.posY}px)`
        // console.log(this.posY);

        if(this.posY > 500){
            this.posY = 0
        }
        
    }

    update(){
        // this.fall()
        this.move()
    }

    public getRectangle() {
        return this.fallingSaying.getBoundingClientRect()
    }

    getInnerHtml(){
        return this.fallingSaying.innerHTML
    }

    setInnerHtml(string : string){
        this.fallingSaying.innerHTML = string
    }

    getDataSet(){
        return this.fallingSaying.dataset.correctAnswer
    }

    setDataSet(number : any){
        this.fallingSaying.dataset.correctAnswer = number
    }

    resetPos(){
        this.posY = 0;
    }
}