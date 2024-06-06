// script.js
document.addEventListener('DOMContentLoaded', () => {
    const colorDisplay = document.getElementById('color-display');
    const userColorDisplay = document.getElementById('user-color-display');
    const result = document.getElementById('result');
    const timeTaken = document.getElementById('time-taken');
    const attempts = document.getElementById('attempts');
    const guessForm = document.getElementById('guess-form');
    let targetColor = generateDailyColor();
    let startTime = new Date();
    let attemptCount = 0;

    displayColor(colorDisplay, targetColor);

    guessForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const b = parseInt(document.getElementById('b-value').value);
        const g = parseInt(document.getElementById('g-value').value);
        const r = parseInt(document.getElementById('r-value').value);
        attemptCount++;
        attempts.textContent = attemptCount;
        
        const userColor = [b, g, r];
        displayColor(userColorDisplay, userColor);
        
        if (isColorMatch(targetColor, userColor)) {
            const endTime = new Date();
            const timeDiff = Math.round((endTime - startTime) / 1000);
            timeTaken.textContent = timeDiff;
            result.textContent = "Correct! You've matched the color!";
            result.style.color = "green";
        } else {
            result.textContent = "Try again!";
            result.style.color = "red";
        }
    });

    function generateDailyColor() {
        const date = new Date();
        const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
        return [randomBGR(seed), randomBGR(seed + 1), randomBGR(seed + 2)];
    }

    function randomBGR(seed) {
        const x = Math.sin(seed) * 10000;
        return Math.floor((x - Math.floor(x)) * 256);
    }

    function displayColor(element, [b, g, r]) {
        element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    function isColorMatch(target, guess) {
        return target.every((value, index) => Math.abs(value - guess[index]) <= 10);
    }
});
