
$(document).ready(function () {

    var winsCounter;
    var lossesCounter;
    var yourGoalNumber;
    var yourScoreNumber;
    var gemsValue;
    var result;

    function initializingGameCounters() {
        winsCounter = 0;
        lossesCounter = 0;
    }

    function initializingGame() {
        yourGoalNumber = 0;
        yourScoreNumber = 0;
        gemsValue = [0, 0, 0, 0];
        result = "";
    }

    function generateRandomGemValue() {
        for (var i = 0; i < gemsValue.length; i++) {
            gemsValue[i] = Math.floor(Math.random() * 12) + 1;
        }
    }

    function generateRandomGoal() {
        yourGoalNumber = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
    }

    function updateData() {
        $("#yourGoal").text(yourGoalNumber);
        $("#yourScore").text(yourScoreNumber);
        $("#winsCount").text(winsCounter);
        $("#lossesCount").text(lossesCounter);
    }

    function verifyPoints() {
        if (result == "") {
            if (yourScoreNumber === yourGoalNumber) {
                result = true;
            } else if (yourScoreNumber > yourGoalNumber) {
                result = false;
            }
        }
    }

    function continueGame() {
        initializingGame();
        generateRandomGoal();
        generateRandomGemValue();
        updateData();
        resetYouWinLose();
    }

    // Displaying the results with an animation
    function youWinLose(result) {
        $("#resultWrapper").toggleClass("result", true);
        $("#resBtn").toggleClass("resultInText",true);
        $("#resultImg").toggleClass("resultInText",true);
        if (result == "You WIN") {
            $("#resultImg").attr("src","../unit-4-game/assets/images/youwin.jpg");
        } else if (result == "You LOSE") {
            $("#resultImg").attr("src","../unit-4-game/assets/images/youlose.jpeg");
        }
    }

    // Resetting the class parameters to the results display
    function resetYouWinLose() {
        $("#resBtn").toggleClass("resultOutText",false);
        $("#resultImg").toggleClass("resultOutText",false);
        $("#resultWrapper").toggleClass("resultOut", false);
    }

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

        if (result) {
            winsCounter++;
            youWinLose("You WIN");
        } else if (result === false) {
            lossesCounter++;
            youWinLose("You LOSE");
        }

        $("#resBtn").on("click", function () {
            youWinLoseFadeOut();
            setTimeout(continueGame,500);
        });

        updateData();

    });

});