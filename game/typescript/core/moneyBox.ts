class MoneyBox{

    posX:number;
    posY:number;

    constructor(posX:number = 10,posY:number = 50)
    {
        this.posX = posX;
        this.posY = posY;
    }

    setupMoneyBox(money:number)
    {
        let box = game.add.text("Geld: " + money);
    }

}