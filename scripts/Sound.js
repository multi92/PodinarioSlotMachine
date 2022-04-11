function Sound(name, extension) {
    this.path = 'sounds/';
    this.name= name
    this.extension = extension;

    this.fullPath = () => {
        return this.path + this.name + '.' + this.extension
    }

    this.selectorId = () => {
        return "#" + this.name;
    }
}