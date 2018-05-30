import Button = Phaser.Button;

class StoreScene extends Scene{

    powerUps:StoreItem[] = [];
    masks:StoreItem[] = [];

    powerText:Phaser.Text[] = [];
    maskText:Phaser.Text[] = [];

    preload()
    {
        this.load.image('arrow-button',"./img/arrow-button.png");
        this.load.image('mask-button',"./img/mask-button.png");
        this.load.image('store-button',"./img/store-button.png");
        this.load.image('power-button',"./img/power-button.png");
        this.load.image('power-up-button',"./img/power-up.png");
        this.load.image('mask_one',"./img/new-mask-1.png");
        this.load.image('mask_two',"./img/new-mask-2.png");
        this.load.image('mask_three',"./img/new-mask-3.png");
        this.load.image('fire-power-up',"./img/fire-power-up.png");
        this.load.image('money-power-up',"./img/money-power-up.png");

    }

    create()
    {
        this.setUpBackButton();

        this.setUpOptionBox();

        this.setUpMoneyBox();


        let itemBox = game.add.sprite(game.world.centerX,game.world.centerY + 100,this.createBlock(350,600,'#C70000'));
        itemBox.anchor.setTo(0.5,0.5);
        this.setUpPowerGroup(itemBox);
        this.setUpMaskGroup(itemBox);



    }

    private setUpOptionBox() {
        let optionBox = game.add.sprite(game.world.centerX, game.world.centerY - 200, this.createBlock(50, 300, '#C70000'));
        optionBox.anchor.setTo(0.5, 0.5);

        let powerUp = game.add.button(optionBox.centerX - 50, optionBox.centerY, 'power-up-button', () => this.changeToPowerItems());
        powerUp.scale.setTo(0.02, 0.02);
        powerUp.anchor.setTo(0.5, 0.5);

        let maskPower = game.add.button(optionBox.centerX + 50, optionBox.centerY, 'mask-button', () => this.changeToMaskItems());
        maskPower.scale.setTo(0.02, 0.02);
        maskPower.anchor.setTo(0.5, 0.5);
    }

    private setUpMoneyBox() {
        let moneyBox = game.add.sprite(game.world.centerX, game.world.centerY - 125, this.createBlock(50, 250, '#C70000'));
        moneyBox.anchor.setTo(0.5, 0.5);

        let moneyText = game.add.text(moneyBox.centerX, moneyBox.centerY, "$ " + mainGame.getPlayerMoney());
        moneyText.anchor.setTo(0.5, 0.5);

        window.addEventListener('money_change',() => {
            moneyText.setText("$ " + String(mainGame.getPlayerMoney()));
        })
    }

    private setUpBackButton() {
        let backBox = game.add.sprite(game.world.centerX - 325 ,game.world.centerY - 250,this.createBlock(50,100,'#C70000'));
        backBox.anchor.setTo(0.5,0.5);

        let backButton = game.add.button(backBox.centerX, backBox.centerY, 'arrow-button', () => {
            this.switchScenes('playScene');
        }, this);
        backButton.scale.setTo(0.1, 0.1);
        backButton.anchor.setTo(0.5, 0.5);
        backButton.rotation = 3.15;
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

    // private changeVisibiltyText(text:Phaser.Text[],val:boolean)
    // {
    //     for(let item of text){
    //
    //         item.visible = val;
    //     }
    // }

    private setUpPowerGroup(itemBox:Phaser.Sprite) {
        let firePower = new StoreItem("Vuur power",'fire-power-up',1000,itemBox,true,150,true);
        firePower.setUpItemActionOnClick(() => { mainGame.buyPower(firePower) });
        this.powerText.concat(firePower.getTextArray());
        this.powerUps.push(firePower);

        let moneyPower = new StoreItem("Meer geld","money-power-up",3000,itemBox,true,150,false);
        moneyPower.setUpItemActionOnClick(() => { mainGame.buyPower(moneyPower) });
        this.powerText.concat(moneyPower.getTextArray());
        this.powerUps.push(moneyPower);
    }


    private setUpMaskGroup(itemBox:Phaser.Sprite) {
        let mask_one = new StoreItem("Masker 1", "mask_one",1000,itemBox,false,150,true);
        mask_one.setUpItemActionOnClick(() => { mainGame.buyMask(mask_one) });
        this.maskText.concat(mask_one.getTextArray());
        this.masks.push(mask_one);

        let mask_two = new StoreItem("Masker 2", "mask_two",1000,itemBox,false,0,true);
        mask_two.setUpItemActionOnClick(() => { mainGame.buyMask(mask_two) });
        this.maskText.concat(mask_two.getTextArray());
        this.masks.push(mask_two);

        let mask_three = new StoreItem("Masker 3", "mask_three",1000,itemBox,false,150,false);
        mask_three.setUpItemActionOnClick(() => { mainGame.buyMask(mask_three) });
        this.maskText.concat(mask_three.getTextArray());
        this.masks.push(mask_three);

    }
}