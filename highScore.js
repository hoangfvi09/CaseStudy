

const highScore = JSON.parse(localStorage.getItem("highScores")) || [];
function addHighScore(){
let score={score:game.playerScore}
    highScore.push(score)
    highScore.sort((a, b)=>b.score-a.score)

    localStorage.setItem('highScores',JSON.stringify(highScore))
}
console.log(highScore)
