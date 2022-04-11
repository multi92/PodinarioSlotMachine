function SlotItems() {
    this.slotItemsArray = [
        //
        new SlotItem("cherry", 0, 0, 10),
        new SlotItem("plum", 1, 0, 25),
        new SlotItem("bell", 2, 0, 30),
        new SlotItem("clover", 3, 0, 50),
        //
        new SlotItem("lemon", 0, 1, 100),
        new SlotItem("coin", 1, 1, 600),
        new SlotItem("bar", 2, 1, 700),
        new SlotItem("apple", 3, 1, 800),
        //
        new SlotItem("heart", 0, 2, 1000),
        new SlotItem("pineapple", 1, 2, 1500),
        new SlotItem("diamond", 2, 2, 2000),
        new SlotItem("orange", 3, 2, 2500),
        //
        new SlotItem("lucky", 0, 3, 5000),
        new SlotItem("unknown", 2, 3, 10000),
        new SlotItem("watermelon", 3, 3, 15000),
        new SlotItem("seven", 1, 3, 20000),
    ];

    

    this.getSlotItem = (key) => {
        let result = null;
        this.slotItemsArray.forEach(element => {
            if (element.key === key) result = element;
           
        });
        if (result === null) throw new Error("Slot item with that key doesn't exists");
        return result
       
    
    };

    this.getRandomItem = () => {
        return this.slotItemsArray[Math.floor(Math.random() * this.slotItemsArray.length)];
    }
}