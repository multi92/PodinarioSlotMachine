function SoundManager(){
    this.play = (soundObject, loop = false, volume = 1) => {
        let sound = this.getSoundHTMLObject(soundObject);
        sound.src = soundObject.fullPath();
        sound.volume = volume;
        sound.play();
    }

    /*this.stop = () => {
        this.sound.pause();
    }*/

    this.getSoundHTMLObject = (obj) => {
        let sound = document.querySelector(obj.selectorId())
        if(!sound) return this.createHTMLObject(obj)
        else return sound;
    }

    this.createHTMLObject = (obj) => {
        let sound = document.createElement("audio");
        sound.id = obj.name;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);

        return sound;
    }
}