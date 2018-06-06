
class SettingScene extends Scene{


    preload()
    {
        MakeCharacter.loadCharacterAssets(this);
    }

    create()
    {
        let character = new MakeCharacter('smile');
        character.setMaskDecoration("mask-extra-horn",0,0);
        character.changePantsColor("#2be28a");
        character.changeShoesColor("#E00707");

        setTimeout(() => {
            character.changeMaskDecoration('mask-extra-star',"#E00707");
            character.changeSingleEye('left','sad','white');
            character.changeSingleEye('right','devious','blue');

            let bubble = new SpeechBubble(character.getCharacterHead(),0.1,Phaser.RIGHT_CENTER);
            bubble.addTextToBubble("Ik heb Honger! dsasd asdda sadasda");
            console.log("dasssd");

        },1000);

         // new Spreekwoord(this.world.centerX,this.world.centerY);
    }

}