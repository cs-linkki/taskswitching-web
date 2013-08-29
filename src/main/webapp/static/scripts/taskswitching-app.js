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
        ts.program.currentTestIndex = -1;
        ts.program.currentTest = null;
        ts.program.currentTestData = null;
        ts.program.currentTestConfig = null;
        ts.program.testType = testType;
    },
    testTypeCounts: {},
    
    init: function(testType) {
        if(ts.program.testTypeCounts[testType] === null) {
            ts.program.testTypeCounts[testType] = 0;
        }
        ts.program.initVars(testType);
        ts.config.initTests(testType);
        
        $("#taskSwitchingResult").hide();

        console.log("TOTAL TESTS: " + ts.tests.length);

        ts.specificTest = ts.ui.getUrlParam("test");

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
        ts.program.lastShowTime = TOO_EARLY;
        ts.program.currentDataElement = 0;
        ts.program.currentTestIndex++;

        // get current test
        ts.program.currentTest = ts.tests[ts.program.currentTestIndex];

        if (ts.specificTest) {
            while (ts.program.currentTest.testType !== ts.specificTest) {
                ts.program.currentTestIndex++;
                if (ts.program.currentTestIndex >= ts.tests.length) {
                    break;
                }

                ts.program.currentTest = ts.tests[ts.program.currentTestIndex];
            }
        }
        
        if (ts.program.currentTestIndex >= ts.tests.length) {
            if(ts.program.testType === "practice") {
                ts.program.testTypeCounts[ts.program.testType]++;
                
                if(ts.program.testTypeCounts[ts.program.testType] > 3) {
                    // GIVE OPTION TO PLAY WHEN WILL
                    $("#guide").html("Great work! You are now ready to play!<br/>Press space when you are ready.");
                    $(document).one('keydown', function(e) {
                        $("#result").hide();
                        ts.program.init("game");
                    });
                } else {
                    $("#guide").html("Great work! If you want, you can still practice a bit.<br/>Press space to practice, any other key will forward you to the test!");
                    $(document).one('keydown', function(e) {
                        $("#result").hide();
                        if (e.keyCode === 0 || e.keyCode === 32) {
                            ts.program.init("practice");
                        } else {
                            ts.program.init("game");
                        }
                    });
                }               
                
            } else {
                ts.ui.testsFinished(ts.config.endText);
            }
            return;
        }

        var listId = ts.fn.getNextListId($("#participant-id").val(), ts.program.currentTest.testType, ts.program.testType);
        console.log(ts.program.currentTest);
        ts.program.currentTestData = ts.program.currentTest.elements[(listId % ts.program.currentTest.elements.length)];

        // init result variables
        var participant = {};
        participant.username = $("#participant-id").val();

        ts.result = new ResultObject(listId, ts.program.currentTest.testType, ts.program.testType, participant);

        ts.ui.init(ts.program.currentTest.startText);
        // program will start once user presses space
        ts.program.bindSpace();
    },
    bindSpace: function() {
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
        ts.program.currentTimeoutVariable
                = setTimeout(ts.program.show, ts.config.pauseBeforeFirstShow);

        // could also config to show a pre-defined screen, and
        // switch away after a specific event
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
    hideAndWaitForNext: function(answerCorrect) {
        if (!answerCorrect && ts.program.lastShowTime > 0) {
            // timed out!
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

        if (ts.program.currentDataElement >= ts.program.currentTestData.length) {
            ts.program.nextTestOrEnd();
            return;
        }

        var waitTime = ts.config.pauseAfterWrongAnswerInMs;
        if (answerCorrect) {
            waitTime = ts.config.pauseAfterCorrectAnswerInMs;
        }

        try {
            var element = ts.program.currentTestData[ts.program.currentDataElement];
            if (element.waitForMs) {
                waitTime = element.waitForMs;
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
            ts.program.additionalPress("PRESS_OUTSIDE_TIMEFRAME:"+answer);
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

        ts.program.hideAndWaitForNext(answerWasCorrect);
    },
    nextTestOrEnd: function() {
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

        // wait for next test if applicable
        setTimeout(function() {
            ts.program.startNextTest();
        }, ts.config.pauseBetweenTests);
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
