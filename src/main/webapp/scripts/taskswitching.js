// lets just take ts (taskswitching) from the global namespace
var ts = {};
// data that we gather from user inputs will be
// appended to this object
ts.result = {};
ts.result.additionalKeyPresses = [];
ts.result.reactions = [];

// and the main code
ts.program = {
    currentTimeoutVariable: null,
    currentDataElement: 0,
    lastShowTime: -100,
    
    
    init : function() {
        // init result variables
        ts.result.testType = ts.config.testType;
    
        // init binds keys for functions
        // 
        // use keydown to get the action as fast as possible
        // check http://css-tricks.com/snippets/javascript/javascript-keycodes/
        // for other keycodes
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
        
        
        // add participation info
        ts.result.participant = {};
        ts.result.participant.id = $("#participant-id").val();
        
        ts.result.initTime = $.now();

        $("#entry").hide();
        $("#wrapper").show();

        $("#top").html(ts.config.startText);
        
        // program will start at keypress
        $(document).one('keydown', function() {
            ts.program.start();
        });
    },
    
    start : function() {
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
        var data = ts.config.elements[ts.program.currentDataElement];
        
        var content = data.text;
        if(data.align === "LEFT") {
            content += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        
        if(data.align === "RIGHT") {
            content = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + content;
        }

        $("#" + data.location).html(content);
        ts.program.lastShowTime = $.now();
    
        ts.program.currentTimeoutVariable 
            = setTimeout(ts.program.hideAndWaitForNext, ts.config.elementVisibleInMs);
    },
            
    hideAndWaitForNext: function(answerCorrect) {
        if(!answerCorrect && ts.program.lastShowTime > 0) {
            // timed out!
            ts.result.reactions.push({
                index: ts.program.currentDataElement,
                showTime: ts.program.lastShowTime,
                pressedTime: null,
                reactionTimeInMs: null,
                pressed: "NONE",
                correct: false
            });
        }

        ts.program.lastShowTime = -1;
        ts.program.clear();

        ts.program.currentDataElement++;     
 
        if(ts.program.currentDataElement >= ts.config.elements.length) {
            ts.program.end();
            return;
        } 
        
        if(answerCorrect) {
            ts.program.currentTimeoutVariable 
                = setTimeout(ts.program.show, ts.config.pauseAfterCorrectAnswerInMs);
        } else {
            ts.program.currentTimeoutVariable 
                = setTimeout(ts.program.show, ts.config.pauseAfterWrongAnswerInMs);
        }                    
    },
            
    additionalPress: function(key) {        
        if(ts.program.currentTimeoutVariable) {
            clearTimeout(ts.program.currentTimeoutVariable);
        }
        
        ts.result.additionalKeyPresses.push({
            lastIndex: ts.program.currentDataElement,
            key: key,
            time: $.now()
        });
        
        ts.program.currentTimeoutVariable 
                = setTimeout(ts.program.show, ts.config.pauseAfterWrongAnswerInMs);
    },

    clear: function() {
        $("#top").html("&nbsp;");
        $("#divider").html("&nbsp;");
        $("#bottom").html("&nbsp;");
        
        if(ts.program.currentTimeoutVariable) {
            clearTimeout(ts.program.currentTimeoutVariable);
        }
    },
    
    pressed: function(answer) {
        if(ts.program.lastShowTime === -100) {
            console.log("pressed right too early");
            ts.program.additionalPress("EARLY");
            return;
        }
        
        if(ts.program.lastShowTime === -1) {
            console.log("pressed right too late");
            ts.program.additionalPress("LATE");
            return;
        }
        
        var elementShowTime = ts.program.lastShowTime;
        
        ts.program.clear();
        
        var currentTime = $.now();        
        var currentElement = ts.config.elements[ts.program.currentDataElement];
        var answerWasCorrect = currentElement.correctAnswer === answer;
        
        ts.result.reactions.push({
            index: ts.program.currentDataElement,
            showTime: elementShowTime,
            pressedTime: currentTime,
            reactionTimeInMs: currentTime - elementShowTime,
            pressed: answer,
            correct: answerWasCorrect
        });
        
        ts.program.hideAndWaitForNext(answerWasCorrect);
    },
    
    end: function() {
        console.log("Thx!");
        ts.program.lastShowTime = -1;
        ts.program.clear();
        
        ts.result.testEndTime = $.now();
        
        $("#top").html(ts.config.endText);
        
        console.log(JSON.stringify(ts.result));
        
        $.ajax({
            type: "POST",
            url: ts.config.backendAddress,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(ts.result),
            success: function(response) {
                $("#hitsPercentage").html(response.hitsPercentage);
                $("#reactionTime").html(response.reactionTime);
                $("#result").show();
            }
        });

        $.post('./data/log.php', {data: JSON.stringify(ts.result)}, $.noop);
    }
}
