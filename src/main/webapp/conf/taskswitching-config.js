if(!ts) {
    alert("Something wrong, john!");
}

ts.config = {};

// text to show at start
ts.config.startText = "Press any key to start.";
// text to show at end
ts.config.endText = "Thank you for participating!";


// possible options: 
// - REACTION (reaction test, see when a key pressed)
// - NUMBERREACTION
ts.config.testType = "NUMBERREACTION";

// backend to submit data to
ts.config.backendAddress = "app/result";

// config for the app goes here
// how long to hide an element in milliseconds
ts.config.pauseBeforeFirstShow = 2500;

ts.config.pauseAfterWrongAnswerInMs = 1500;
ts.config.pauseAfterCorrectAnswerInMs = 150;

// how long to show an element in milliseconds
ts.config.elementVisibleInMs = 2500;

// NUMBER REACTION EXAMPLE
ts.config.elements = [
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
        correctAnswer: "LEFT"
    },
    {
        text: "P2",
        location: "bottom",
        correctAnswer: "RIGHT"
    },
    {
        text: "K4",
        location: "bottom",
        correctAnswer: "RIGHT"
    }
];
