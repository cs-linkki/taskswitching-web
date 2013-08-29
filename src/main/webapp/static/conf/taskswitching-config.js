if (!ts) {
    alert("Taskswitching-init not properly loaded.");
}

ts.config = {};

ts.config.endText = "Thank you for participating!";

// backend to submit data to
ts.config.backendResultAddress = "app/result";

// backend to get list counts from
ts.config.backendListCountAddress = "app/listcount";


// backend to get list counts from
ts.config.backendListCountAddress = "app/listcount";

// config for the app goes here
// how long to hide an element in milliseconds
ts.config.pauseBeforeFirstShow = 2500;

ts.config.pauseAfterWrongAnswerInMs = 1500;
ts.config.pauseAfterCorrectAnswerInMs = 150;

// how long to show an element in milliseconds
ts.config.elementVisibleInMs = 2540;

// pause between tests
ts.config.pauseBetweenTests = 5000;

ts.config.initTests = function(testType) {
    ts.tests = [];

    if (testType === "practice") {
        ts.config.loadPracticeTests();
    } else {
        ts.config.loadTests();
    }
};


ts.config.loadPracticeTests = function() {
    ts.tests = [];

    var NUMBER_TEST_ELEMENTS = [[
            {
                text: "G8",
                location: TOP,
                align: FAR_RIGHT,
                correctAnswer: "RIGHT",
                waitForMs: 7000
            },
            {
                text: "E7",
                location: TOP,
                align: NEAR_RIGHT,
                correctAnswer: "LEFT",
                waitForMs: 7000
            },
            {
                text: "Y5",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "LEFT",
                waitForMs: 7000
            },
            {
                text: "M4",
                location: TOP,
                align: FAR_LEFT,
                correctAnswer: "RIGHT",
                waitForMs: 7000
            },
            {
                text: "A2",
                location: TOP,
                align: NEAR_LEFT,
                correctAnswer: "RIGHT",
                waitForMs: 7000
            },
            {
                text: "U9",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "LEFT",
                waitForMs: 7000
            }
            
    ]];

    var CHARACTER_TEST_ELEMENTS = [[
            {
                text: "U6",
                location: BOTTOM,
                align: FAR_RIGHT,
                correctAnswer: "RIGHT",
                waitForMs: 7000
            },
            {
                text: "Y5",
                location: BOTTOM,
                align: NEAR_RIGHT,
                correctAnswer: "RIGHT",
                waitForMs: 7000
            },
            {
                text: "M8",
                location: BOTTOM,
                align: MIDDLE,
                correctAnswer: "LEFT",
                waitForMs: 7000
            },
            {
                text: "A4",
                location: BOTTOM,
                align: FAR_LEFT,
                correctAnswer: "RIGHT",
                waitForMs: 7000
            },
            {
                text: "R7",
                location: BOTTOM,
                align: NEAR_LEFT,
                correctAnswer: "LEFT",
                waitForMs: 7000
            },
            {
                text: "G2",
                location: BOTTOM,
                align: MIDDLE,
                correctAnswer: "LEFT",
                waitForMs: 7000
            }
    ]];

    var TASK_SWITCHING_ELEMENTS = [[
            {
                text: "K8",
                location: BOTTOM,
                align: FAR_RIGHT,
                correctAnswer: "LEFT",
                waitForMs: 7000
            },
            {
                text: "R3",
                location: TOP,
                align: NEAR_RIGHT,
                correctAnswer: "LEFT",
                waitForMs: 7000
            },
            {
                text: "M8",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "RIGHT",
                waitForMs: 7000
            },
            {
                text: "R9",
                location: BOTTOM,
                align: FAR_LEFT,
                correctAnswer: "LEFT",
                waitForMs: 7000
            },
            {
                text: "M2",
                location: BOTTOM,
                align: NEAR_LEFT,
                correctAnswer: "LEFT",
                waitForMs: 7000
            },
            {
                text: "A7",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "LEFT",
                waitForMs: 7000
            }
    ]];


    var numberReactionTest = new ts.fn.createTest(
            "NUMBERREACTION",
            "Number reaction test: observe the top row.<br/>When the number in the character-number -pair is odd, press 'x'.<br/>Press 'n' when the number is even.<br/><br/>Press spacebar to start.",
            "Well done! Get ready for the next test.",
            NUMBER_TEST_ELEMENTS);


    var characterReactionTest = new ts.fn.createTest(
            "CHARACTERREACTION",
            "Character reaction test: observe the bottom row.<br/>When the character in the character-number -pair is a consonant, press 'x'.<br/>Press 'n' when the character is a vowel.<br/><br/>Press spacebar to start.",
            "Well done! Get ready for the next test.",
            CHARACTER_TEST_ELEMENTS);

    var taskSwitchingTest = new ts.fn.createTest(
            "TASKSWITCHING",
            "Let's combine the previous ones!<br/>If the character-number pair appears in top, press 'x' for odd numbers, 'n' for even numbers.<br/>When the pair appears in the bottom, press 'x' for consonant, and 'n' for vowel.<br/><br/>Press spacebar to start.",
            "Thank you for participating!",
            TASK_SWITCHING_ELEMENTS);


    ts.tests.push(numberReactionTest);
    ts.tests.push(characterReactionTest);
    ts.tests.push(taskSwitchingTest);
};

ts.config.loadTests = function() {

    var REACTION_TEST_ELEMENTS = null;
    $.ajax({
        url: "static/data/reaction-data.json",
        async: false,
        success: function(json) {
            REACTION_TEST_ELEMENTS = json;
        },
        dataType: "json"
    });

    var NUMBER_REACTION_TEST_ELEMENTS = null;
    $.ajax({
        url: "static/data/numberreaction-data.json",
        async: false,
        success: function(json) {
            NUMBER_REACTION_TEST_ELEMENTS = json;
        },
        dataType: "json"
    });

    var CHARACTER_REACTION_TEST_ELEMENTS = null;
    $.ajax({
        url: "static/data/characterreaction-data.json",
        async: false,
        success: function(json) {
            CHARACTER_REACTION_TEST_ELEMENTS = json;
        },
        dataType: "json"
    });

    var TASKSWITCHING_TEST_ELEMENTS = null;
    $.ajax({
        url: "static/data/taskswitching-data.json",
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
};
