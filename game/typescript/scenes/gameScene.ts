class GameScene extends Scene{

    preload()
    {

        MakeCharacter.loadCharacterAssets(this);
    }


    create()
    {
        let character = new MakeCharacter("sad");
        character.setMaskDecoration("mask-extra-ex",0,0);
        character.changePantsColor("#2be28a");
        character.changeShoesColor("#E00707");

        // character.makeCharacterCry();
        character.talk();

        let sprite = game.add.sprite(40, 100, 'mouths');

        sprite.animations.add('talk');

        sprite.animations.play('talk',5,true);

    }
}