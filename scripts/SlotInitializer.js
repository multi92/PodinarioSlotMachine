function SlotInitializer(columns){
    this.columns = columns;
    let itemsArray = new SlotItems();

    this.initializeArray = (rows) => {
        let result = [];
        if(rows <= 0 || typeof rows  !== "number") throw new Error("Numbers of rows to generate is to low");

        for(let i = 0; i < rows; i++){
            if(columns <= 3){
                if(i === (rows - 2)){
                    result.push(this.createRowArray(new PrizeGenerator().generatePrize()));
                    continue
                }
            }
            else{
                if(i === (rows - 1) || i === (rows - 2) || i === (rows - 3) ){
                    result.push(this.createRowArray(new PrizeGenerator().generatePrize()));
                    continue
                }
            }

            let rowArray = this.createRowArray();
            result.push(rowArray);
        }

        return result;
    }

    this.initializeRandomArray = (rows) => {
        let result = []
        for(let i = 0; i < rows; i++ ) result.push(this.createRowArray());
        return result;
    }

    this.createRowArray = (item = null) => {
        let rowArray = [];
        for(let i = 0; i < this.columns; i++){
            if(!item) rowArray.push(itemsArray.getRandomItem());
            else rowArray.push(item);
        }

        return rowArray;
    }
}