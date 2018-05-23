import HomeScene from "../scenes/homeScene";
import PlayScene from "../scenes/playScene";
import SettingScene from "../scenes/settingScene";

export default class MainGame extends Phaser.Game{
    constructor()
    {
        super(1000, 800, Phaser.AUTO, 'content',{
            "create": () => {
                this.state.add('HomeScene',HomeScene);
                this.state.add('PlayScene',PlayScene);
                this.state.add('SettingScene',SettingScene);

                this.state.start('HomeScene');
            }
        });
    }
}