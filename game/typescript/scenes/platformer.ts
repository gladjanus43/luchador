class Platformer extends Scene {
    activeLevel:MakePlatformLevel;
    levels:MakePlatformLevel[] = [];

    constructor()
    {
        super();

        this.levels.push(new MakePlatformLevel(this,'background',{x:0,y:500},[
            {
                x:150,
                y:500,
                key: 'island-1'
            },
            {
                x:250,
                y:400,
                key: 'island-1'
            },
            {
                x:550,
                y:350,
                key: 'island-1'
            },
            {
                x:480,
                y:235,
                key: 'island-1'
            }
        ],'level2-change'));

        this.levels.push(new MakePlatformLevel(this,'background-1',{x:750,y:300},[
            {
                x:600,
                y:500,
                key:'island-2'
            },
            {
                x:500,
                y:400,
                key:'island-2'
            },
            {
                x:350,
                y:450,
                key:'island-1'
            },
            {
                x:250,
                y:350,
                key:'island-2'
            },
            {
                x:75,
                y:250,
                key:'island-1'
            },
            {
                x:200,
                y:175,
                key:'island-1'
            },
            {
                x:450,
                y:125,
                key:'island-2'
            }
        ],'level3-change'));


        this.levels.push(new MakePlatformLevel(this,'background-2',{x:0,y:0},[
            {
                x:150,
                y:500,
                key: 'island-3'
            },
            {
                x:250,
                y:200,
                key: 'island-2'
            },
            {
                x:550,
                y:350,
                key: 'island-1'
            },
            {
                x:450,
                y:235,
                key: 'island-2'
            },
            {
                x:760,
                y:230,
                key: 'island-1'
            }
        ],false));

        this.activeLevel = this.levels[0];
    }

    preload()
    {
        this.load.image('background',"./img/background-3.jpg");
        this.load.image('background-1',"./img/background.jpg");
        this.load.image('background-2',"./img/background-2.jpg");
        this.load.image('arrow-button',"./img/arrow-button.png");
        this.load.image('quit',"./img/quit.png");
        this.load.image('restart',"./img/restart.png");
        this.load.image('island-1',"./img/island-1.png");
        this.load.image('island-2',"./img/island-2.png");
        this.load.image('island-3',"./img/island-3.png");
        this.load.image('end-platform',"./img/end-platform.png");
        this.load.image('flag',"./img/flag.png");
        this.load.image('ground',"./img/ground.png");
    }

    create()
    {
        this.activeLevel.setupLevel();

        document.body.addEventListener('level2-change',() => {
            setTimeout(() => {
                this.changeLevel(1)
            }, 500)
        });


        document.body.addEventListener('restart_game',() => {
            setTimeout(() => {
                this.world.removeAll(true);
                this.activeLevel.setupLevel();
            }, 500)
        });

        document.body.addEventListener('quit_game',() => {
            setTimeout(() => {
                this.switchScenes('minigames');
            }, 500)
        });


        document.body.addEventListener('level3-change',() => {
            setTimeout(() => {
                this.changeLevel(2)
            }, 500)
        });

    }

    update()
    {
        this.activeLevel.update();
    }

    changeLevel(level:number)
    {
        this.world.removeAll(true);
        this.activeLevel = this.levels[level];
        this.activeLevel.setupLevel();
    }
}