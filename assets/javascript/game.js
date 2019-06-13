// CRYSTAL COLLECTORS SCRIPT
$(document).ready(function () {

    var winsCounter;
    var lossesCounter;
    var yourGoalNumber;
    var yourScoreNumber;
    var gemsValue;
    var result;

    // INITIALIZING THE WINS AND LOSSES COUNTER - ACTIVE UNTIL CLOSING BROWSER
    function initializingGameCounters() {
        winsCounter = 0;
        lossesCounter = 0;
    }

    // INITIALIZING THE PARAMETERS FOR ACTIVE ROUND
    function initializingGame() {
        yourGoalNumber = 0;
        yourScoreNumber = 0;
        gemsValue = [0, 0, 0, 0];
        result = "";
    }

    // GENERATING GEMS RANDOM VALUES
    function generateRandomGemValue() {
        for (var i = 0; i < gemsValue.length; i++) {
            gemsValue[i] = Math.floor(Math.random() * 12) + 1;
        }
    }

    // GENERATING THE ROUND GOAL
    function generateRandomGoal() {
        yourGoalNumber = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
    }

    // FUNCTION TO UPDATE THE SCREEN DATA BASED ON SCRIPTS PARAMETERS
    function updateData() {
        $("#yourGoal").text(yourGoalNumber);
        $("#yourScore").text(yourScoreNumber);
        $("#winsCount").text(winsCounter);
        $("#lossesCount").text(lossesCounter);
    }

    // FUNCTION TO VERIFY IF PLAYER WON OR LOST THE GAME
    function verifyPoints() {
        if (result == "") {
            if (yourScoreNumber === yourGoalNumber) {
                result = true;
            } else if (yourScoreNumber > yourGoalNumber) {
                result = false;
            }
        }
    }

    // FUNCTION TO RESET GAME DATA TO CONTINUE GAME (EXCEPT WINS/LOSSES COUNTERS)
    function continueGame() {
        initializingGame();
        generateRandomGoal();
        generateRandomGemValue();
        updateData();
        resetYouWinLose();
    }

    // DISPLAYING THE RESULTS THROUGH AN ANIMATION
    function youWinLose(result) {
        $("#resultWrapper").toggleClass("result", true);
        $("#resBtn").toggleClass("resultInText",true);
        $("#resultImg").toggleClass("resultInText",true);
        if (result == "You WIN") {
            $("#resultImg").attr("src","../unit-4-game/assets/images/winnin.png");
        } else if (result == "You LOSE") {
            $("#resultImg").attr("src","../unit-4-game/assets/images/ko.png");
        }
    }

    // FUNCTION TO RESET CLASS PARAMETERS RELATED TO ANIMATION
    function resetYouWinLose() {
        $("#resBtn").toggleClass("resultOutText",false);
        $("#resultImg").toggleClass("resultOutText",false);
        $("#resultWrapper").toggleClass("resultOut", false);
    }

    // FUNCTION TO SET CLASS PARAMETERS RELATED TO ANIMATION
    function youWinLoseFadeOut(result) {
        $("#resultImg").attr("src","#");
        $("#resultImg").toggleClass("resultInText",false);
        $("#resultImg").toggleClass("resultOutText",true);
        $("#resBtn").toggleClass("resultInText",false);
        $("#resBtn").toggleClass("resultOutText",true);
        $("#resultWrapper").toggleClass("result", false);
        $("#resultWrapper").toggleClass("resultOut", true);
    }

    // MAIN PROCEDURE
    initializingGameCounters();
    continueGame();

    // checking which button/gem was clicked and adding its value to player's score
    $(".gemBtn").on("click", function () {
        var gemVal = $(this).val();

        switch (gemVal) {

            case "1":
                yourScoreNumber += gemsValue[0];
                break;

            case "2":
                yourScoreNumber += gemsValue[1];
                break;

            case "3":
                yourScoreNumber += gemsValue[2];
                break;

            case "4":
                yourScoreNumber += gemsValue[3];
                break;
        }

        updateData();
        verifyPoints();

        // Verify results and display it
        if (result) {
            winsCounter++;
            youWinLose("You WIN");
        } else if (result === false) {
            lossesCounter++;
            youWinLose("You LOSE");
        }

        // Resetting game's data to continue playing
        $("#resBtn").on("click", function () {
            youWinLoseFadeOut();
            setTimeout(continueGame,500);
        });

        updateData();

    });

});