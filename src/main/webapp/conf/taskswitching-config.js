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

//
//// text to show at start
//ts.config.startText = "Press any key to start.";
//// text to show at end
//ts.config.endText = "Thank you for participating!";
//
//
//// possible options: 
//// - REACTION (reaction test, see when a key pressed)
//// - NUMBERREACTION
//ts.config.testType = "NUMBERREACTION";
//
//// backend to submit data to
//ts.config.backendAddress = "app/result";
//
//
//// NUMBER REACTION EXAMPLE
//ts.config.elements = [
//    {
//        text: "R7",
//        location: "top",
//        align: "LEFT",
//        correctAnswer: "LEFT"
//    },
//    {
//        text: "S4",
//        location: "top",
//        align: "RIGHT",
//        correctAnswer: "RIGHT"
//    },
//    {
//        text: "H1",
//        location: "top",
//        align: "RIGHT",
//        correctAnswer: "LEFT"
//    },
//    {
//        text: "A7",
//        location: "bottom",
//        align: "LEFT",
//        correctAnswer: "LEFT"
//    },
//    {
//        text: "Z1",
//        location: "top",
//        align: "RIGHT",
//        correctAnswer: "LEFT"
//    },
//    {
//        text: "P2",
//        location: "bottom",
//        align: "RIGHT",
//        correctAnswer: "RIGHT"
//    },
//    {
//        text: "K4",
//        location: "bottom",
//        align: "LEFT",
//        correctAnswer: "RIGHT"
//    }
//];
     
                
var REACTION_TEST_ELEMENTS = [
                    {
                        text: "A7",
                        location: "top",
                        align: "LEFT",
                        correctAnswer: "ALL"
                    },
                    {
                        text: "A4",
                        location: "top",
                        align: "RIGHT",
                        correctAnswer: "ALL"
                    },
                    {
                        text: "A1",
                        location: "top",
                        align: "RIGHT",
                        correctAnswer: "ALL"
                    },
                    {
                        text: "Z7",
                        location: "bottom",
                        align: "LEFT",
                        correctAnswer: "ALL"
                    },
                    {
                        text: "Z1",
                        location: "top",
                        align: "RIGHT",
                        correctAnswer: "ALL"
                    },
                    {
                        text: "Z2",
                        location: "bottom",
                        align: "RIGHT",
                        correctAnswer: "ALL"
                    },
                    {
                        text: "A4",
                        location: "bottom",
                        align: "LEFT",
                        correctAnswer: "ALL"
                    }
                ];

var NUMBER_REACTION_TEST_ELEMENTS = [
                    {
                        text: "R7",
                        location: "top",
                        align: "LEFT",
                        correctAnswer: "LEFT"
                    },
                    {
                        text: "S4",
                        location: "top",
                        align: "RIGHT",
                        correctAnswer: "RIGHT"
                    },
                    {
                        text: "H1",
                        location: "top",
                        align: "RIGHT",
                        correctAnswer: "LEFT"
                    },
                    {
                        text: "A7",
                        location: "bottom",
                        align: "LEFT",
                        correctAnswer: "LEFT"
                    },
                    {
                        text: "Z1",
                        location: "top",
                        align: "RIGHT",
                        correctAnswer: "LEFT"
                    },
                    {
                        text: "P2",
                        location: "bottom",
                        align: "RIGHT",
                        correctAnswer: "RIGHT"
                    },
                    {
                        text: "K4",
                        location: "bottom",
                        align: "LEFT",
                        correctAnswer: "RIGHT"
                    }
                ];
                
                
var CHARACTER_REACTION_TEST_ELEMENTS = [
                    {
                        text: "R7",
                        location: "top",
                        align: "LEFT",
                        correctAnswer: "LEFT"
                    },
                    {
                        text: "S4",
                        location: "top",
                        align: "RIGHT",
                        correctAnswer: "LEFT"
                    },
                    {
                        text: "H1",
                        location: "top",
                        align: "RIGHT",
                        correctAnswer: "LEFT"
                    },
                    {
                        text: "A7",
                        location: "bottom",
                        align: "LEFT",
                        correctAnswer: "RIGHT"
                    },
                    {
                        text: "Z1",
                        location: "top",
                        align: "RIGHT",
                        correctAnswer: "LEFT"
                    },
                    {
                        text: "P2",
                        location: "bottom",
                        align: "RIGHT",
                        correctAnswer: "LEFT"
                    },
                    {
                        text: "K4",
                        location: "bottom",
                        align: "LEFT",
                        correctAnswer: "LEFT"
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
            "Number reaction test: press 'z' when the number in the character-number -pair is odd, and '.' when the number is even.<br/><br/>Press any key to start.", 
            "Well done! Get ready for the next test.",
            NUMBER_REACTION_TEST_ELEMENTS);
            
                        
var characterReactionTest = new ts.fn.createTest(
            "CHARACTERREACTION", 
            "Character reaction test: press 'z' when the character in the character-number -pair is a consonant, and '.' when the character is a vowel.<br/><br/>Press any key to start.", 
            "Thank you for participating!", 
            CHARACTER_REACTION_TEST_ELEMENTS);

ts.tests.push(reactionTest);
ts.tests.push(numberReactionTest);
ts.tests.push(characterReactionTest);
