function StaticContentCreator() {
  const { width, height } = mainBoard.getBoundingClientRect();

  this.draw = () => {
    this.createLabels();
    this.createLines();
  };

  this.createLines = () => {
    ctx.lineWidth = 5;
    //start position of line in mainBoard(separate slot items)
    let startPosition = 200;
    while (startPosition < width) {
      ctx.beginPath();
      ctx.moveTo(startPosition, 0);
      ctx.lineTo(startPosition, height);
      ctx.stroke();
      startPosition += 200;
      // console.log(width);
    }
    //begin function for create triangles in canvas
    this.createTriangles();
    if (width > 600) this.createAdditionalTriangles();
  };
  //triangles in canvasContainer
  this.createTriangles = () => {
    ctx.beginPath();
    ctx.moveTo(0, height / 2 - 20);
    ctx.lineTo(0, height / 2 + 20);
    ctx.lineTo(20, height / 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width, height / 2 - 20);
    ctx.lineTo(width, height / 2 + 20);
    ctx.lineTo(width - 20, height / 2);
    ctx.fill();
  };
  //triangles right side
  this.createAdditionalTriangles = () => {
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(0, 60);
    ctx.lineTo(20, 40);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width, 20);
    ctx.lineTo(width, 60);
    ctx.lineTo(width - 20, 40);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, height - 20);
    ctx.lineTo(0, height - 60);
    ctx.lineTo(20, height - 40);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width, height - 20);
    ctx.lineTo(width, height - 60);
    ctx.lineTo(width - 20, height - 40);
    ctx.fill();
  };
  //create control board CREDIT->BET INFO
  //const controlBoardCtx = controlBoard.getContext("2d");
  this.createLabels = () => {
    controlBoardCtx.clearRect(0, 0, width, 100);
    controlBoardCtx.font = "15px Consolas";
    controlBoardCtx.fillStyle = "white";
    controlBoardCtx.textAlign = "start";
    controlBoardCtx.fillText("CREDITS", 10, 15);
    controlBoardCtx.textAlign = "center";
    controlBoardCtx.fillText("BET", width / 2, 15);
    controlBoardCtx.textAlign = "end";
    controlBoardCtx.fillText("LAST WIN", width - 10, 15);
  };
  //UPDATE credits canvas 
  this.updateCredits = (credits) => {
    creditBoardCtx.clearRect(0, 0, width, 70);
    creditBoardCtx.font = "30px DigitalFont";
    creditBoardCtx.fillStyle = "white";
    creditBoardCtx.textAlign = "start";
    creditBoardCtx.fillText(credits.credit, 10, 50);
    creditBoardCtx.textAlign = "center";
    creditBoardCtx.fillText(credits.bet, width / 2, 50);
    creditBoardCtx.textAlign = "end";
    creditBoardCtx.fillText(credits.lastWin, width - 10, 50);
  };
}
