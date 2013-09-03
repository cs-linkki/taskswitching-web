if (!ts) {
    alert("LOAD TASKSWITCHING-INIT.JS FIRST");
}

// data that we gather from user inputs will be
// appended to this object
ts.result = null;

// and the main code
ts.program = {
    keysBound: false,
    initVars: function(testType) {
        ts.program.currentTimeoutVariable = null;
        ts.program.currentDataElement = null;
        ts.program.lastShowTime = TOO_EARLY;
        ts.program.currentTest = null;
        ts.program.currentTestData = null;
        ts.program.currentTestConfig = null;
        ts.program.testType = testType;
        ts.program.lastReactionTime = null;
        ts.program.testTypeCounts = 0;
    },
    step: 0,
    init: function() {
        ts.specificTest = ts.ui.getUrlParam("test");
        ts.limitReactions = ts.ui.getUrlParam("limit");

        ts.program.step++;

        console.log("");
        console.log("Current step: " + ts.program.step);
        console.log("");

        if (ts.specificTest) {
            switch (ts.specificTest) {
                case "REACTION":
                    ts.program.step = 1;
                    break;
                case "NUMBERREACTION":
                    ts.program.step = 2;
                    break;
                case "CHARACTERREACTION":
                    ts.program.step = 4;
                    break;
                case "TASKSWITCHING":
                    ts.program.step = 6;
                    break;
            }
        }

        switch (ts.program.step) {
            case 1:
                ts.config.elementVisibleInMs = 1950;
                // 1. reaction test
                ts.config.loadTestSet("REACTION",
                        "Reaction test: press 'x' or 'n' when you see a character-number -combination.<br/><br/>Press spacebar to start.",
                        "Awesome! RT is your average reaction time. Next, let us practice number reactions.",
                        "static/data/reaction-data.json");
                ts.program.initializeTest("game");
                break;
            case 2:
                // override any configuration that was possibly induced in the previous step
                ts.config.pauseBeforeFirstShow = 2500;
                ts.config.pauseAfterWrongAnswerInMs = 1500;
                ts.config.pauseAfterCorrectAnswerInMs = 150;
                ts.config.elementVisibleInMs = 2540;

                // 2. practice run, top row (min 1, max 3 times)
                $("#guide").html("Great work! You are now ready to play! Wait a moment...");
                ts.config.loadPracticeTest("NUMBERREACTION",
                        "Number reaction test (practice): observe the top row.<br/>When the number in the character-number -pair is odd, press 'x'.<br/>Press 'n' when the number is even.<br/><br/>Press spacebar to start.",
                        "Well done! Get ready for the next test.");
                ts.program.initializeTest("practice");
                break;
            case 3:
                // 3. game top row
                $("#guide").html("Great work! You are now ready to play! Wait a moment...");
                ts.config.loadTestSet("NUMBERREACTION",
                        "Number reaction test: observe the top row.<br/>When the number in the character-number -pair is odd, press 'x'.<br/>Press 'n' when the number is even.<br/><br/>Press spacebar to start.",
                        "Well done! Get ready for the next test.",
                        "static/data/numberreaction-data.json");
                ts.program.initializeTest("game");
                break;
            case 4:
                // 4. practice run, bottom row (min 1, max 3 times)
                $("#guide").html("Great work! You are now ready to play! Wait a moment...");
                ts.config.loadPracticeTest("CHARACTERREACTION",
                        "Character reaction (practice) test: observe the bottom row.<br/>When the character in the character-number -pair is a consonant, press 'x'.<br/>Press 'n' when the character is a vowel.<br/><br/>Press spacebar to start.",
                        "Well done! Get ready for the next test.");
                ts.program.initializeTest("practice");
                break;
            case 5:
                // 5. game bottom row
                $("#guide").html("Kapow! Getting the character reaction test ready.....");
                ts.config.loadTestSet("CHARACTERREACTION",
                        "Character reaction test: observe the bottom row.<br/>When the character in the character-number -pair is a consonant, press 'x'.<br/>Press 'n' when the character is a vowel.<br/><br/>Press spacebar to start.",
                        "Well done! Get ready for the next test.",
                        "static/data/characterreaction-data.json");
                ts.program.initializeTest("game");
                break;
            case 6:
                // 6. practice task switching (min 1, max 3 times)
                $("#guide").html("Great work! You are now ready to play! Wait a moment...");
                ts.config.loadPracticeTest("TASKSWITCHING",
                        "Let's practice combining the previous ones!<br/>If the character-number pair appears in top, press 'x' for odd numbers, 'n' for even numbers.<br/>When the pair appears in the bottom, press 'x' for consonant, and 'n' for vowel.<br/><br/>Press spacebar to start.",
                        "All right! Let's focus on the major event!");
                ts.program.initializeTest("practice");
                break;
            case 7:
                // 7. game task switching
                $("#guide").html("Great work! You are now ready to play! Wait a moment...");
                ts.config.loadTestSet(
                        "TASKSWITCHING",
                        "Let's combine the previous ones!<br/>If the character-number pair appears in top, press 'x' for odd numbers, 'n' for even numbers.<br/>When the pair appears in the bottom, press 'x' for consonant, and 'n' for vowel.<br/><br/>Press spacebar to start.",
                        "Awesome work! Thanks a bunch for helping us out!",
                        "static/data/taskswitching-data.json");
                ts.program.initializeTest("game");
                break;
        }
    },
    initializeTest: function(testType) {
        ts.program.initVars(testType);

        $("#taskSwitchingResult").hide();

        // init binds keys for functions -- only during first round
        // 
        // use keydown to get the action as fast as possible
        // check http://css-tricks.com/snippets/javascript/javascript-keycodes/
        // for other keycodes

        // bind keys only at the very beginning
        if (!ts.program.keysBound) {
            ts.ui.bindKeys(KEY_LEFT,
                    function() {
                        ts.program.pressed("LEFT");
                    },
                    KEY_RIGHT,
                    function() {
                        ts.program.pressed("RIGHT");

                    });
            ts.program.keysBound = true;
        }

        ts.program.startNextTest();
    },
    startNextTest: function() {
        console.log("starting test");
        ts.program.lastShowTime = TOO_EARLY;
        ts.program.currentDataElement = 0;

        // get current test
        ts.program.currentTest = ts.tests[0];

        console.log("Requesting list id..")
        var listId = ts.fn.getNextListId($("#participant-id").val(), ts.program.currentTest.testType, ts.program.testType);
        console.log(ts.program.currentTest);
        ts.program.currentTestData = ts.program.currentTest.elements[(listId % ts.program.currentTest.elements.length)];

        // init result variables
        var participant = {};
        participant.username = $("#participant-id").val();
        console.log("participant username: " + participant.username);

        ts.result = new ResultObject(listId, ts.program.currentTest.testType, ts.program.testType, participant);
        console.log("new result object created");

        console.log("showing start text and waiting for space press.");
        ts.ui.init(ts.program.currentTest.startText);
        // program will start once user presses space
        ts.program.bindSpace();
    },
    bindSpace: function() {
        console.log("waiting for space press (should be sync?)");
        // fix here
        $(document).one('keydown', function(e) {
            ts.program.handleSpace(e);
        });
    },
    handleSpace: function(e) {
        if (e.which !== 32) {
            ts.program.bindSpace();
            return;
        }

        ts.ui.showGameArea();
        ts.program.start();
    },
    start: function() {
        console.log("starting");

        ts.result.setStartTime();

        ts.program.clear();
        // call the function showNext after a pre-configured pause
        var waitTime = ts.config.pauseBeforeFirstShow;
        
        var element = ts.program.currentTestData[ts.program.currentDataElement];
        if (element.waitForMs) {
            waitTime = element.waitForMs;

            if (ts.program.lastReactionTime !== null) {
                waitTime -= ts.program.lastReactionTime;
            }

            console.log("Will wait " + waitTime);
        }
        
        ts.program.currentTimeoutVariable
                = setTimeout(ts.program.show, waitTime);
    },
    show: function() {
        ts.program.clear();
        var data = ts.program.currentTestData[ts.program.currentDataElement];

        var content = data.text;
        switch (data.align) {
            case NEAR_LEFT:
                content += NEAR_BLANK;
                break;
            case FAR_LEFT:
                content += FAR_BLANK;
                break;
            case NEAR_RIGHT:
                content = NEAR_BLANK + content;
                break;
            case FAR_RIGHT:
                content = FAR_BLANK + content;
                break;
                // default MIDDLE
        }

        ts.program.lastShowTime = ts.time();
        ts.program.currentTimeoutVariable
                = setTimeout(ts.program.hideAndWaitForNext, ts.config.elementVisibleInMs);

        ts.ui.showContent(data.location, content);
    },
    hideAndWaitForNext: function(didReact, wasCorrect) {
        if (!didReact && ts.program.lastShowTime > 0) {
            ts.program.lastReactionTime = null;
            ts.result.addReactionInformation({
                index: ts.program.currentDataElement,
                showTime: ts.program.lastShowTime,
                pressedTime: null,
                pressed: "NONE",
                correct: false,
                elementType: ts.program.currentTestData[ts.program.currentDataElement].location
            });
        }

        ts.program.lastShowTime = TOO_LATE;
        ts.program.clear();

        ts.program.currentDataElement++;

        // if test is done, go for the next test
        if (ts.program.currentDataElement >= ts.program.currentTestData.length || (ts.limitReactions && ts.program.currentDataElement >= 3)) {
            ts.program.nextTestOrEnd();
            return;
        }

        var waitTime = ts.config.pauseAfterWrongAnswerInMs;
        if (wasCorrect) {
            waitTime = ts.config.pauseAfterCorrectAnswerInMs;
        }

        try {
            var element = ts.program.currentTestData[ts.program.currentDataElement];
            if (element.waitForMs) {
                waitTime = element.waitForMs;

                if (ts.program.lastReactionTime !== null) {
                    waitTime -= ts.program.lastReactionTime;
                }

                console.log("Will wait " + waitTime);
            }
        } finally {

        }

        ts.program.currentTimeoutVariable
                = setTimeout(ts.program.show, waitTime);

    },
    additionalPress: function(key) {
        ts.result.addAdditionalKeyPressInformation({
            lastIndex: ts.program.currentDataElement,
            key: key,
            time: ts.time()
        });
    },
    clear: function() {
        ts.ui.clear();

        if (ts.program.currentTimeoutVariable) {
            clearTimeout(ts.program.currentTimeoutVariable);
        }
    },
    pressed: function(answer) {
        console.log("Last show time: " + ts.program.lastShowTime);

        if (ts.program.lastShowTime === TOO_EARLY || ts.program.lastShowTime === TOO_LATE) {
            ts.program.additionalPress("PRESS_OUTSIDE_TIMEFRAME:" + answer);
            return;
        }

        var elementShowTime = ts.program.lastShowTime;

        ts.program.clear();

        var currentTime = ts.time();
        var currentElement = ts.program.currentTestData[ts.program.currentDataElement];
        var answerWasCorrect = currentElement.correctAnswer === answer;

        if (currentElement.correctAnswer === "ALL") {
            answerWasCorrect = true;
        }

        var elementType = "";
        if (currentElement.location === TOP) {
            elementType = "NUMBER";
        } else if (currentElement.location === BOTTOM) {
            elementType = "CHARACTER";
        }

        ts.result.addReactionInformation({
            index: ts.program.currentDataElement,
            showTime: elementShowTime,
            pressedTime: currentTime,
            pressed: answer,
            correct: answerWasCorrect,
            elementType: elementType
        });

        ts.program.lastReactionTime = (currentTime - elementShowTime);
        console.log("Last reaction time: " + ts.program.lastReactionTime);
        ts.program.hideAndWaitForNext(true, answerWasCorrect); // if we are here, we have always reacted
    },
    nextTestOrEnd: function() {
        ts.program.testTypeCounts++;
        ts.result.testEndTime = ts.time();
        console.log("Thx!");
        ts.program.lastShowTime = TOO_LATE;
        ts.program.clear();

        ts.ui.showGuideText(ts.program.currentTest.endText);


        console.log(JSON.stringify(ts.result));
        ts.program.submitResults(function(response) {
            ts.ui.showBasicStats(response);

            if (ts.result.testType === "TASKSWITCHING") {
                ts.ui.showTaskSwitchingStats(response);
            }
        });

        // if we've been practicing, give an option to do something else for
        // a while
        if (ts.program.testType === "practice") {
            if (ts.program.testTypeCounts >= 3) {
                // we've practiced over 3 times; time for the next test
                ts.program.init();
                return;
            }

            // less than or eq to 2 practice times
            $("#guide").html("Great work! If you want, you can still practice a bit.<br/>Press space to practice, any other key will forward you to the test!");
            $(document).one('keydown', function(e) {
                $("#result").hide();
                if (e.keyCode === 0 || e.keyCode === 32) {
                    // space
                    ts.program.startNextTest();
                } else {
                    // any key
                    ts.program.init();
                }
            });
            return;
        }

        // we were not practicing, lets init the next step
        ts.program.init();


        // wait for next test if applicable
//        setTimeout(function() {
//            ts.program.startNextTest();
//        }, ts.config.pauseBetweenTests);
    },
    submitResults: function(successFunction) {
        console.log("submitting results to backend!");
        var data = JSON.stringify(ts.result);
        console.log("data to send: " + data);
        $.ajax({
            type: "POST",
            url: ts.config.backendResultAddress,
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: data,
            success: successFunction
        });
    }
};


// basic func to make sure that data is submitted
window.onbeforeunload = function() {
    if (ts.result && ts.result.length > 0) {
        ts.program.submitResults(function() {
            alert("pewpew");
        });
    }
};
$(document).ready(function() {
    $('a[rel!=ext]').click(function() {
        window.onbeforeunload = null;
    });
    $('form').submit(function() {
        window.onbeforeunload = null;
    });
});


ts.fn = {};
ts.fn.createTest = function(testType, startText, endText, elements) {
    this.testType = testType;
    this.startText = startText;
    this.endText = endText;
    this.elements = elements;
};

ts.fn.getNextListId = function(username, testType, info) {
    console.log("requesting next list id with list info: " + info);
    var result;
    $.ajax({
        type: "GET",
        url: ts.config.backendListCountAddress + "?username=" + username + "&testType=" + testType + "&info=" + info,
        async: false,
        success: function(data) {
            result = data;
        }
    });

    return result;
};
