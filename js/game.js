function Game(boardString) {
  // Initialize board with empty squares array and fill board string with input or
  // newly made random board
  this.squares = [];
  if (boardString != null) {
    this.createSquaresFromInput(boardString);
  }

  this.boardString = boardString || this.initialize();
}

Game.prototype.addSquare = function(valueArr) {
  var x = valueArr[0];
  var y = valueArr[1];
  var value = valueArr[2];

  this.squares.push(new Square(x,y,value));
  return this;
};

Game.prototype.getRandomTwoOrFour = function() {
  if(Math.random() >= 0.9) {
    return 4;
  } else {
    return 2;
  }
};

Game.prototype.numberToLocation = function(num) {
  var x = (num-1)%4;
  var y = Math.floor((num-1)/4);
  return [x,y];
};

Game.prototype.locationsToNumber = function() {
  numLocations = [];
  this.squares.forEach(function(square, index){
    console.log(square.y);
    numLocations.push((square.y * 4) + square.x + 1);
  })
  return numLocations;
};

Game.prototype.locationToNumber = function(locArr) {
  return (locArr[1] * 4) + locArr[0] + 1;
};

Game.prototype.spotTaken = function(locArr) {
  return this.locationsToNumber().includes(this.locationToNumber(locArr))
}

Game.prototype.randomEmptySquare = function() {
  do {
    console.log("HERE");
    var randLoc = this.numberToLocation(Math.floor((Math.random() * 16) + 1));
    var randVal = this.getRandomTwoOrFour();
  }
  while (this.spotTaken(randLoc));

  return randLoc.concat(randVal);
}

Game.prototype.createSquaresFromInput = function(boardString) {
  for (var i=0; i< boardString.length; i++) {
    if (boardString[i] != '0') {
      var newPosition = this.numberToLocation(i+1);
      var newValue = parseInt(boardString[i]);
      this.addSquare([newPosition[0], newPosition[1], newValue]);
    }
  }
  return this;
}

// Takes array of this.squares and turns it into a single string
Game.prototype.boardArrayToString = function() {
  var boardArray = new Array(16);
  boardArray.fill(0)
  var game = this;
  this.squares.forEach(function(square) {
    var numLocation = game.locationToNumber(square.position());
    boardArray[numLocation - 1] = square.value;
  })
  return boardArray.join('');
}

Game.prototype.resetBoardString = function() {
  var boardArray = new Array(16);
  boardArray.fill(0);
  this.squares.forEach(function(square) {
    var numLocation = game.locationToNumber(square.position());
    boardArray[numLocation - 1] = square.value;
  })
  this.boardString = boardArray.join('');
  return this.boardString;
}

Game.prototype.removeSquare = function(squareInput) {
  var game = this;
  var squareLocation = this.squares.findIndex(function(square, index) {
    return game.locationToNumber(square.position()) == game.locationToNumber(squareInput.position())
  })
  this.squares.splice(squareLocation, 1);
  this.resetBoardString();
  return this;
}
// Initialize square values if not given
Game.prototype.initialize = function() {
  this.addSquare(this.randomEmptySquare()).addSquare(this.randomEmptySquare());
  return this.boardArrayToString();
}

Game.prototype.getSquaresByRows = function() {
  var squareArray = [[],[],[],[]];
  var game = this;
  this.squares.forEach(function(square) {
    if (game.locationToNumber(square.position()) < 5) {
      squareArray[0].push(square);
    } else if (game.locationToNumber(square.position()) < 9) {
      squareArray[1].push(square);
    } else if (game.locationToNumber(square.position()) < 13) {
      squareArray[2].push(square);
    } else {
      squareArray[3].push(square);
    }
  })
  return squareArray;
}







// Gameplay
Game.prototype.oneValue = function(squares, direction) {
  var square = squares[0];
  var x = square.x;
  var y = square.y;
  console.log("square.x: " + square.x)
  switch(direction) {
    case 'up':
      y = 0;
      break;
    case 'right':
      x = 3;
      break;
    case 'down':
      y = 3;
      break;
    case 'left':
      x = 0;
      break;
  }
  console.log('square: ' + square)
  console.log('square position: ' + square.position())
  square.move(x,y);
  this.resetBoardString();
  console.log("one value new position: " + square.position())
  return this;
}

// minor square is the square that will be smooshed by the major square
Game.prototype.twoValues = function(squareArr, direction, canMerge = true) {
  console.log(canMerge);
  console.log('squareArr: ' + squareArr);
  var minorSquare = squareArr[0];
  var minorX = minorSquare.x;
  var minorY = minorSquare.y;

  var majorSquare = squareArr[1];
  var majorX = majorSquare.x;
  var majorY = majorSquare.y;

  if (minorSquare.value === majorSquare.value && canMerge) {
    var newValue = minorSquare.value * 2;
    this.removeSquare(minorSquare);
    majorSquare.value = newValue;
    return this.oneValue([majorSquare], direction);
  } else {
  // console.log(square.position());
    switch(direction) {
      case 'up':
        minorY = 0;
        majorY = 1;
        break;
      case 'right':
        minorX = 3;
        majorX = 2;
        break;
      case 'down':
        minorY = 3;
        majorY = 2;
        break;
      case 'left':
        minorX = 0;
        majorX = 1;
        break;
    }
    minorSquare.move(minorX, minorY);
    console.log('minorSquare Position: ' + minorSquare.position());
    console.log('minorSquare Value: ' + minorSquare.value);

    majorSquare.move(majorX, majorY);
    console.log('majorSquare Position: ' + majorSquare.position());
    console.log('majorSquare Value: ' + majorSquare.value);
    this.resetBoardString();
    return this;
  }
}

