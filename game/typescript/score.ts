class Score {
    streak : number
    posX : number
    posY : number
    constructor(){
        this.streak = 0
        this.posX = 20
        this.posY = 550
    }

    createNewBlock(y : number){
        let element = document.createElement('scoreBlock')
        document.body.appendChild(element)
        element.style.left = this.posX + 'px'
        element.style.top = y + 'px'
    }

    getStreak(){
        return this.streak
    }

    setStreak(int : number){
        this.streak = int
    }
}