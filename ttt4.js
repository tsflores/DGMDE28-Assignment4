/*JavaScript code that will
  1.  Randomly select a starting player for the game
  2.  Place an X or an O on a selected square based on the correct identification of a player's turn
  3.  Alert the player on whose turn it is
  4.  Alert the player if a square is already taken
*/

//execute once the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {

    const tttSquares = document.getElementsByClassName("square"); //get all div's with a class name of square
    var currentPlayer = Math.random() > 0.5 ? "X" : "O"; //conditional operator where random number generated that is > 0.5 sets currentPlayer as X
    const playerTurn = document.getElementById("turn");  //variable to change text alerting user of turn

    // Set the initial text to indicate who starts the game based on the currentPlayer
    if (currentPlayer == "O") {
        playerTurn.innerText = "O Starts the Game";
    }
    else{
        playerTurn.innerText = "X Starts the Game";
    }

    // loop through the squares and execute if else block following a 'click'
    for (let i = 0; i < tttSquares.length; i++) {
        tttSquares[i].addEventListener("click", function () {

            theSquareID = this.id;
            selectedSquare = document.getElementById(theSquareID);

            // conditional statement to make sure a square doesn't already have an X or an O
            if (selectedSquare.textContent == '') {
                if (currentPlayer == "O") {
                    selectedSquare.innerHTML = 'O';
                    currentPlayer = "X";
                    playerTurn.innerText = "It's X's Turn";
                }
                else {
                    selectedSquare.innerHTML = 'X';
                    currentPlayer = "O";
                    playerTurn.innerText = "It's O's Turn";
                }
            }
            else {
                alert("Square " + (i + 1) + " is taken and no longer available for play!"); //reference square number from index i in for loop
            }
        });
    };
});
