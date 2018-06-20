import Button = Phaser.Button;

class StoreScene extends Scene{

    powerUps:StoreItem[] = [];
    masks:StoreItem[] = [];

    powerText:Phaser.Text[] = [];
    maskText:Phaser.Text[] = [];

    messageBox:Sprite;

    constructor()
    {
        super();
    }

    preload()
    {
        this.load.image('arrow-button',"./img/arrow-button.png");
        this.load.image('mask-button',"./img/mask-button.png");
        this.load.image('store-button',"./img/store-button.png");
        this.load.image('power-button',"./img/power-button.png");
        this.load.image('power-up-button',"./img/power-up.png");
        this.load.image('horn',"./img/new-mask-1.png");
        this.load.image('ex',"./img/new-mask-2.png");
        this.load.image('star',"./img/new-mask-3.png");
        this.load.image('fire-power-up',"./img/fire-power-up.png");
        this.load.image('money-power-up',"./img/money-power-up.png");

    }

    create()
    {
        this.messageBox = this.createTextBlock('Niet genoeg geld',80,400);
        this.messageBox.visible = false;
        this.game.stage.backgroundColor = '#e5f4e5';
        this.setUpBackButton();
        this.setUpOptionBox();
        this.setUpMoneyBox();
        let itemBox = game.add.sprite(game.world.centerX,game.world.centerY + 100,this.createBlock(350,600,'#c1e5c1'));
        itemBox.anchor.setTo(0.5,0.5);
        this.setUpPowerGroup(itemBox);
        this.setUpMaskGroup(itemBox);

        this.notEnoughFunds();
    }

    private setUpOptionBox() {
        let optionBox = game.add.sprite(game.world.centerX, game.world.centerY - 200, this.createBlock(50, 300, ''));
        optionBox.anchor.setTo(0.5, 0.5);

        let powerUp = game.add.button(optionBox.centerX - 50, optionBox.centerY, 'power-up-button', () => this.changeToPowerItems());
        powerUp.scale.setTo(0.02, 0.02);
        powerUp.anchor.setTo(0.5, 0.5);
        new Phasetips(this.game,{
            targetObject: powerUp,
            context: 'Krachten',
            strokeColor: '#c1e5c1',
            x:powerUp.left - 10,
            y:powerUp.centerY + 20
        });

        let maskPower = game.add.button(optionBox.centerX + 50, optionBox.centerY, 'mask-button', () => this.changeToMaskItems());
        maskPower.scale.setTo(0.02, 0.02);
        maskPower.anchor.setTo(0.5, 0.5);
        new Phasetips(this.game,{
            targetObject: maskPower,
            context: 'Maskers',
            strokeColor: '#c1e5c1',
            x:maskPower.left - 10,
            y:maskPower.centerY + 20
        });
    }

    private setUpMoneyBox() {
        let moneyBox = game.add.sprite(game.world.centerX, game.world.centerY - 125, this.createBlock(50, 250, '#afddaf'));
        moneyBox.anchor.setTo(0.5, 0.5);

        let moneyText = game.add.text(moneyBox.centerX, moneyBox.centerY, "$ " + mainGame.getPlayerMoney());
        moneyText.anchor.setTo(0.5, 0.5);

        window.addEventListener('money_change',() => {
            moneyText.setText("€" + String(mainGame.getPlayerMoney()));
        })
    }

    private setUpBackButton() {
        let backBox = game.add.sprite(game.world.centerX - 325 ,game.world.centerY - 250,this.createBlock(50,100,''));
        backBox.anchor.setTo(0.5,0.5);

        let backButton = game.add.button(backBox.centerX, backBox.centerY, 'arrow-button', () => {
            this.switchScenes('playScene');
        }, this);
        backButton.scale.setTo(0.1, 0.1);
        backButton.anchor.setTo(0.5, 0.5);
        backButton.rotation = 3.15;

        new Phasetips(this.game,{
            targetObject: backButton,
            context: 'terug',
            strokeColor: '#c1e5c1',
            x:backButton.left - 10,
            y:backButton.centerY + 20
        });
    }

