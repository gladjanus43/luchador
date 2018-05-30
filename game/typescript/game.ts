
let game:Phaser.Game;
let homeScene:HomeScene;
let playScene:PlayScene;
let settingScene:SettingScene;
let storeScene:StoreScene;
let mainGame:MainGame;

class MainGame{

    private playerMoney:number = 10000;
    private ownedMasks:StoreItem[] = [];
    private ownedPowers:StoreItem[] = [];


    constructor()
    {
        homeScene = new HomeScene();
        playScene = new PlayScene();
        settingScene = new SettingScene();
        storeScene = new StoreScene();

        game = new Phaser.Game(800, 600, Phaser.AUTO,'',{
            preload:this.preload,
            create:this.create,
            update:this.update
        });
    }

    public getOwnedMasks()
    {
        return this.ownedMasks;
    }

    public buyMask(mask:StoreItem)
    {
        this.ownedMasks.push(mask);
    }

    public getOwnedPowers()
    {
        return this.ownedPowers;
    }

    public buyPower(power:StoreItem)
    {
        console.log("Power added");
        console.log("test",this);
        this.ownedPowers.push(power);
    }

    public getPlayerMoney()
    {
        return this.playerMoney;
    }

    public setPlayerMoney(money:number)
    {
        if(this.getPlayerMoney() >= 0)
        {
            this.playerMoney = money
        }
    }

    preload()
    {
        game.load.image('speech-bubble',"./img/speech-bubble.png");
    }

    create()
    {
        game.state.add('homeScene',homeScene);
        game.state.add('playScene',PlayScene);
        game.state.add('settingScene',SettingScene);
        game.state.add('storeScene',StoreScene);
        game.state.start('homeScene');
    }

    update()
    {

    }
}


window.onload = () => {   
    mainGame = new MainGame();
};