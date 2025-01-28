
let randomNum = Math.floor(Math.random() * 20) + 1;
console.log(randomNum);
let gameOn = true;
let attempts = 1;
let htmlArray = [];

document.querySelector(".submit-button").
    addEventListener('click', () => {
        startGame();
    });

document.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    if (keyPressed == 'Enter') {
        startGame();
    }
})
document.querySelector(".restart-btn").addEventListener('click', () => {
    restart();
});

function checkUserInput(userInput) {
    let result = '';
    let state = '';
    const userGuess = Number(userInput);
    if (attempts > 5) {
        gameOn = false;
    }
    if (userGuess === randomNum) {
        result = 'Congratulations you guessed the secret number';
        document.querySelector(".restart-btn").removeAttribute('hidden');
        gameOn = false;
        state = 'correct';
    } else if (userGuess < randomNum) {
        result = 'too low! try again';
        state = 'Low';
        document.querySelector(".input-box").value = '';
        

    } else if (userGuess > randomNum) {
        result = 'too high! try again';
        state = 'high';
        document.querySelector(".input-box").value = '';

    }
    document.querySelector(".title-p").innerHTML = result;
    htmlArray.push(`
    
        <div class="single-box">
            <p>${userGuess}</p>
            <p>${state}</p>
        </div>
    `);
    displayMemory();
}



function endOfGame() {
    document.querySelector(".title-p").innerHTML = `you lost the secrect number was ${randomNum}`;
    document.querySelector(".restart-btn").removeAttribute('hidden');
}

function startGame() {
    const userInput = document.querySelector(".input-box").value;

    if (userInput && gameOn && attempts <= 5) {
        checkUserInput(userInput);
        if (gameOn) {
            attempts++;
            if (attempts <= 5) {
                document.querySelector(".attempts-p").innerHTML = `attempt: ${attempts}`;
            }
        }
        if (attempts > 5) {
            endOfGame();
        }
        console.log(`attempts ${attempts}`);
        console.log(`game case ${gameOn}`);
    }

}

function restart() {
    gameOn = true;
    attempts = 1;
    document.querySelector(".title-p").innerHTML = "Guess the Secret Number!!!";
    document.querySelector(".attempts-p").innerHTML = `attempt: ${attempts}`;
    document.querySelector(".restart-btn").setAttribute("hidden", "");
    document.querySelector(".input-box").value = '';
    randomNum = Math.floor(Math.random() * 20) + 1;
    console.log(randomNum);
    htmlArray = [];
    document.querySelector(".memory-div").innerHTML = '';

}

function displayMemory() {
    let html = '';
    // for (let i = 0; i < htmlArray.length; i++) {
    //     html += htmlArray[i];
    // }
    htmlArray.forEach((element) => {
        html += element;
    })
    document.querySelector(".memory-div").innerHTML = html;
}