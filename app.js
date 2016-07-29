var game = {
  board: [],        // this will be a 2D array of dom nodes.
  currentPlayer: 'X',
  $statusMessage: null,
  size: 3,

  togglePlayer: function() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  },

  showCurrentPlayer: function() {
    this.$statusMessage.text('Current Player: ' + this.currentPlayer);
  },

  move: function(r, c) {
    this.board[r][c]
      .text(this.currentPlayer)
      .addClass(this.currentPlayer)
      .prop("disabled", true);
    this.togglePlayer();
    this.showCurrentPlayer();
  },

  buildGameBoard: function() {

    this.$statusMessage = $("#statusMessage");
    this.showCurrentPlayer();

    for (var r = 0; r < this.size; r++) {
      var $row = $("<div class='row'></div>");
      var row = [];
      for (var c = 0; c < this.size; c++) {
        var $button = $('<button class="btn btn-lg cell" onclick=game.move(' +
                        r + ',' + c + ')></button>');
        row.push($button);
        $row.append($button);
      }
      this.board.push(row);
      $("#board").append($row);
    }
  },

  reset: function() {
    $('.cell').text('?').removeClass('X O').prop('disabled', false);
    this.currentPlayer = 'X';
    this.showCurrentPlayer();
  }
};

$(function() {
  game.buildGameBoard();
  game.reset();
});
