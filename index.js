$(document).ready(function() {
    // Array of words for the game
    var words = ["hangman", "javascript", "jquery", "programming", "computer"];

    var chosenWord = words[Math.floor(Math.random() * words.length)]; // Choose a random word
    var guessedLetters = [];
    var remainingGuesses = 6;

    // Display underscores for each letter of the chosen word
    for (var i = 0; i < chosenWord.length; i++) {
        $('#word-container').append('<div class="hidden-letter">_</div>');
    }

    // Function to update the display of guessed letters
    function updateGuesses() {
        $('#guess-container').empty();
        $('#guess-container').text('Guessed Letters: ' + guessedLetters.join(', '));
    }

    // Function to check if the guessed letter is in the chosen word
    function checkGuess(letter) {
        if (chosenWord.indexOf(letter) === -1) {
            remainingGuesses--;
            $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses);
        } else {
            // Reveal the guessed letter in the word
            $('.hidden-letter').each(function(index) {
                if (chosenWord[index] === letter) {
                    $(this).text(letter);
                }
            });
        }
        updateGuesses();
        checkGameStatus();
    }

    // Function to check if the game has been won or lost
    function checkGameStatus() {
        if ($('.hidden-letter:contains("_")').length === 0) {
            setTimeout(() => {
                alert('Congratulations! You won!');
                resetGame();
            }, 1000);
        } else if (remainingGuesses === 0) {
            setTimeout(() => {
                alert('Game over! The word was: ' + chosenWord);
                resetGame();
            }, 1000);
        }
    }

    // Function to reset the game
    function resetGame() {
        resetCSS()
        guessedLetters = [];
        remainingGuesses = 6;
        $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses);
        $('#word-container').empty();
        chosenWord = words[Math.floor(Math.random() * words.length)];
        for (var i = 0; i < chosenWord.length; i++) {
            $('#word-container').append('<div class="hidden-letter">_</div>');
        }
        updateGuesses();
    }

    function resetCSS() {
        setTimeout(() => {
            document.getElementById('leftLeg').style.opacity = "0";
            document.getElementById('rightLeg').style.opacity = "0";
        }, 250);
        setTimeout(() => {
            document.getElementById('leftArm').style.opacity = "0";
            document.getElementById('rightArm').style.opacity = "0";
        }, 750);
        setTimeout(() => {
            document.getElementById('body').style.transform = "translateY(200%)";
        }, 1250);
        setTimeout(() => {
            document.getElementById('head').style.transform = "translateY(-100%)";
        }, 1750);
    }

    // Event handler for key presses
    $(document).keypress(function(event) {
        var letter = String.fromCharCode(event.which).toLowerCase();
        if (letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            checkGuess(letter);
        }
        if (remainingGuesses == 5) {
            document.getElementById('head').style.transform = "translateY(0)";
        } else if (remainingGuesses == 4) {
            document.getElementById('body').style.transform = "translateY(0)";
        } else if (remainingGuesses == 3) {
            document.getElementById('leftArm').style.opacity = "1";
        } else if (remainingGuesses == 2) {
            document.getElementById('rightArm').style.opacity = "1";
        } else if (remainingGuesses == 1) {
            document.getElementById('leftLeg').style.opacity = "1";
        } else if (remainingGuesses == 0) {
            document.getElementById('rightLeg').style.opacity = "1";
        }
    });

    // Event handler for the reset button
    $('#reset-button').click(function() {
        resetGame();
    });

    // Initial display of remaining guesses
    $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses);
});