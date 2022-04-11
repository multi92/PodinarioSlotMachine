function Game(columns) {
  //Object initialization
  //slot init
  let slotInitializer = new SlotInitializer(columns);
  //credits init
  let credits = new Credits(moneyOnStart);
  //sound menager init
  let soundManager = new SoundManager();
  //content init
  let contentCreator = new StaticContentCreator();
  //items init
  let items = null;
  //newPos
  let newPos = 0;
  //Offset position
  let positionOffset = 40;

  //function initialize before start spin
  this.initialize = () => {
    //Game.createStartScreen()
    this.createStartScreen();
    //executes code inside block until the program is stopped
    //draw the internal environment of the slot machine
    //p5.js draw()
    contentCreator.draw();
    contentCreator.updateCredits(credits);
  };

  this.setDefaultVariables = () => {
    this.setSpinningSpeed(
      //'fast'->config.js
      spinningSpeed.FAST
    );
    newPos = 0;
    items = null;
    //primitivni tip vrednosti null (string, number, boolean, undefined, null, symbol)
    //referentni tip vrednosti(objekat, array, Map, WeekMap, Set, WeekSet)
  };
  //Game.changeBet
  this.changeBet = (amount) => {
    //sounds.CLICK->config.js
    soundManager.play(sounds.CLICK);
    //credits.bet(config.js->bet) + amount
    credits.changeBet(credits.bet + amount);
    contentCreator.updateCredits(credits);
  };

  this.setSpinningSpeed = (option) => {
    switch (option) {
      //fast case
      case spinningSpeed.FAST:
        positionOffset = 40;
        break;
      case spinningSpeed.MID:
        positionOffset = 20;
        break;
      case spinningSpeed.SLOW:
        positionOffset = 10;
        break;
    }
    //   console.log(spinningSpeed);
    //   console.log(positionOffset);
  };

  this.createStartScreen = () => {
    //columns 3  -> 3 array
    let items = slotInitializer.initializeRandomArray(3);
    //execute for every index element
    items.forEach((row, index) => {
      //positining yElement
      let yOffsetPos = index * icon.SIZE - 50;
      row.forEach((el, index) => {
        //positioning of icon
        el.drawIcon(index * icon.SIZE, newPos + yOffsetPos);
        //  console.log(items);
        //   console.log(el);
      });
    });
  };
  //////HEREEEEEE
  this.startAnimation = () => {
    //rect of items x = 0; y = 0; width = config.js(main.board); height = config.js(main.board)
    ctx.clearRect(0, 0, width, height);
    contentCreator.createLines();

    newPos += positionOffset;

    items.forEach((row, index) => {
      //position of last element index * icon.size
      let yOffsetPos = -index * icon.SIZE;
      // console.log(-index);
      //truu loop row and draw icon with newPos
      row.forEach((el, index) => {
        el.drawIcon(index * icon.SIZE, newPos + yOffsetPos);
      });

      //   console.log(row);
    });

    this.changeSpeedValue();
    //positioning items when the spin ending(half of items must see)
    if (newPos > items.length * icon.SIZE - 285) this.endOfSpinning(items);
    //when timer expired
    else setTimeout(this.startAnimation, animationSpeed);
  };

  this.changeSpeedValue = () => {
    //set spining speed fast->slow
    //if newPos(9320>8347)->spinningSpeed->mid
    if (newPos > (items.length * icon.SIZE) / 1.15)
      this.setSpinningSpeed(spinningSpeed.MID);
    //if newPos(9320>8727)->spinningSpeed->slow
    if (newPos > (items.length * icon.SIZE) / 1.1)
      this.setSpinningSpeed(spinningSpeed.SLOW);
    //console.log(items.length);
    // console.log(newPos);
  };

  this.endOfSpinning = (items) => {
    if (columns <= 3) this.checkForWin([items[items.length - 2]]);
    else
      this.checkForWin([
        items[items.length - 2],
        items[items.length - 1],
        items[items.length - 3],
      ]);
    //   console.log(columns);
    //   console.log(items.length);

    this.changeButtonState(false);
  };

  this.checkForWin = (rows) => {
    let potentialPrize = 0;

    rows.forEach((el, index) => {
      let rowLength = el.length;
      let isRowWinning = true;
      //row length = 6
      for (let i = 1; i < rowLength - 1; i++) {
        //if el(4) != el(5) == win = false
        //if rowLength == el[i] == isRowWinning = true;
        if (el[i - 1] !== el[i]) {
          isRowWinning = false;
          break;
        }
      }
      //try
      // console.log(el);
      // console.log(isRowWinning);
      // console.log(rowLength);
      // console.log(el.length);

      if (isRowWinning) {
        switch (index) {
          case 0:
            let multiplier = 0.75;
            if (columns <= 3) multiplier = 1;
            potentialPrize += el[0].value * multiplier;
            break;
          case 1:
            potentialPrize += el[0].value * 0.5;
            break;
          case 2:
            potentialPrize += el[0].value * 0.25;
            break;
        }
        //try
        // console.log(columns);
        // console.log(potentialPrize);
        // console.log(el[0]);
      }
    });

    this.winHandler(Math.floor(potentialPrize));
  };

  this.winHandler = (prize) => {
    if (prize > 0) soundManager.play(sounds.COINS);
    if (prize * (credits.bet / 50) > 10000) soundManager.play(sounds.JACKPOT);
    credits.takePrize(prize * (credits.bet / 50));
    contentCreator.updateCredits(credits);
  };

  this.startSpinning = () => {
    soundManager.play(sounds.CLICK);
    try {
      credits.takePayment();
      contentCreator.updateCredits(credits);
      this.changeButtonState(true);
      this.setDefaultVariables();
      items = slotInitializer.initializeArray(48);
      soundManager.play(sounds.SPIN);
      this.startAnimation();
    } catch (error) {
      console.log("Not enought money", credits.credit);
    }
  };

  this.changeButtonState = (state) => {
    document.querySelector("#lotteryButton").disabled = state;
    document.querySelector("#betPlus").disabled = state;
    document.querySelector("#betMinus").disabled = state;
  };
}
