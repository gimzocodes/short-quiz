const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.map( score => {
    return `<li id="high-score">${score.name} - ${score.score}</li>`
}) .join("");
