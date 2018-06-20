class StoreItem {

    private _price:number;
    private storeItem:Phaser.Button;
    private textArray:Phaser.Text[] = [];


    constructor(title:string,imgKey:string,price:number, itemBox:Phaser.Sprite, visible:boolean = true, xOffset:number,operator:boolean)
    {
        this._price = price;

        if(operator){
            this.storeItem = game.add.button(itemBox.centerX - xOffset,itemBox.centerY,imgKey);
        }else{
            this.storeItem = game.add.button(itemBox.centerX + xOffset,itemBox.centerY,imgKey);
        }

        this.storeItem.anchor.setTo(0.5,0.5);
        this.storeItem.scale.setTo(0.07,0.07);
        this.storeItem.visible = visible;

        let topText = game.add.text(this.storeItem.centerX,this.storeItem.centerY - this.storeItem.height / 1.8 ,title);
        topText.anchor.setTo(0.5,0.5);
        topText.visible = visible;

        let bottomText = game.add.text(this.storeItem.centerX,this.storeItem.centerY + this.storeItem.height / 1.5,'$' + String(this.price));
        bottomText.anchor.setTo(0.5,0.5);
        bottomText.visible = visible;

        this.textArray.push(topText);
        this.textArray.push(bottomText);
    }

    setUpItemActionOnClick(callback:any,callback_two:any,sprite:Sprite)
    {
        sprite.visible = false;
        this.storeItem.events.onInputUp.add(() => this.buyItem(callback,callback_two));
    }

    scaleStoreItem(scale:number)
    {
        this.storeItem.scale.set(scale);
    }

    buyItem(callback:any,callback_two:any)
    {
        let spendMoney = new Event('money_change');
        if(mainGame.getPlayerMoney() >= this.price){
            this.disableItem();
            mainGame.setPlayerMoney(mainGame.getPlayerMoney() - this.price);
            window.dispatchEvent(spendMoney);

            callback();
        }else{
            callback_two();
        }
    }

    public disableItem() {
        this.storeItem.inputEnabled = false;
        this.storeItem.tint = 0x1BC500;
    }

    getButtonObject()
    {
        return this.storeItem;
    }

    getTextArray()
    {
        return this.textArray;
    }

    get price(){
        return this._price;
    }

    changeVisibility(val:boolean){
        this.getButtonObject().visible = val;
    }

    changeVisibilityText(val:boolean)
    {
        for(let text of this.getTextArray()){
            text.visible = val;
        }
    }


}