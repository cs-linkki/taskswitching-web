if(!ts) {
    alert("Taskswitching not properly loaded.");
}

ts.config = {};

ts.config.endText = "Thank you for participating!";

// backend to submit data to
ts.config.backendAddress = "app/result";

// config for the app goes here
// how long to hide an element in milliseconds
ts.config.pauseBeforeFirstShow = 2500;

ts.config.pauseAfterWrongAnswerInMs = 1500;
ts.config.pauseAfterCorrectAnswerInMs = 150;

// how long to show an element in milliseconds
ts.config.elementVisibleInMs = 2500;

// pause between tests
ts.config.pauseBetweenTests = 5000;

     
                
var REACTION_TEST_ELEMENTS = [
                    {
                        text: "A7",
                        location: TOP,
                        align: LEFT,
                        correctAnswer: "ALL",
                        waitForMs: 7000
                    },
                    {
                        text: "A4",
                        location: TOP,
                        align: RIGHT,
                        correctAnswer: "ALL",
                        waitForMs: 2000
                    },
                    {
                        text: "A1",
                        location: TOP,
                        align: RIGHT,
                        correctAnswer: "ALL",
                        waitForMs: 7000
                    },
                    {
                        text: "Z7",
                        location: BOTTOM,
                        align: LEFT,
                        correctAnswer: "ALL",
                        waitForMs: 7000
                    },
                    {
                        text: "Z1",
                        location: TOP,
                        align: RIGHT,
                        correctAnswer: "ALL",
                        waitForMs: 2000
                    },
                    {
                        text: "Z2",
                        location: BOTTOM,
                        align: RIGHT,
                        correctAnswer: "ALL",
                        waitForMs: 2000
                    },
                    {
                        text: "A4",
                        location: BOTTOM,
                        align: LEFT,
                        correctAnswer: "ALL",
                        waitForMs: 2000
                    }
                ];

var NUMBER_REACTION_TEST_ELEMENTS = [
                    {
                        text: "G8",
                        location: TOP,
                        align: RIGHT,
                        correctAnswer: RIGHT
                    },
                    {
                        text: "E7",
                        location: TOP,
                        align: LEFT,
                        correctAnswer: LEFT
                    },
                    {
                        text: "I5",
                        location: TOP,
                        align: RIGHT,
                        correctAnswer: LEFT
                    },
                    {
                        text: "M4",
                        location: TOP,
                        align: LEFT,
                        correctAnswer: RIGHT
                    },
                    {
                        text: "A2",
                        location: TOP,
                        align: LEFT,
                        correctAnswer: RIGHT
                    },
                    {
                        text: "U9",
                        location: TOP,
                        align: LEFT,
                        correctAnswer: LEFT
                    }
                ];
                
                
var CHARACTER_REACTION_TEST_ELEMENTS = [
                    {
                        text: "U6",
                        location: BOTTOM,
                        align: RIGHT,
                        correctAnswer: RIGHT
                    },
                    {
                        text: "I5",
                        location: BOTTOM,
                        align: LEFT,
                        correctAnswer: RIGHT
                    },
                    {
                        text: "M8",
                        location: BOTTOM,
                        align: LEFT,
                        correctAnswer: LEFT
                    },
                    {
                        text: "A4",
                        location: BOTTOM,
                        align: LEFT,
                        correctAnswer: RIGHT
                    },
                    {
                        text: "R7",
                        location: BOTTOM,
                        align: RIGHT,
                        correctAnswer: LEFT
                    },
                    {
                        text: "G2",
                        location: BOTTOM,
                        align: LEFT,
                        correctAnswer: LEFT
                    },
                    {
                        text: "K4",
                        location: BOTTOM,
                        align: LEFT,
                        correctAnswer: LEFT
                    }
                ];
                     


var TASKSWITCHING_TEST_ELEMENTS = [
                    {
                        text: "U5",
                        location: TOP,
                        align: MIDDLE,
                        correctAnswer: LEFT
                    },
                    {
                        text: "U4",
                        location: TOP,
                        align: MIDDLE,
                        correctAnswer: RIGHT
                    },
                    {
                        text: "G7",
                        location: BOTTOM,
                        align: RIGHT,
                        correctAnswer: LEFT
                    },
                    {
                        text: "R3",
                        location: BOTTOM,
                        align: MIDDLE,
                        correctAnswer: LEFT
                    },
                    {
                        text: "G6",
                        location: BOTTOM,
                        align: RIGHT,
                        correctAnswer: LEFT
                    },
                    {
                        text: "K8",
                        location: TOP,
                        align: RIGHT,
                        correctAnswer: RIGHT
                    },
                    {
                        text: "M9",
                        location: TOP,
                        align: MIDDLE,
                        correctAnswer: LEFT
                    },
                    {
                        text: "M5",
                        location: BOTTOM,
                        align: RIGHT,
                        correctAnswer: RIGHT
                    },
                    {
                        text: "G7",
                        location: TOP,
                        align: RIGHT,
                        correctAnswer: LEFT
                    },
                    {
                        text: "E4",
                        location: TOP,
                        align: MIDDLE,
                        correctAnswer: RIGHT
                    }
                ];


ts.tests = [];

var reactionTest = new ts.fn.createTest(
            "REACTION", 
            "Reaction test: press 'z' or '.' when you see a character-number -combination.<br/><br/>Press any key to start.", 
            "Well done! Get ready for the next test.", 
            REACTION_TEST_ELEMENTS);
            
            
var numberReactionTest = new ts.fn.createTest(
            "NUMBERREACTION", 
            "Number reaction test: observe the top row.<br/>When the number in the character-number -pair is odd, press 'z'.<br/>Press '.' when the number is even.<br/><br/>Press any key to start.", 
            "Well done! Get ready for the next test.",
            NUMBER_REACTION_TEST_ELEMENTS);
            
                        
var characterReactionTest = new ts.fn.createTest(
            "CHARACTERREACTION", 
            "Character reaction test: observe the bottom row.<br/>When the character in the character-number -pair is a consonant, press 'z'.<br/>Press '.' when the character is a vowel.<br/><br/>Press any key to start.", 
            "Well done! Get ready for the next test.", 
            CHARACTER_REACTION_TEST_ELEMENTS);
            
var taskSwitchingTest = new ts.fn.createTest(
        "TASKSWITCHING",
        "Let's combine the previous ones!<br/>If the character-number pair appears in top, press 'z' for odd numbers, '.' for even numbers.<br/>When the pair appears in the bottom, press 'z' for consonant, and '.' for vowel.<br/><br/>Press any key to start.",
        "Thank you for participating!",
        TASKSWITCHING_TEST_ELEMENTS);


ts.tests.push(reactionTest);
ts.tests.push(numberReactionTest);
ts.tests.push(characterReactionTest);
ts.tests.push(taskSwitchingTest);

