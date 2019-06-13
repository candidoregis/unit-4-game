
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
            gemsValue[i] = Math.floor(Math.random() * 12)+1;
        }
        console.log(gemsValue);
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
        if(result==""){
            if(yourScoreNumber===yourGoalNumber){
                result = true;
            } else if (yourScoreNumber>yourGoalNumber) {
                result = false;
            }
        }
    }

    function continueGame(){
        initializingGame();
        generateRandomGoal();
        generateRandomGemValue();
        updateData();
        resetYouWinLose();
    }

// Displaying the results with an animation
function youWinLose(result) {
    $("#hText").html(result);
    $("#resultWrapper").toggleClass("result",true);
    $("#hText").toggleClass("resultText",true);
    $("#resBtn").toggleClass("resultText",true);
}

// Resetting the class parameters to the results display
function resetYouWinLose() {
    $("#hText").html("");
    $("#resultWrapper").toggleClass("result",false);
    $("#hText").toggleClass("resultText",false);
    $("#resBtn").toggleClass("resultText",false);
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
            console.log("You WIN");
            winsCounter++;
            youWinLose("You WIN");
        } else if (result===false) {
            console.log("You LOSE");
            lossesCounter++;
            youWinLose("You LOSE");
        }

        $("#resBtn").on("click", function () {
            continueGame();
        });

        updateData();

    });

});