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
    var moves = [];
    var winConditions = [];
    var winStatus = false;

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
            if (selectedSquare.textContent == '' && !winStatus) {

                // use a set of conditional statements to make selections for next player, color, etc...
                selectedSquare.style.color = (currentPlayer == "O") ? "red" : "black";
                selectedSquare.innerHTML = currentPlayer;
                playerTurn.innerText = (currentPlayer == "O") ? "It's X's Turn" : "It's O's Turn";
                currentPlayer = (currentPlayer == "X") ? "O" : "X";

                mapContents();
                winStatus = checkWinner(moves);
                if(winStatus){
                    console.log(winStatus);
                    selectedSquare.removeEventListener("click", function (){console.log("Trying to remove event listener");}, false);
                }
            }
            else if (checkStalemate(moves)) {
                alert("Game Over:  Please select Start Game if you wish to play again");
            }
            else if(winStatus){
                tttSquares[i].disable;
                alert(playerTurn.innerText.substring(0,1) + " has won. To play again, select the Start Game button");
            }
            else {
                alert("Square " + (i + 1) + " is taken and no longer available for play!"); //reference square number from index i in for loop
            }

            if (checkStalemate(moves)) {
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
        winStatus = false;
    };

    //create new array that shows all of the selections made on the game board
    function mapContents() {
        moves = array.map(function (id) {
            if (options.includes(document.getElementById(id).innerHTML)) {
                return document.getElementById(id).innerHTML;
            }
            else {
                return "-"; //if no X or O, replace with a -
            }
        });
    };

    //checks to see if any '-' still exist in the board array
    function checkStalemate(outcome) {
        count = 0;
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

    // couldn't get to an analytical solution to the pattern so create an array that holds the square numbers of the winning positions
    function checkWinner(currentBoard) {
        arrWinningPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        currentBoard = currentBoard.join("");
        placeHolder = "";
        winner = false;

        for (i = 0; i < 8; i++) {
            for (j = 0; j < 3; j++) {
                placeHolder += currentBoard.charAt(arrWinningPositions[i][j]); //use the charAt method to get characters on the board
            }
            winConditions[i] = placeHolder;
            placeHolder = "";
        }
        winConditions.forEach(function (combo) {
            if (combo == "XXX") {
                playerTurn.innerText = "X Wins!!!!"
                winner = true;
            }
            else if (combo == "OOO") {
                playerTurn.innerText = "O Wins!!!!"
                winner = true;
            }
        })
        return winner;
    }

    //my attempt at looking for an anlytical solution to the winConditions array but got stuck on the 2nd and 3rd column pattern
    // function checkWinner(currentBoard) {
    //     var placeHolder = "";
    //     var k = [0, 2, 4, 0, 1, 2, 0, 0];
    //     var index;
    //     for (i = 0; i < 7; i++) {
    //         if (i < 3) {
    //             for (j = 0; j < 3; j++) {
    //                 placeHolder += currentBoard[i + j + k[i]];
    //             }
    //         }
    //         else if (i > 2 && i < 6) {
    //             for (j = 0; j <3; j++) {
    //                 index = i*j+k[i];
    //                 placeHolder += currentBoard[index];
    //             }

    //         }
    //         winConditions[i] = placeHolder;
    //         console.log(winConditions);
    //         placeHolder = "";
    //     }

    // };
});
