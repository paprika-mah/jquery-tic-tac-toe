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

  showWinner: function() {
    this.$statusMessage.text('Player ' + this.currentPlayer + ' has won!');
  },

  showCat: function() {
    this.$statusMessage.text('CAT!!!');
  },

  checkForMatch: function($cell1, $cell2, $cell3) {
    return $cell1.text() === $cell2.text() &&
           $cell1.text() === $cell3.text() &&
           $cell1.text() !== '?';
  },

  isBoardFull: function() {
    for (var r=0; r<this.size; r++) {
      for (var c=0; c<this.size; c++) {
        if (this.board[r][c].text() === '?') {
          return false;
        }
      }
    }
    return true;
  },

  checkForEndOfGame: function() {
    var rowMatch  = this.checkForMatch(this.board[0][0], this.board[0][1], this.board[0][2]) ||
                    this.checkForMatch(this.board[1][0], this.board[1][1], this.board[1][2]) ||
                    this.checkForMatch(this.board[2][0], this.board[2][1], this.board[2][2]);
    var colMatch  = this.checkForMatch(this.board[0][0], this.board[1][0], this.board[2][0]) ||
                    this.checkForMatch(this.board[0][1], this.board[1][1], this.board[2][1]) ||
                    this.checkForMatch(this.board[0][2], this.board[1][2], this.board[2][2]);
    var diagMatch = this.checkForMatch(this.board[0][0], this.board[1][1], this.board[2][2]) ||
                    this.checkForMatch(this.board[0][2], this.board[1][1], this.board[2][0]);
    this.winner = rowMatch || colMatch || diagMatch;
    this.cat = !this.winner && this.isBoardFull();
    return this.winner || this.cat;
  },

  move: function(r, c) {
    this.board[r][c]
      .text(this.currentPlayer)
      .addClass(this.currentPlayer)
      .prop("disabled", true);

    if (this.checkForEndOfGame() === false) {
      this.togglePlayer();
      this.showCurrentPlayer();
    }
    else if (this.winner) {
      this.showWinner();
      $('.cell').prop("disabled", true);
    }
    else {
      this.showCat();
    }
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
    this.winner = false;
    this.cat = false;
    this.showCurrentPlayer();
  },

//  halDynamicHTML: function() {
//    for (var r = 0; r < this.size; r++) {
//      var $row = $("<div class='row'></div>");
//      var row = [];
//      for (var c = 0; c < this.size; c++) {
//         var $button = $('<button class="btn btn-lg cell" onclick=game.move(' + r + ',' + c + ')></button>');
//         row.push($button);
//         $row.append($button);
//         console.log(row);
//         console.log($row.append);
//       }
//      this.board.push(row);
//      $("#halIdSample").append($row);
//    }
//  }
//};
//
$(function() {
  game.buildGameBoard();
  game.reset();
  game.halDynamicHTML();
});
