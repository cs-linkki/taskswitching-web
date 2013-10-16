if (!ts) {
    alert("Taskswitching-init not properly loaded.");
}

// config for the app goes here
ts.config = {};

ts.config.endText = "Thank you for participating!";

// backend to submit data to
ts.config.backendResultAddress = "app/result";

// backend to get list counts from
ts.config.backendListCountAddress = "app/listcount";


// backend to get list counts from
ts.config.backendListCountAddress = "app/listcount";

// how long to hide an element in milliseconds
ts.config.pauseBeforeFirstShow = 2500;

ts.config.pauseAfterWrongAnswerInMs = 1500;
ts.config.pauseAfterCorrectAnswerInMs = 150;

// how long to show an element in milliseconds
ts.config.elementVisibleInMs = 2500;

// pause between tests
ts.config.pauseBetweenTests = 5000;

ENGLISH_TEXTS = {
    REACTION_TEST_START_TEXT: "Reaction time task<br/><br/>Press 'x' or 'm', when you see any number-letter -pair on the screen.<br/><br/>Do the task as QUICKLY as you can.<br/><br/>Press spacebar to start.",
    REACTION_TEST_END_TEXT: "Awesome! RT is your average reaction time.",
    
    NUMBERTASK_PRACTICE_START_TEXT: "Number task practise: Please observe the top row.<br/><br/>When the number is odd, press 'x'. When the number is even, press 'm'.<br/><br/>Do the task as QUICKLY and CORRECTLY as possible.<br/><br/>Press spacebar to start to practise.",
    NUMBERTASK_PRACTICE_END_TEXT: "TODO: TEXT",
    NUMBERTASK_PRACTICE_ATTEMPTS_LEFT: "Great work! If you want, you can still continue to practise.<br/><br/>Press spacebar to practise.<br/><br/>To skip the practise and to continue straight to the task, press 'x' or 'm'.",
    NUMBERTASK_START_TEXT: "Remember: When the number is odd, press 'x'. When the number is even, press 'm'.<br/><br/>Press spacebar to start.",
    NUMBERTASK_END_TEXT: "TODO: TEXT",

    CHARACTERTASK_PRACTICE_START_TEXT: "Letter task practise: Please observe the bottom row.<br/><br/>When the letter is a consonant, press 'x'. When the letter is a vowel, press 'm'.<br/><br/>Do the task as QUICKLY and CORRECTLY as possible.<br/><br/>Press spacebar to start to practise.",
    CHARACTERTASK_PRACTICE_END_TEXT: "TODO: TEXT",
    CHARACTERTASK_PRACTICE_ATTEMPTS_LEFT: "Great work! If you want, you can still continue to practise.<br/><br/>Press spacebar to practise.<br/><br/>To skip the practise and to continue straight to the task, press 'x' or 'm'.",
    CHARACTERTASK_START_TEXT: "Remember: When the letter is a consonant, press 'x'. When the letter is a vowel, press 'm'.<br/><br/>Press spacebar to start.",
    CHARACTERTASK_END_TEXT: "TODO: TEXT",
    
    TASKSWITCHING_PRACTICE_START_TEXT: "Let's combine the previous number- and letter tasks:<br/>Please observe both rows. First, you get to practise the task.<br/><br/>Top row: When the number is odd, press 'x'. When the number is even, press 'm'.<br/>Bottom row: When the letter is a consonant, press 'x'. When the letter is a vowel, press 'm'.<br/><br/>Do the task as QUICKLY and CORRECTLY as possible.<br/><br/>Press spacebar to start to practise.",
    TASKSWITCHING_PRACTICE_END_TEXT: "TODO: TEXT",
    TASKSWITCHING_PRACTICE_ATTEMPTS_LEFT: "Great work! If you want, you can still continue to practise by pressing spacebar.<br/><br/>To skip the practise and to continue straight to the task, press 'x' or 'm'.",
    TASKSWITCHING_START_TEXT: "Remember:<br/>On the top row, odd = 'x', even = 'm'.<br/>On the bottom row, consonant = 'x', vowel = 'm'.<br/><br/>Press spacebar to start.",
    TASKSWITCHING_END_TEXT: "Thank you for participating!"
};

