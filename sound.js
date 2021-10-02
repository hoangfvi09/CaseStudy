class Sound {
    sound;
    src;
    constructor(src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.sound.loop=false
        this.sound.volume=0.1
        this.sound.playbackRate=1
    }

    play(){
        this.sound.play();
    }
    stop(){
        this.sound.pause();
    }
    loop(){
        this.sound.loop=true
    }
    speedUp(){
        this.sound.playbackRate+=0.15
    }
}
let gainCoin=new Sound('sound/gainCoin.m4a')
gainCoin.speedUp()
let fail=new Sound('sound/fail.m4a')
let background= new Sound('sound/background.m4a')
let crash=new Sound('sound/crash.m4a')