    private changeToMaskItems():void
    {
        this.changeVisibilityItems(this.powerUps,false);
        this.changeVisibilityItems(this.masks,true);

    }

    private changeToPowerItems()
    {
        this.changeVisibilityItems(this.masks,false);
        this.changeVisibilityItems(this.powerUps,true);

    }


    private changeVisibilityItems(items:StoreItem[],val:boolean)
    {
        for(let item of items){
            item.changeVisibility(val);
            item.changeVisibilityText(val);
        }
    }

    private setUpPowerGroup(itemBox:Phaser.Sprite) {
        let firePower = new StoreItem("Vuur power",'fire-power-up',1000,itemBox,true,150,true);
        firePower.powerName = 'fire';

        let check = MainGame.ownedPowers.find((power) => {
            return power.powerName == firePower.powerName;
        });

        if(check === undefined){
            firePower.setUpItemActionOnClick(() => { mainGame.buyPower(firePower) },() => {this.notEnoughFunds(true)} ,this.messageBox);
        }else{
            firePower.disableItem();
        }

        this.powerText.concat(firePower.getTextArray());
        this.powerUps.push(firePower);

        let moneyPower = new StoreItem("Meer geld","money-power-up",3000,itemBox,true,150,false);
        moneyPower.powerName = 'money';

        let check_two = MainGame.ownedPowers.find((power) => {
            return power.powerName == moneyPower.powerName;
        });

        if(check_two === undefined){
            moneyPower.setUpItemActionOnClick(() => { mainGame.buyPower(moneyPower) },() => {this.notEnoughFunds(true)} ,this.messageBox);
        }else{
            moneyPower.disableItem();
        }

        moneyPower.setUpItemActionOnClick(() => { mainGame.buyPower(moneyPower) },() => {this.notEnoughFunds(true)} ,this.messageBox);
        this.powerText.concat(moneyPower.getTextArray());
        this.powerUps.push(moneyPower);
    }


    private setUpMaskGroup(itemBox:Phaser.Sprite) {
        let mask_one = new StoreItem("Masker 1", "horn",1000,itemBox,false,150,true);
        mask_one.maskName = 'horn';
        let check_one = MainGame.ownedMasks.find((mask) => {
            return mask.maskName == mask_one.maskName;
        });

        if(check_one === undefined){
            mask_one.setUpItemActionOnClick(() => { mainGame.buyMask(mask_one) },() => {this.notEnoughFunds(true)} ,this.messageBox);
        }else{
            mask_one.disableItem()
        }

        this.maskText.concat(mask_one.getTextArray());
        this.masks.push(mask_one);

        let mask_two = new StoreItem("Masker 2", "star",1000,itemBox,false,0,true);
        mask_two.maskName = 'star';

        let check_two = MainGame.ownedMasks.find((mask) => {
            return mask.maskName == mask_two.maskName;
        });


        if(check_two === undefined){
            mask_two.setUpItemActionOnClick(() => { mainGame.buyMask(mask_two) },() => {this.notEnoughFunds(true)} ,this.messageBox);
        }else{
            mask_two.disableItem()
        }

        mask_two.setUpItemActionOnClick(() => { mainGame.buyMask(mask_two) },() => {this.notEnoughFunds(true)} ,this.messageBox);
        this.maskText.concat(mask_two.getTextArray());
        this.masks.push(mask_two);

        let mask_three = new StoreItem("Masker 3", "ex",1000,itemBox,false,150,false);
        mask_three.maskName = 'ex';
        let check_three = MainGame.ownedMasks.find((mask) => {
            return mask.maskName == mask_three.maskName;
        });

        if(check_three === undefined){
            mask_three.setUpItemActionOnClick(() => { mainGame.buyMask(mask_three) },() => {this.notEnoughFunds(true)} ,this.messageBox);
        }else{
            mask_three.disableItem()
        }
        this.maskText.concat(mask_three.getTextArray());
        this.masks.push(mask_three);

    }

    notEnoughFunds(visible:boolean)
    {
        this.messageBox.x = 575;
        this.messageBox.y = 50;
        this.messageBox.visible = visible;
    }


}