ENGLISH_TEXTS_MOBILE = {
    REACTION_TEST_START_TEXT: "Reaction time task<br/><br/>Press red or green, when you see any number-letter -pair on the screen.<br/><br/>Do the task as QUICKLY as you can.<br/><br/>Press black to start.",
    REACTION_TEST_END_TEXT: "Awesome! RT is your average reaction time.",
    
    NUMBERTASK_PRACTICE_START_TEXT: "Number task practise: Please observe the top row.<br/><br/>When the number is odd, press red. When the number is even, press green.<br/><br/>Do the task as QUICKLY and CORRECTLY as possible.<br/><br/>Press black to start to practise.",
    NUMBERTASK_PRACTICE_END_TEXT: "TODO: TEXT",
    NUMBERTASK_PRACTICE_ATTEMPTS_LEFT: "Great work! If you want, you can still continue to practise.<br/><br/>Press black to practise.<br/><br/>To skip the practise and to continue straight to the task, press red or green.",
    NUMBERTASK_START_TEXT: "Remember: When the number is odd, press red. When the number is even, press green.<br/><br/>Press black to start.",
    NUMBERTASK_END_TEXT: "TODO: TEXT",

    CHARACTERTASK_PRACTICE_START_TEXT: "Letter task practise: Please observe the bottom row.<br/><br/>When the letter is a consonant, press red. When the letter is a vowel, press green.<br/><br/>Do the task as QUICKLY and CORRECTLY as possible.<br/><br/>Press black to start to practise.",
    CHARACTERTASK_PRACTICE_END_TEXT: "TODO: TEXT",
    CHARACTERTASK_PRACTICE_ATTEMPTS_LEFT: "Great work! If you want, you can still continue to practise.<br/><br/>Press black to practise.<br/><br/>To skip the practise and to continue straight to the task, press red or green.",
    CHARACTERTASK_START_TEXT: "Remember: When the letter is a consonant, press red. When the letter is a vowel, press green.<br/><br/>Press black to start.",
    CHARACTERTASK_END_TEXT: "TODO: TEXT",
    
    TASKSWITCHING_PRACTICE_START_TEXT: "Let's combine the previous number- and letter tasks:<br/>Please observe both rows. First, you get to practise the task.<br/><br/>Top row: When the number is odd, press red. When the number is even, press green.<br/>Bottom row: When the letter is a consonant, press red. When the letter is a vowel, press green.<br/><br/>Do the task as QUICKLY and CORRECTLY as possible.<br/><br/>Press black to start to practise.",
    TASKSWITCHING_PRACTICE_END_TEXT: "TODO: TEXT",
    TASKSWITCHING_PRACTICE_ATTEMPTS_LEFT: "Great work! If you want, you can still continue to practise by pressing black.<br/><br/>To skip the practise and to continue straight to the task, press red or green.",
    TASKSWITCHING_START_TEXT: "Remember:<br/>On the top row, odd = red, even = green.<br/>On the bottom row, consonant = red, vowel = green.<br/><br/>Press black to start.",
    TASKSWITCHING_END_TEXT: "Thank you for participating!"
};

FINNISH_TEXTS = {
    REACTION_TEST_START_TEXT: "Reaktioaikatehtävä<br/><br/>Paina 'x' tai 'm', kun näet ruudulla minkä tahansa kirjain-numero -parin.<br/><br/>Tee tehtävä niin NOPEASTI kuin pystyt.<br/><br/>Pääset tehtävään välilyönnillä.",
    REACTION_TEST_END_TEXT: "Hienoa! RT on keskimääräinen reaktioaikasi.",
    
    NUMBERTASK_PRACTICE_START_TEXT: "Numerotehtävän harjoitus: Tarkkaile yläriviä.<br/><br/>Kun numero on pariton, paina 'x'. Kun numero on parillinen, paina 'm'.<br/><br/>Tee tehtävä niin NOPEASTI ja VIRHEETTÖMÄSTI kuin pystyt.<br/><br/>Pääset harjoitukseen välilyönnillä.",
    NUMBERTASK_PRACTICE_END_TEXT: "TODO: TEXT",
    NUMBERTASK_PRACTICE_ATTEMPTS_LEFT: "Hienoa! Jos haluat, saat vielä jatkaa harjoittelua.<br/><br/>Pääset harjoitukseen välilyönnillä.<br/><br/>Jos haluat jatkaa suoraan tehtävään, paina 'x' tai 'm'.",
    NUMBERTASK_START_TEXT: "Muista: Kun numero on pariton, paina 'x'. Kun numero on parillinen, paina 'm'.<br/><br/>Pääset tehtävään välilyönnillä.",
    NUMBERTASK_END_TEXT: "TODO: TEXT",

    CHARACTERTASK_PRACTICE_START_TEXT: "Kirjaintehtävän harjoitus: Tarkkaile yläriviä.<br/><br/>Kun kirjain on konsonantti, paina 'x'. Kun kirjain on vokaali, paina 'm'.<br/><br/>Tee tehtävä niin NOPEASTI ja VIRHEETTÖMÄSTI kuin pystyt.<br/><br/>Pääset harjoitukseen välilyönnillä.",
    CHARACTERTASK_PRACTICE_END_TEXT: "TODO: TEXT",
    CHARACTERTASK_PRACTICE_ATTEMPTS_LEFT: "Hienoa! Jos haluat, saat vielä jatkaa harjoittelua.<br/><br/>Pääset harjoitukseen välilyönnillä.<br/><br/>Jos haluat jatkaa suoraan tehtävään, paina 'x' tai 'm'.",
    CHARACTERTASK_START_TEXT: "Muista: Kun kirjain on konsonantti, paina 'x'. Kun kirjain on vokaali, paina 'm'.<br/><br/>Pääset tehtävään välilyönnillä.",
    CHARACTERTASK_END_TEXT: "TODO: TEXT",
    
    TASKSWITCHING_PRACTICE_START_TEXT: "Nyt tehdään edellisiä numero- ja kirjaintehtäviä yhtä aikaa:<br/>Tarkkaile molempia rivejä. Saat ensin harjoitella tehtävää.<br/><br/>Ylärivi: Kun numero on pariton, paina 'x'. Kun numero on parillinen, paina 'm'.<br/>Alarivi: Kun kirjain on konsonantti, paina 'x'. Kun kirjain on vokaali, paina 'm'.<br/><br/>Tee tehtävä niin NOPEASTI ja VIRHEETTÖMÄSTI kuin pystyt.",
    TASKSWITCHING_PRACTICE_END_TEXT: "TODO: TEXT",
    TASKSWITCHING_PRACTICE_ATTEMPTS_LEFT: "Hienoa! Jos haluat, saat vielä jatkaa harjoittelua painamalla välilyöntiä.<br/><br/>Jos haluat suoraan tehtävään, paina 'x' tai 'm'.",
    TASKSWITCHING_START_TEXT: "Muista:<br/>Ylärivillä pariton = 'x', parillinen = 'm'.<br/>Alarivillä konsonantti = 'x', vokaali = 'm'.<br/><br/>Pääset tehtävään välilyönnillä.",
    TASKSWITCHING_END_TEXT: "Kiitos osallistumisesta!"
};

 // set used text
