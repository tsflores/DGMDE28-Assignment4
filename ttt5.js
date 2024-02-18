/*JavaScript code that will
  1.  Randomly select a starting player for the game
  2.  Place an X or an O on a selected square based on the correct identification of a player's turn
  3.  Alert the player on whose turn it is
  4.  Alert the player if a square is already taken
  5.  Determine whether a winner occurs or if game is a stalemate
  6.  Allow the player to restart the game
*/

//execute once the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {

    const tttSquares = document.getElementsByClassName("square"); //get all div's with a class name of square
    var currentPlayer;
    const playerTurn = document.getElementById("turn");  //variable to change text alerting user of turn
    const btn = document.getElementById("gameStatus");
    var array = ['sq0', 'sq1', 'sq2', 'sq3', 'sq4', 'sq5', 'sq6', 'sq7', 'sq8'];
    options = "OX".split('');

    startGame();

    btn.addEventListener("click", function () {
        document.querySelectorAll(".square").forEach(item => item.textContent = "");
        startGame();
    });

    // loop through the squares and execute following a 'click'
    for (let i = 0; i < tttSquares.length; i++) {
        tttSquares[i].addEventListener("click", function () {

            selectedSquare = document.getElementById(this.id);

            // conditional statement to make sure a square doesn't already have an X or an O
            if (selectedSquare.textContent == '') {

                // use a set o conditional statements to make selections for next player, color, etc...
                selectedSquare.style.color = (currentPlayer == "O") ? "red" : "black";
                selectedSquare.innerHTML = currentPlayer;
                playerTurn.innerText = (currentPlayer == "O") ? "It's X's Turn" : "It's O's Turn";
                currentPlayer = (currentPlayer == "X") ? "O" : "X";
                
                mapContents();
            }
            else if (checkStalemate(contents)) {
                alert("Game Over:  Please select Start Game if you wish to play again");
            }
            else {
                alert("Square " + (i + 1) + " is taken and no longer available for play!"); //reference square number from index i in for loop
            }

            if (checkStalemate(contents)) {
                playerTurn.innerText = "Outcome: Stalemate";
                playerTurn.style.color = '#7629DC';
                playerTurn.style.backgroundColor = "#D6B409";
            }
        });
    };

    // (re)starts game and randomly picks first player
    function startGame() {
        currentPlayer = Math.random() > 0.5 ? "X" : "O"; //conditional statement to select the starting player at random
        playerTurn.style.color = "#3E63E6";
        playerTurn.style.backgroundColor = "white";
        // Set the initial text to indicate who starts the game based on the currentPlayer
        if (currentPlayer == "O") {
            playerTurn.innerText = "O Starts the Game";
        }
        else {
            playerTurn.innerText = "X Starts the Game";
        }
    };

    //create new array that shows all of the selections made on the game board
    function mapContents() {
        contents = array.map(function (id) {
            if (options.includes(document.getElementById(id).innerHTML)) {
                return document.getElementById(id).innerHTML;
            }
            else {
                return "-"; //if no X or O, replace with a -
            }
        });
        contents = contents.join("");
    };

    //checks to see if any '-' still exist in the board array
    function checkStalemate(outcome) {
        count = 0;
        outcome = outcome.split('');
        outcome.forEach(function (letter) {
            if (options.includes(letter)) {
                count++;
            }
        })
        //if count = 9, board has no hyphens and game is a draw
        if (count == 9) {
            return true;
        }
    }
});
