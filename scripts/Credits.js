function Credits(credits) {
    this.credit = credits;
    this.bet = bet.MIN_BET;
    this.lastWin = 0;

    //payment statement
    this.takePayment = () => {
        if (this.credit >= this.bet) this.credit -= this.bet;
        else throw new Error('NO CREDITS')
        // console.log(this.credit);
    }
    //prize statement 
    this.takePrize = (prize) => {
        if (typeof prize === 'number') {
            //vraca false
            this.lastWin = prize;
            this.credit += prize;
        }
        else throw new TypeError("Prize must be a number")
    }
    //bet stetement
    this.changeBet = (newBet) => {
        if (newBet >= bet.MIN_BET && newBet <= bet.MAX_BET)
            this.bet = newBet
        else throw new RangeError('Invalid bet range')
    }
}