ts.texts = ENGLISH_TEXTS;
if(location.pathname.indexOf("mobile") !== -1) {
    ts.texts = ENGLISH_TEXTS_MOBILE;
} else if (location.pathname.indexOf("finnish") !== -1) {
    ts.texts = FINNISH_TEXTS;    
}

ts.pracelements = {
    NUMBER_TEST_ELEMENTS: [[
            {
                text: "g8",
                location: TOP,
                align: FAR_RIGHT,
                correctAnswer: "RIGHT"
            },
            {
                text: "e7",
                location: TOP,
                align: NEAR_RIGHT,
                correctAnswer: "LEFT"
            },
            {
                text: "i5",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "LEFT"
            },
            {
                text: "m4",
                location: TOP,
                align: FAR_LEFT,
                correctAnswer: "RIGHT"
            },
            {
                text: "a2",
                location: TOP,
                align: NEAR_LEFT,
                correctAnswer: "RIGHT"
            },
            {
                text: "u9",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "LEFT"
            }

        ]],
    CHARACTER_TEST_ELEMENTS: [[
            {
                text: "u6",
                location: BOTTOM,
                align: FAR_RIGHT,
                correctAnswer: "RIGHT"
            },
            {
                text: "i5",
                location: BOTTOM,
                align: NEAR_RIGHT,
                correctAnswer: "RIGHT"
            },
            {
                text: "m8",
                location: BOTTOM,
                align: MIDDLE,
                correctAnswer: "LEFT"
            },
            {
                text: "a4",
                location: BOTTOM,
                align: FAR_LEFT,
                correctAnswer: "RIGHT"
            },
            {
                text: "r7",
                location: BOTTOM,
                align: NEAR_LEFT,
                correctAnswer: "LEFT"
            },
            {
                text: "g2",
                location: BOTTOM,
                align: MIDDLE,
                correctAnswer: "LEFT"
            }
        ]],
    TASK_SWITCHING_ELEMENTS: [[
            {
                text: "k8",
                location: BOTTOM,
                align: FAR_RIGHT,
                correctAnswer: "LEFT"
            },
            {
                text: "r3",
                location: TOP,
                align: NEAR_RIGHT,
                correctAnswer: "LEFT"
            },
            {
                text: "m8",
                location: TOP,
                align: MIDDLE,
                correctAnswer: "RIGHT"
            },
            {
                text: "r9",
                location: BOTTOM,
                align: FAR_LEFT,
                correctAnswer: "LEFT"
            },
            {
                text: "m2",
                location: BOTTOM,
                align: NEAR_LEFT,
                correctAnswer: "LEFT"
            },
            {
                text: "a7",
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