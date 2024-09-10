let rounds = [
    { 
        clues: ["gray.jpg", "we.jpg", "tea.jpg"], 
        answer: "GRAVITY",
        video: "gravity.mp4"
    },
    { 
        clues: ["hii.jpg", "pothys.jpg", "is.jpg"], 
        answer: "HYPOTHESIS",
        video: "hypothesis.mp4"
    },
    { 
        clues: ["bag.jpg", "tea.jpg", "ahh.jpg"], 
        answer: "BACTERIA",
        video: "bac.mp4"
    },
    { 
        clues: ["elec.jpg", "tri.jpg", "city.jpg"], 
        answer: "ELECTRICITY",
        video: "elec.mp4"
    },
    { 
        clues: ["mic.jpg", "row.jpg", "scope.jpg"], 
        answer: "MICROSCOPE",
        video: "micro.mp4"
    }
];

let currentRound = 0;
let attempts = 0;
const maxAttempts = 2;
let score = 0; // Initialize score

function loadRound(roundIndex) {
    let round = rounds[roundIndex];
    document.getElementById("clue1").src = round.clues[0];
    document.getElementById("clue2").src = round.clues[1];
    document.getElementById("clue3").src = round.clues[2];
    document.getElementById("answer").value = '';
    document.getElementById("result").textContent = '';
    document.getElementById("popup").style.display = 'none'; // Hide popup
    document.getElementById("vertical-frame").style.display = 'none'; // Hide video frame
    document.querySelector('.game-container').style.display = 'block'; // Show game container
    attempts = 0;
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.toUpperCase();
    let correctAnswer = rounds[currentRound].answer.toUpperCase();

    attempts++;

    if (userAnswer === correctAnswer) {
        score += 10; // Update score
        showPopup(`<span class="glitter">Correct! Well done! Score: ${score}</span>`, "correct");
    } else if (attempts >= maxAttempts) {
        showPopup(`Incorrect! The correct answer was ${correctAnswer}`, "wrong");
    } else {
        document.getElementById("result").textContent = "Try again!";
    }
    
}

function showPopup(message, type) {
    let popup = document.getElementById("popup");
    let popupMessage = document.getElementById("popupMessage");

    popupMessage.innerHTML = message;
    popup.className = `popup ${type}`;
    popup.style.display = "block";
}

function playVideo() {
    const videoFrame = document.getElementById("vertical-frame");
    const video = document.getElementById("feedback-video");
    const source = document.getElementById("video-source");
    const skipButton = document.getElementById("skipVideoButton");

    let round = rounds[currentRound];
    source.src = round.video;

    videoFrame.style.display = 'flex'; // Show vertical frame
    videoFrame.style.display = 'flex'; // Show video frame
    video.load();
    video.play();

    // Show the skip button when the video starts
    skipButton.style.display = 'block';

    video.onended = function() {
        skipButton.style.display = 'none'; // Hide the skip button when the video ends
        videoFrame.style.display = 'none'; // Hide video frame
        nextRound();
    };
}

function skipVideo() {
    const videoFrame = document.getElementById("vertical-frame");
    const video = document.getElementById("feedback-video");
    const skipButton = document.getElementById("skipVideoButton");

    video.pause();
    video.currentTime = 0; // Reset the video
    skipButton.style.display = 'none'; // Hide the skip button
    videoFrame.style.display = 'none'; // Hide video frame
    nextRound(); // Move to the next round
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    playVideo();
}

function nextRound() {
    currentRound++;
    if (currentRound < rounds.length) {
        loadRound(currentRound);
    } else {
        // Store the final score in localStorage
        localStorage.setItem('finalScore', score);

        // Redirect to the final score page
        window.location.href = "finalScore.html";
    }
}

window.onload = function() {
    loadRound(currentRound);
};
