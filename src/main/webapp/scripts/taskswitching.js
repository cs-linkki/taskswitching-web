
var FAR_BLANK = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var NEAR_BLANK = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var TOO_EARLY = -100;
var TOO_LATE = -1;

var TOP = "TOP";
var BOTTOM = "BOTTOM";

var NEAR_LEFT = "NEAR_LEFT";
var FAR_LEFT = "FAR_LEFT";
var NEAR_RIGHT = "NEAR_RIGHT";
var FAR_RIGHT = "FAR_RIGHT";
var MIDDLE = "MIDDLE";

// use ts (taskswitching) from the global namespace
var ts = {};

// init debug mode at the beginning
ts.debug = window.location.search.match(".*debug.*");

// data that we gather from user inputs will be
// appended to this object
ts.result = {};
ts.result.additionalKeyPresses = [];
ts.result.reactions = [];

// and the main code
ts.program = {
    currentTimeoutVariable: null,
    currentDataElement: null,
    lastShowTime: TOO_EARLY,
    currentTestIndex: -1,
    currentTest: null,
    currentTestData: null,
    currentTestConfig: null,
    
    init: function() {
        ts.specificTest = ts.fn.getUrlParam("test");
            
        // init binds keys for functions -- only during first round
        // 
        // use keydown to get the action as fast as possible
        // check http://css-tricks.com/snippets/javascript/javascript-keycodes/
        // for other keycodes

        if (ts.program.currentTestIndex <= 0) {
            $(document).keydown(function(e) {
                switch (e.which) {
                    case 90: // z
                        ts.program.pressed("LEFT");
                        break;
                    case 190: // .
                        ts.program.pressed("RIGHT");
                        break;
                }

                e.preventDefault();
            });
        }
        
        ts.program.lastShowTime = TOO_EARLY;
        ts.program.currentDataElement = 0;
        ts.program.currentTestIndex++;
        
        // get current test
        ts.program.currentTest = ts.tests[ts.program.currentTestIndex];

        if (ts.specificTest) {
            while (ts.program.currentTest.testType !== ts.specificTest) {
                ts.program.currentTestIndex++;
                if(ts.program.currentTestIndex >= ts.tests.length) {
                    break;
                }
                
                ts.program.currentTest = ts.tests[ts.program.currentTestIndex];
            }
        }

        if (ts.program.currentTestIndex >= ts.tests.length) {
            $("#wrapper").hide();
            $("#guide").html(ts.config.endText);
            $("#guide").show();
            return;
        }

        var listId = ts.fn.getNextListId($("#participant-id").val(), ts.program.currentTest.testType);
        ts.program.currentTestData = ts.program.currentTest.elements[(listId % ts.program.currentTest.elements.length)];

        // init result variables
        ts.result = {};
        ts.result.additionalKeyPresses = [];
        ts.result.reactions = [];
        ts.result.testType = ts.program.currentTest.testType;
        ts.result.listId = listId;

        // add participation info
        ts.result.participant = {};
        ts.result.participant.id = $("#participant-id").val();

        ts.result.initTime = ts.time();

        $("#entry").hide();
        $("#wrapper").hide();

        $("#guide").show();
        $("#guide").html(ts.program.currentTest.startText);

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

        $("#result").hide();
        $("#guide").hide();

        $("#wrapper").show();

        ts.program.start();
    },
    start: function() {
        console.log("starting");
        ts.result.testStartTime = ts.time();

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

        $("#" + data.location).html(content);
        ts.program.lastShowTime = ts.time();

        ts.program.currentTimeoutVariable
                = setTimeout(ts.program.hideAndWaitForNext, ts.config.elementVisibleInMs);

        if (ts.debug) {
            $("#timingbox").show();
        }
    },
    hideAndWaitForNext: function(answerCorrect) {
        if (!answerCorrect && ts.program.lastShowTime > 0) {
            // timed out!
            ts.result.reactions.push({
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
        ts.result.additionalKeyPresses.push({
            lastIndex: ts.program.currentDataElement,
            key: key,
            time: ts.time()
        });
    },
    clear: function() {
        if (ts.debug) {
            $("#timingbox").hide();
        }

        $("#" + TOP).html("&nbsp;");
        $("#" + BOTTOM).html("&nbsp;");
        $("#guide").html("&nbsp;");

        if (ts.program.currentTimeoutVariable) {
            clearTimeout(ts.program.currentTimeoutVariable);
        }
    },
    pressed: function(answer) {
        console.log("Last show time: " + ts.program.lastShowTime);

        if (ts.program.lastShowTime === TOO_EARLY) {
            console.log("pressed " + answer + " too early");
            ts.program.additionalPress("EARLY");
            return;
        }

        if (ts.program.lastShowTime === TOO_LATE) {
            console.log("pressed " + answer + " too late");
            ts.program.additionalPress("LATE");
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

        ts.result.reactions.push({
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
        console.log("Thx!");
        ts.program.lastShowTime = TOO_LATE;
        ts.program.clear();

        ts.result.testEndTime = ts.time();

        $("#wrapper").hide();
        $("#guide").html(ts.program.currentTest.endText);
        $("#guide").show();

        console.log(JSON.stringify(ts.result));

        $.ajax({
            type: "POST",
            url: ts.config.backendResultAddress,
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(ts.result),
            success: function(response) {
                $("#hitsPercentage").html(response.hitsPercentage);
                $("#reactionTime").html(response.reactionTime);
                $("#outsideHits").html(response.hitsOutsideTimespan);

                if (ts.result.testType === "TASKSWITCHING") {
                    $("#hitsRepeated").html(response.hitsRepeated);
                    $("#hitsChanged").html(response.hitsChanged);
                    $("#repeatedReactionTime").html(response.repeatedReactionTime);
                    $("#changedReactionTime").html(response.changedReactionTime);

                    $("#taskSwitchingResult").show();
                }

                $("#result").show();
            }
        });

        // wait for next
        setTimeout(function() {
            ts.program.init();
        }, ts.config.pauseBetweenTests);
    }
};



ts.fn = {};
ts.fn.createTest = function(testType, startText, endText, elements) {
    this.testType = testType;
    this.startText = startText;
    this.endText = endText;
    this.elements = elements;
};

ts.fn.getNextListId = function(participantId, testType) {
    var result;
    $.ajax({
        type: "GET",
        url: ts.config.backendListCountAddress + "?participantId=" + participantId + "&testType=" + testType,
        async: false,
        success: function(data) {
            result = data;
        }
    });

    return result;
};

ts.fn.getUrlParam = function(key) {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
};

ts.time = (function() {
    var performance = window.performance || {};
    var performanceFunction = performance.now
            || performance.mozNow
            || performance.webkitNow
            || performance.msNow
            || performance.oNow;

    if (performanceFunction) {
        return performanceFunction.bind(performance);
    }

    return function() {
        return new Date().getTime();
    };
})();
