const questions = [
    { 
        clues: [
            "A young man travels to the city to seek revenge for his father's death. (2019)", 
            "The film's title refers to a style of music popular in South India.",
            "The movie stars Rajinikanth and features a strong theme of revenge.",
        ], 
        answer: "Petta" 
    },
    { 
        clues: [
            "An advocate from Madurai fights against corruption. (2005)", 
            "The movie was directed by Shankar and stars Vikram.", 
            "The protagonist has a dissociative identity disorder."
        ], 
        answer: "Anniyan" 
    },
    { 
        clues: [
            "A story of vintage love. (2018)", 
            "The film features Vijay Sethupathi and Trisha Krishnan.", 
            "It is a romantic drama that revolves around love and memories."
        ], 
        answer: "96" 
    },
    { 
        clues: [
            "A story of  a man who's life changes when he encounters a woman during is kabadi match in madurai", 
            "The film features Vijay  and Trisha Krishnan.", 
            "It is a romantic drama that revolves around love and memories."
        ], 
        answer: "Ghilli" 
    },
    {
    clues: [
        "A Scientist tries to bring back the power of a saint that was lost centuries ago", 
        "The film features Surya  and Sruti Hasan.", 
        "It is a historical drama that revolves around war and culture."
    ], 
    answer: "Ezham Arivu" 
    },
];

let currentQuestion = 0;
let currentClueIndex = 0;

function displayQuestion() {
    document.getElementById("description").innerText = questions[currentQuestion].clues[currentClueIndex];
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        document.getElementById("feedback").innerText = "Correct!";
        currentQuestion++;
        currentClueIndex = 0;
        if (currentQuestion < questions.length) {
            setTimeout(() => {
                document.getElementById("answer").value = '';
                document.getElementById("feedback").innerText = '';
                displayQuestion();
            }, 1000);
        } else {
            document.getElementById("feedback").innerText = "You've completed the quiz!";
        }
    } else {
        document.getElementById("feedback").innerText = "Wrong! Try again.";
    }
}

function nextClue() {
    currentClueIndex++;
    if (currentClueIndex < questions[currentQuestion].clues.length) {
        document.getElementById("description").innerText = questions[currentQuestion].clues[currentClueIndex];
    } else {
        document.getElementById("feedback").innerText = "No more clues available for this question!";
    }
}

window.onload = displayQuestion;