// minor square is the square that will be smooshed by the major square
Game.prototype.threeValues = function(squareArr, direction, leftMerge = true, rightMerge = true) {
  console.log('squareArr: ' + squareArr);
  var minorSquare = squareArr[0];
  var minorX = minorSquare.x;
  var minorY = minorSquare.y;

  var middleSquare = squareArr[1];
  var middleX = middleSquare.x;
  var middleY = middleSquare.y;

  var majorSquare = squareArr[2];
  var majorX = majorSquare.x;
  var majorY = majorSquare.y;

  if (minorSquare.value === middleSquare.value && leftMerge) {
    var newValue = minorSquare.value * 2;
    this.removeSquare(minorSquare);
    middleSquare.value = newValue;
    this.oneValue([middleSquare], direction);
    return this.twoValues(this.squares, direction, false);
  } else if (middleSquare.value === majorSquare.value && rightMerge) {
    var newValue = middleSquare.value * 2;
    this.removeSquare(middleSquare);
    majorSquare.value = newValue;
    this.oneValue([majorSquare], direction);
    return this.twoValues(this.squares, direction, false);
  } else {
    switch(direction) {
      case 'up':
        minorY = 0;
        middleY = 1;
        majorY = 2;
        break;
      case 'right':
        minorX = 1;
        middleX = 2;
        majorX = 3;
        break;
      case 'down':
        minorY = 1;
        middleY = 2;
        majorY = 3;
        break;
      case 'left':
        minorX = 0;
        middleX = 1;
        majorX = 2;
        break;
    }
    minorSquare.move(minorX, minorY);
    middleSquare.move(middleX, middleY);
    majorSquare.move(majorX, majorY);
    this.resetBoardString();
    return this;
  }
}

// minor square is the square that will be smooshed by the major square
Game.prototype.fourValues = function(squareArr, direction) {
  var minorLeftSquare = squareArr[0];
  var minorLeftX = minorLeftSquare.x;
  var minorLeftY = minorLeftSquare.y;

  var majorLeftSquare = squareArr[1];
  var majorLeftX = majorLeftSquare.x;
  var majorLeftY = majorLeftSquare.y;

  var minorRightSquare = squareArr[2];
  var minorRightX = minorRightSquare.x;
  var minorRightY = minorRightSquare.y;

  var majorRightSquare = squareArr[3];
  var majorRightX = majorRightSquare.x;
  var majorRightY = majorRightSquare.y;

  if (minorLeftSquare.value === majorLeftSquare.value) {
    var newValue = minorLeftSquare.value * 2;
    this.removeSquare(minorLeftSquare);
    majorLeftSquare.value = newValue;
    this.oneValue([majorLeftSquare], direction);
    return this.threeValues(this.squares, direction, false, true);
  } else if (minorRightSquare.value === majorRightSquare.value) {
    var newValue = minorRightSquare.value * 2;
    this.removeSquare(minorRightSquare);
    majorRightSquare.value = newValue;
    this.oneValue([majorRightSquare], direction);
    return this.threeValues(this.squares, direction, true, false);
  } else {
    switch(direction) {
      case 'up':
        minorLeftY = 0;
        majorLeftY = 1;
        minorRightY = 2;
        majorRightY = 3;
        break;
      case 'right':
        minorLeftX = 0;
        majorLeftX = 1;
        minorRightX = 2;
        majorRightX = 3;
        break;
      case 'down':
        minorLeftY = 0;
        majorLeftY = 1;
        minorRightY = 2;
        majorRightY = 3;
        break;
      case 'left':
        minorLeftX = 0;
        majorLeftX = 1;
        minorRightX = 2;
        majorRightX = 3;
        break;
    }
    minorLeftSquare.move(minorLeftX, minorLeftY);
    majorLeftSquare.move(majorLeftX, majorLeftY);
    minorRightSquare.move(minorRightX, minorRightY);
    majorRightSquare.move(majorRightX, majorRightY);
    this.resetBoardString();
    return this;
  }
}

Game.prototype.getAction = function(direction) {
  var squareArray = this.getSquaresByRows();
  var game = this;
  squareArray.forEach(function(row) {
    switch (row.length) {
      case 1:
        game.oneValue(row, direction);
        break;
      case 2:
        game.twoValues(row, direction);
        break;
      case 3:
        game.threeValues(row, direction);
        break;
      case 4:
        game.fourValues(row, direction);
        break;
    }
  });
  return this;
}






// For testing purposes
Game.prototype.autoLoad = function() {
  this.addSquare(2,2,4);
  this.addSquare(0,0,4);
  this.addSquare(3,3,4);
  this.addSquare(0,1,4);
}
