
describe('Game model', function() {
  var game;
  beforeEach(function() {
    game = new Game('0000000000000000');
    game.autoLoad();
  })

  it('contains an array of squares', function() {
    expect(game.squares.length).toEqual(4);
    expect(game.squares[0]).toEqual(jasmine.any(Square));
  })
  it('adds a square', function() {
    game.addSquare(1,1,8)
    expect(game.squares.length).toEqual(5)
    expect(game.squares[4]).toEqual(jasmine.any(Square))
  })
  // it('returns an array of location Numbers', function() {
  //   game.addSquare(1,1,8)
  //   expect(game.squares.length).toEqual(5)
  //   expect(game.squares[4]).toEqual(jasmine.any(Square))
  // })
})

describe('gameplay', function() {
  var game;
  beforeEach(function() {
    game = new Game();
    // game.autoLoad();
  })

  it('moves row with one square when swiped up', function() {
    var square = new Square(3,3,2);
    game.oneValue(square, 'up');
    expect(square.position()).toEqual([3,0]);
  })

  it('moves row with one square when swiped right', function() {
    var square = new Square(1,0,2);
    game.oneValue(square, 'right');
    expect(square.position()).toEqual([3,0]);
  })

  it('moves row with one square when swiped down', function() {
    var square = new Square(1,2,2);
    game.oneValue(square, 'down');
    expect(square.position()).toEqual([1,3]);
  })

  it('moves row with one square when swiped left', function() {
    var square = new Square(3,3,2);
    game.oneValue(square, 'left');
    expect(square.position()).toEqual([0,3]);
  })




  xit('moves row with two squares when swiped up', function() {
    var squareArray = [new Square(1, 0, 2), new Square(2, 0, 2)];
    game.twoValues(squareArray, 'up');
    expect(square.position()).toEqual([3,0]);
  })

  xit('moves row with two squares when swiped right', function() {
    var square = new Square(1,0,2);
    game.twoValues(squareArray, 'right');
    expect(square.position()).toEqual([3,0]);
  })

  xit('moves row with two squares when swiped down', function() {
    var square = new Square(1,2,2);
    game.twoValues(squareArray, 'down');
    expect(square.position()).toEqual([1,3]);
  })

  it('moves row with two squares when swiped left when the values are the same', function() {
    game = new Game('0000000000000000');
    game.addSquare(new Square(1, 0, 2));
    game.addSquare(new Square(2, 0, 2));
    // console.log(game.squares);
    // var squareArray = game.squares;
    game.twoValues(game.squares, 'left');
    console.log('Square 1: ' + game.squares[0]);
    expect(game.squares.length).toEqual(1);
    expect(game.squares[0]).toEqual(jasmine.any(Square));
    expect(game.squares[0].position()).toEqual([0, 0]);
    expect(game.squares[0].value).toEqual(4);
  })

  xit('moves row with two squares when swiped left when the values are different', function() {
    game = new Game('0000000000000000');
    game.addSquare(new Square(1, 0, 2));
    game.addSquare(new Square(2, 0, 2));
    console.log(game.squares);
    // var squareArray = game.squares;
    game.twoValues(game.squares, 'left');
    console.log('squares: ' + game.squares);
    expect(game.squares.length).toEqual(1);
    expect(game.squares[0].position()).toEqual([0, 0]);
    expect(game.squares[0].value).toEqual(4);
  })
})
