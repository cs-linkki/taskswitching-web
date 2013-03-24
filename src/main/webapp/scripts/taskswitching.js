
var BLANK = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var TOO_EARLY = -100;
var TOO_LATE = -1;

var TOP = "TOP";
var BOTTOM = "BOTTOM";
var LEFT = "LEFT";
var RIGHT = "RIGHT";
var MIDDLE = "";

// use ts (taskswitching) from the global namespace
var ts = {};
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
    currentTestConfig: null,
    
    init: function() {
        ts.program.lastShowTime = TOO_EARLY;
        ts.program.currentDataElement = 0;
        ts.program.currentTestIndex++;
        
        console.log("current test idx: " + ts.program.currentTestIndex);
        console.log("tests length: " + ts.tests.length);
        if (ts.program.currentTestIndex >= ts.tests.length) {
            $("#wrapper").hide();
            $("#guide").html(ts.config.endText);
            $("#guide").show();
            return;
        }

        // get current test
        ts.program.currentTest = ts.tests[ts.program.currentTestIndex];

        // init result variables
        ts.result = {};
        ts.result.additionalKeyPresses = [];
        ts.result.reactions = [];
        ts.result.testType = ts.program.currentTest.testType;

        // init binds keys for functions -- only during first round
        // 
        // use keydown to get the action as fast as possible
        // check http://css-tricks.com/snippets/javascript/javascript-keycodes/
        // for other keycodes
        
        if (ts.program.currentTestIndex <= 0) {
            $(document).keydown(function(e) {
                switch (e.which) {
                    case 90: // z
                        ts.program.pressed(LEFT);
                        break;
                    case 190: // .
                        ts.program.pressed(RIGHT);
                        break;
                }

                e.preventDefault();
            });
        }
        

        // add participation info
        ts.result.participant = {};
        ts.result.participant.id = $("#participant-id").val();

        ts.result.initTime = $.now();

        $("#entry").hide();
        $("#wrapper").hide();

        $("#guide").show();
        $("#guide").html(ts.program.currentTest.startText);

        // program will start at keypress
        $(document).one('keydown', function() {
            $("#result").hide();
            $("#guide").hide();

            $("#wrapper").show();
            
            ts.program.start();
        });
    },
            
    start: function() {
        console.log("starting");
        ts.result.testStartTime = $.now();

        ts.program.clear();
        // call the function showNext after a pre-configured pause
        ts.program.currentTimeoutVariable
                = setTimeout(ts.program.show, ts.config.pauseBeforeFirstShow);

        // could also config to show a pre-defined screen, and
        // switch away after a specific event
    },
            
    show: function() {
        ts.program.clear();
        console.log("Current data element: " + ts.program.currentDataElement);
        console.log("Total elements in current test: " + ts.program.currentTest.elements.length);
        var data = ts.program.currentTest.elements[ts.program.currentDataElement];
        console.log("data: " + JSON.stringify(data));

        var content = data.text;
        if (data.align === LEFT) {
            content += BLANK;
        }

        if (data.align === RIGHT) {
            content = BLANK + content;
        }

        $("#" + data.location).html(content);
        ts.program.lastShowTime = $.now();

        ts.program.currentTimeoutVariable
                = setTimeout(ts.program.hideAndWaitForNext, ts.config.elementVisibleInMs);
    },
            
    hideAndWaitForNext: function(answerCorrect) {
        if (!answerCorrect && ts.program.lastShowTime > 0) {
            // timed out!
            ts.result.reactions.push({
                index: ts.program.currentDataElement,
                showTime: ts.program.lastShowTime,
                pressedTime: null,
                reactionTimeInMs: null,
                pressed: "NONE",
                correct: false,
                elementType: ts.program.currentTest.elements[ts.program.currentDataElement].location
            });
        }

        ts.program.lastShowTime = TOO_LATE;
        ts.program.clear();

        ts.program.currentDataElement++;

        if (ts.program.currentDataElement >= ts.program.currentTest.elements.length) {
            ts.program.nextTestOrEnd();
            return;
        }
        
        var waitTime = ts.config.pauseAfterWrongAnswerInMs;
        if(answerCorrect) {
            waitTime = ts.config.pauseAfterCorrectAnswerInMs;
        }
        
        try {
            var element = ts.program.currentTest.elements[ts.program.currentDataElement];
            if(element.waitForMs) {
                waitTime = element.waitForMs;
            }
        } finally {
            
        }
        
        ts.program.currentTimeoutVariable
                = setTimeout(ts.program.show, waitTime);

    },

    additionalPress: function(key) {
//        if (ts.program.currentTimeoutVariable) {
//            clearTimeout(ts.program.currentTimeoutVariable);
//        }

        ts.result.additionalKeyPresses.push({
            lastIndex: ts.program.currentDataElement,
            key: key,
            time: $.now()
        });

//        ts.program.currentTimeoutVariable
//                = setTimeout(ts.program.show, ts.config.pauseAfterWrongAnswerInMs);
    },
            
    clear: function() {
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

        var currentTime = $.now();
        var currentElement = ts.program.currentTest.elements[ts.program.currentDataElement];
        var answerWasCorrect = currentElement.correctAnswer === answer;
        
        if(currentElement.correctAnswer === "ALL") {
            answerWasCorrect = true;
        }
        
        var elementType = "";
        if(currentElement.location === TOP) {
            elementType = "NUMBER";
        } else if (currentElement.location === BOTTOM) {
            elementType = "CHARACTER";
        }

        ts.result.reactions.push({
            index: ts.program.currentDataElement,
            showTime: elementShowTime,
            pressedTime: currentTime,
            reactionTimeInMs: currentTime - elementShowTime,
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

        ts.result.testEndTime = $.now();

        $("#wrapper").hide();
        $("#guide").html(ts.program.currentTest.endText);
        $("#guide").show();

        console.log(JSON.stringify(ts.result));

        $.ajax({
            type: "POST",
            url: ts.config.backendAddress,
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

// utility functions for creating new tests
ts.fn = {};

ts.fn.createTest = function(testType, startText, endText, elements) {
    this.testType = testType;
    this.startText = startText;
    this.endText = endText;
    this.elements = elements;
};