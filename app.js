var game = {
  board: [],        // this will be a 2D array of dom nodes.
  $board: null,     // this will be a jQuery object where the board is displayed.
  currentPlayer: 'X',

  togglePlayer: function() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  },

  move: function(r, c) {
    this.board[r][c]
      .text(this.currentPlayer)
      .addClass(this.currentPlayer)
      .prop("disabled", true);
    this.togglePlayer();
  },

  buildGameBoard: function() {
    for (var r = 0; r < 3; r++) {
      var $row = $("<div class='row'></div>");
      var row = [];
      for (var c = 0; c < 3; c++) {
        var $button = $('<button class="btn-lg cell" onclick=game.move(' +
                        r + ',' + c + ')></button>');
        row.push($button);
        $row.append($button);
      }
      this.board.push(row);
      this.$board.append($row);
    }
  }
};

$(function() {
  game.$board = $("#board");
  game.buildGameBoard();
});
