
let game:Phaser.Game;
let homeScene:HomeScene;
let playScene:PlayScene;
let settingScene:SettingScene;
let platformer:Platformer;
let storeScene:StoreScene;
let minigames:MiniScene;
let gameScene:GameScene;
let mainGame:MainGame;
let fallingGameScene:FallGame;
let basketScene:BasketScene;

//nmsdhaufiuasn
class MainGame{

    private playerMoney:number = 15000;
    static ownedMasks:StoreItem[] = [];
    static ownedPowers:StoreItem[] = [];
    fallingGame : FallGame;
    static sayings:any;



    static character:any = {
      head:{
          color: "#00b0e7",
          mask: "ex",
          mouth: 4,
          decorationColor: "#C8AAD0"
      },
      pants:{
          color: "#00385d",
      },
      shoes:{
          color: "#004bbc"
      }
    };

    constructor()
    {
        homeScene = new HomeScene();
        playScene = new PlayScene();
        settingScene = new SettingScene();
        storeScene = new StoreScene();
        gameScene = new GameScene();
        platformer = new Platformer();
        minigames = new MiniScene();
        basketScene = new BasketScene();
        fallingGameScene = new FallGame();


        game = new Phaser.Game(800, 600, Phaser.AUTO,'content',{
            preload:this.preload,
            create:this.create,
            update:this.update
        });

        this.loadSayings();
    }

    public getOwnedMasks()
    {
        return MainGame.ownedMasks;
    }

    public buyMask(mask:StoreItem)
    {
        MainGame.ownedMasks.push(mask);
    }

    public getOwnedPowers()
    {
        return MainGame.ownedPowers;
    }

    public buyPower(power:StoreItem)
    {
        MainGame.ownedPowers.push(power);
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

    private loadSayings(){
        fetch("http://luchador.local/connection.php")
            .then(res => res.json())
            .then(res => this.pushSayings(res))
    }

    private pushSayings(results:any)
    {
        MainGame.sayings = results;
    }

    preload()
    {
        game.load.image('speech-bubble',"./img/speech-bubble.png");
        game.load.image('arrow-button',"./img/arrow-button.png");
        game.load.image('mask-button',"./img/mask-button.png");
        game.load.image('store-button',"./img/store-button.png");
        game.load.image('power-button',"./img/power-button.png");
        game.load.image('power-up-button',"./img/power-up.png");
        game.load.image('mask_one',"./img/new-mask-1.png");
        game.load.image('mask_two',"./img/new-mask-2.png");
        game.load.image('mask_three',"./img/new-mask-3.png");
        game.load.image('fire-power-up',"./img/fire-power-up.png");
        game.load.image('money-power-up',"./img/money-power-up.png");
    }

    create()
    {
        game.state.add('homeScene',homeScene);
        game.state.add('gameScene',gameScene);
        game.state.add('playScene',PlayScene);
        game.state.add('settingScene',SettingScene);
        game.state.add('storeScene',StoreScene);
        game.state.add('platformer',Platformer);
        game.state.add('minigames',minigames);
        game.state.add('basketScene',basketScene);
        game.state.add('fallgame',fallingGameScene);
        game.state.start('homeScene');
    }



    update()
    {

    }
}


window.onload = () => {   
    mainGame = new MainGame();
};