const options = {
    mars: ["It is the fourth planet from the Sun.", "It is known as the Red Planet.", "It has two moons named Phobos and Deimos."],
    hydrogen: ["The lightest element in the universe.", "It is the most abundant element in the universe.", "It is used in fuel cells to produce electricity."],
    heart: ["It beats approximately 70 times per minute.", "It pumps blood throughout the body.", "It is a muscular organ in humans and other animals."],
    seven: ["It is the middle of the pH scale.", "It is considered a lucky number in many cultures.", "There are seven continents on Earth."],
    einstein: ["His famous equation is E=mc².", "He developed the theory of relativity.", "He was awarded the Nobel Prize in Physics in 1921."],
    pancreas: ["It is located near the stomach.", "It produces insulin.", "It plays a vital role in digestion."],
    avogadro: ["It is fundamental to the behavior of gases.", "His number is 6.022 × 10²³.", "He was an Italian scientist."],
    archimedes: ["It explains why objects float or sink.", "He shouted 'Eureka!' when he discovered it.", "He was a Greek mathematician and inventor."],
    o: ["It can be given to any blood type.", "It is known as the universal donor.", "It lacks A and B antigens."],
    kidney: ["It is a pair of bean-shaped organs.", "It filters waste from the blood.", "It produces urine."],
    skin: ["It covers and protects the entire body.", "It is the largest organ in the human body.", "It helps regulate body temperature."],
};

// Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");

const words = Object.keys(options);
let randomWord = "", randomHints = [];
let winCount = 0, lossCount = 0, correctAnswers = 0, totalQuestions = 3, currentQuestion = 0, hintIndex = 0;

// Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Block all the buttons
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    lettersButtons.forEach((button) => {
        button.disabled = true;
    });
};

// Start Game
startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    startBtn.innerText = "Next Question";
    init();
});

// Stop Game
const stopGame = () => {
    controls.classList.remove("hide");
};

// Generate Word Function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHints = options[randomWord];
    hintIndex = 0;
    displayHint();

    let displayItem = "";
    randomWord.split("").forEach((value) => {
        displayItem += '<span class="inputSpace">_ </span>';
    });

    // Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount' style="color:red;">Chances Left: ${lossCount}</div>`;
};

// Display the current hint
const displayHint = () => {
    if (hintIndex === 0) {
        hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHints[hintIndex]}</div>`;
    } else {
        hintRef.innerHTML += `<div id="wordHint"><span>Hint: </span>${randomHints[hintIndex]}</div>`;
    }
};

// Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHints = [];
    hintIndex = 0;
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    currentQuestion++;

    if (currentQuestion <= totalQuestions) {
        generateWord();

        // For creating letter buttons
        for (let i = 65; i < 91; i++) {
            let button = document.createElement("button");
            button.classList.add("letters");

            // Number to ASCII[A-Z]
            button.innerText = String.fromCharCode(i);

            // Character button onclick
            button.addEventListener("click", () => {
                let charArray = randomWord.toUpperCase().split("");
                let inputSpace = document.getElementsByClassName("inputSpace");

                // If array contains clicked value replace the matched Dash with Letter
                if (charArray.includes(button.innerText)) {
                    charArray.forEach((char, index) => {
                        // If character in array is same as clicked button
                        if (char === button.innerText) {
                            button.classList.add("correct");
                            // Replace dash with letter
                            inputSpace[index].innerText = char;
                            // Increment counter
                            winCount += 1;
                            // If winCount equals word length
                            if (winCount === charArray.length) {
                                resultText.innerHTML = "Correct Answer!";
                                correctAnswers++; // Increment correct answer count
                                blocker();
                                if (currentQuestion < totalQuestions) {
                                    stopGame();
                                } else {
                                    endGame();
                                }
                            }
                        }
                    });
                } else {
                    // Lose count
                    button.classList.add("incorrect");
                    lossCount -= 1;
                    document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
                    message.innerText = `Incorrect Letter`;
                    message.style.color = "#ff0000";
                    if (lossCount > 0 && hintIndex < randomHints.length - 1) {
                        hintIndex++;
                        displayHint();
                    }
                    if (lossCount === 0) {
                        word.innerHTML = `The word was: <span>${randomWord}</span>`;
                        resultText.innerHTML = "Wrong Answer!";
                        blocker();
                        if (currentQuestion < totalQuestions) {
                            stopGame();
                        } else {
                            endGame();
                        }
                    }
                }

                // Disable clicked buttons
                button.disabled = true;
            });

            // Append generated buttons to the letters container
            letterContainer.appendChild(button);
        }
    } else {
        endGame();
    }
};

// End Game Function
const endGame = () => {
    // Calculate final score
    const score = correctAnswers * 5;
    message.innerText = `Session Over! Your final score is ${score} (${correctAnswers} correct answers out of ${totalQuestions}).`;
    letterContainer.classList.add("hide");
    resultText.innerHTML = "";
    word.innerHTML = "";

    // Display congratulatory animation
    controls.classList.remove("hide");
    controls.innerHTML = `
        <div class="congratulations">
            <h1>Thank you for your participation😊🤞🤞</h1>
            <p>You completed the game!</p>
            <p>Your final score is <strong>${score}</strong></p>
            <a href="game.html" style="background-color: #333;color: white;padding: 10px 20px; text-decoration:none">EXIT</a>
        </div>
    `;

    // Reset for next session
    startBtn.innerText = "Restart";
    currentQuestion = 0;
    correctAnswers = 0;
};

window.onload = () => {
    controls.classList.remove("hide");
};
