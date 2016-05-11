function Square(x, y, value) {
  this.x = x;
  this.y = y;
  this.value = value;
}

Square.prototype.position = function() {
  return [this.x,this.y];
}

Square.prototype.move = function(x,y) {
  this.x = x;
  this.y = y;
  return this.position();
}
