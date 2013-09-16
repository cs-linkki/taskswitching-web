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
ts.config.elementVisibleInMs = 2500;

// pause between tests
ts.config.pauseBetweenTests = 5000;

ENGLISH_TEXTS = {
    REACTION_TEST_START_TEXT: "Reaction time task<br/><br/>Press 'x' or 'n' when you see any number-letter -pair on the screen.<br/><br/>Do the task as QUICKLY as you can.<br/><br/>Press spacebar to start.",
    REACTION_TEST_END_TEXT: "Awesome! RT is your average reaction time. Next, let us practice number reactions. (TODO TEXT)",
    
    NUMBERTASK_PRACTICE_START_TEXT: "Number task practice: Please observe the top row<br/><br/>When the number is even, press 'n'. When the number is odd, press 'x'.<br/><br/>Do the task as QUICKLY and CORRECTLY as possible.<br/><br/>Press spacebar to start.",
    NUMBERTASK_PRACTICE_END_TEXT: "TODO: TEXT",
    NUMBERTASK_PRACTICE_ATTEMPTS_LEFT: "Great work! If you want, you can still continue to practice.<br/><br/>Press spacebar to practice.<br/><br/>If you want to continue straight to the task, press 'x' or 'n'.",
    NUMBERTASK_START_TEXT: "Remember: When the number is even, press 'n'. When the number is odd, press 'x'.<br/><br/>Press spacebar to start.",
    NUMBERTASK_END_TEXT: "TODO: TEXT",

    CHARACTERTASK_PRACTICE_START_TEXT: "Letter task: Please observe the bottom row.<br/><br/>When the letter is a vowel, press 'n'. When the letter is a consonant, press 'x'.<br/><br/>Do the task as QUICKLY and CORRECTLY as possible.<br/><br/>Press spacebar to start.",
    CHARACTERTASK_PRACTICE_END_TEXT: "TODO: TEXT",
    CHARACTERTASK_PRACTICE_ATTEMPTS_LEFT: "Great work! If you want, you can still continue to practice.<br/><br/>Press spacebar to practice.<br/><br/>If you want to continue straight to the task, press 'x' or 'n'.<br/><br/>",
    CHARACTERTASK_START_TEXT: "Remember: When the letter is a vowel, press 'n'. When the letter is a consonant, press 'x'.<br/><br/>Press space to start.",
    CHARACTERTASK_END_TEXT: "TODO: TEXT",
    
    TASKSWITCHING_PRACTICE_START_TEXT: "Let's combine the previous number- and letter tasks:<br/>Please observe both rows.<br/><br/>Top row: When the number is even, press 'n'. When the number is odd, press 'x'.<br/>Bottom row: When the letter is a vowel, press 'n'. When the letter is a consonant, press 'x'.<br/><br/>Do the task as QUICKLY and CORRECTLY as possible.<br/><br/>Press spacebar to start.",
    TASKSWITCHING_PRACTICE_END_TEXT: "TODO: TEXT",
    TASKSWITCHING_PRACTICE_ATTEMPTS_LEFT: "Great work! If you want, you can still continue to practice by pressing spacebar.<br/><br/>If you want to continue straight to the test, press 'x' or 'n'.<br/><br/>Remember:<br/>On the top row, even = 'n', odd = 'x'.<br/>On the bottom row, vowel = 'n', consonant = 'x'.",
    TASKSWITCHING_START_TEXT: "Remember:<br/>On the top row, even = 'n', odd = 'x'.<br/>On the bottom row, vowel = 'n', consonant = 'x'.<br/><br/>Press space to start.",
    TASKSWITCHING_END_TEXT: "Thank you for participating!",
};

ts.texts = ENGLISH_TEXTS;

ts.pracelements = {
    NUMBER_TEST_ELEMENTS: [[
            {
                text: "G8",
                location: TOP,
                align: FAR_RIGHT,
                correctAnswer: "RIGHT"
            },
            {
                text: "E7",
                location: TOP,
                align: NEAR_RIGHT,
                correctAnswer: "LEFT"
            },
            {
                text: "Y5",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "LEFT"
            },
            {
                text: "M4",
                location: TOP,
                align: FAR_LEFT,
                correctAnswer: "RIGHT"
            },
            {
                text: "A2",
                location: TOP,
                align: NEAR_LEFT,
                correctAnswer: "RIGHT"
            },
            {
                text: "U9",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "LEFT"
            }

        ]],
    CHARACTER_TEST_ELEMENTS: [[
            {
                text: "U6",
                location: BOTTOM,
                align: FAR_RIGHT,
                correctAnswer: "RIGHT"
            },
            {
                text: "Y5",
                location: BOTTOM,
                align: NEAR_RIGHT,
                correctAnswer: "RIGHT"
            },
            {
                text: "M8",
                location: BOTTOM,
                align: MIDDLE,
                correctAnswer: "LEFT"
            },
            {
                text: "A4",
                location: BOTTOM,
                align: FAR_LEFT,
                correctAnswer: "RIGHT"
            },
            {
                text: "R7",
                location: BOTTOM,
                align: NEAR_LEFT,
                correctAnswer: "LEFT"
            },
            {
                text: "G2",
                location: BOTTOM,
                align: MIDDLE,
                correctAnswer: "LEFT"
            }
        ]],
    TASK_SWITCHING_ELEMENTS: [[
            {
                text: "K8",
                location: BOTTOM,
                align: FAR_RIGHT,
                correctAnswer: "LEFT"
            },
            {
                text: "R3",
                location: TOP,
                align: NEAR_RIGHT,
                correctAnswer: "LEFT"
            },
            {
                text: "M8",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "RIGHT"
            },
            {
                text: "R9",
                location: BOTTOM,
                align: FAR_LEFT,
                correctAnswer: "LEFT"
            },
            {
                text: "M2",
                location: BOTTOM,
                align: NEAR_LEFT,
                correctAnswer: "LEFT"
            },
            {
                text: "A7",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "LEFT"
            }
        ]]

};

ts.config.loadPracticeTest = function(type, initialDescription, postText) {

    var elements;
    switch (type) {
        case "NUMBERREACTION":
            elements = ts.pracelements.NUMBER_TEST_ELEMENTS;
            break;
        case "CHARACTERREACTION":
            elements = ts.pracelements.CHARACTER_TEST_ELEMENTS;
            break;
        case "TASKSWITCHING":
            elements = ts.pracelements.TASK_SWITCHING_ELEMENTS;
            break;
        default:
            console.log("Unable to determine test to load!: " + testType);
    }


    var test = new ts.fn.createTest(
            type,
            initialDescription,
            postText,
            elements);

    ts.tests = [];
    ts.tests.push(test);
};


// TODO: perhaps load tests already here?

ts.config.loadTestSet = function(type, initialDescription, postText, dataUrl) {

    var elements = null;
    $.ajax({
        url: dataUrl,
        async: false,
        success: function(json) {
            elements = json;
        },
        dataType: "json"
    });

    var test = new ts.fn.createTest(
            type,
            initialDescription,
            postText,
            elements);

    ts.tests = [];
    ts.tests.push(test);
};