if(!ts) {
    alert("Taskswitching not properly loaded.");
}

ts.config = {};

ts.config.endText = "Thank you for participating!";

// backend to submit data to
ts.config.backendResultAddress = "app/result";

// backend to get list counts from
ts.config.backendListCountAddress = "app/listcount";

// config for the app goes here
// how long to hide an element in milliseconds
ts.config.pauseBeforeFirstShow = 2500;

ts.config.pauseAfterWrongAnswerInMs = 1500;
ts.config.pauseAfterCorrectAnswerInMs = 150;

// how long to show an element in milliseconds
ts.config.elementVisibleInMs = 2500;

// pause between tests
ts.config.pauseBetweenTests = 5000;

     
                
var REACTION_TEST_ELEMENTS = [[
                    {
                        text: "A7",
                        location: TOP,
                        align: FAR_LEFT,
                        correctAnswer: "ALL",
                        waitForMs: 7000
                    },
                    {
                        text: "A4",
                        location: TOP,
                        align: NEAR_LEFT,
                        correctAnswer: "ALL",
                        waitForMs: 2000
                    },
                    {
                        text: "A1",
                        location: TOP,
                        align: MIDDLE,
                        correctAnswer: "ALL",
                        waitForMs: 7000
                    },
                    {
                        text: "Z7",
                        location: BOTTOM,
                        align: NEAR_RIGHT,
                        correctAnswer: "ALL",
                        waitForMs: 7000
                    },
                    {
                        text: "Z1",
                        location: TOP,
                        align: FAR_RIGHT,
                        correctAnswer: "ALL",
                        waitForMs: 2000
                    },
                    {
                        text: "Z2",
                        location: BOTTOM,
                        align: FAR_RIGHT,
                        correctAnswer: "ALL",
                        waitForMs: 2000
                    },
                    {
                        text: "A4",
                        location: BOTTOM,
                        align: FAR_LEFT,
                        correctAnswer: "ALL",
                        waitForMs: 2000
                    }
                ]];
                
var NUMBER_REACTION_TEST_ELEMENTS = null;
$.ajax({
    url: "data/numberreaction-data.json",
    async: false,
    success: function(json) {
        NUMBER_REACTION_TEST_ELEMENTS = json;
    },
    dataType: "json"
});

             
var CHARACTER_REACTION_TEST_ELEMENTS = null;
$.ajax({
    url: "data/characterreaction-data.json",
    async: false,
    success: function(json) {
        CHARACTER_REACTION_TEST_ELEMENTS = json;
    },
    dataType: "json"
});


var TASKSWITCHING_TEST_ELEMENTS = null;
$.ajax({
    url: "data/taskswitching-data.json",
    async: false,
    success: function(json) {
        TASKSWITCHING_TEST_ELEMENTS = json;
    },
    dataType: "json"
});


ts.tests = [];

var reactionTest = new ts.fn.createTest(
            "REACTION", 
            "Reaction test: press 'x' or 'n' when you see a character-number -combination.<br/><br/>Press spacebar to start.", 
            "Well done! Get ready for the next test.", 
            REACTION_TEST_ELEMENTS);
            
            
var numberReactionTest = new ts.fn.createTest(
            "NUMBERREACTION", 
            "Number reaction test: observe the top row.<br/>When the number in the character-number -pair is odd, press 'x'.<br/>Press 'n' when the number is even.<br/><br/>Press spacebar to start.", 
            "Well done! Get ready for the next test.",
            NUMBER_REACTION_TEST_ELEMENTS);
            
                        
var characterReactionTest = new ts.fn.createTest(
            "CHARACTERREACTION", 
            "Character reaction test: observe the bottom row.<br/>When the character in the character-number -pair is a consonant, press 'x'.<br/>Press 'n' when the character is a vowel.<br/><br/>Press spacebar to start.", 
            "Well done! Get ready for the next test.", 
            CHARACTER_REACTION_TEST_ELEMENTS);
            
var taskSwitchingTest = new ts.fn.createTest(
        "TASKSWITCHING",
        "Let's combine the previous ones!<br/>If the character-number pair appears in top, press 'x' for odd numbers, 'n' for even numbers.<br/>When the pair appears in the bottom, press 'x' for consonant, and 'n' for vowel.<br/><br/>Press spacebar to start.",
        "Thank you for participating!",
        TASKSWITCHING_TEST_ELEMENTS);


ts.tests.push(reactionTest);
ts.tests.push(numberReactionTest);
ts.tests.push(characterReactionTest);
ts.tests.push(taskSwitchingTest);

