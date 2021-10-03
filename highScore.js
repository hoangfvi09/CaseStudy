

const highScore = JSON.parse(localStorage.getItem("highScores")) || [];
function addHighScore(){
let score={score:game.playerScore}
    highScore.push(score)
    highScore.sort((a, b)=>b.score-a.score)

    localStorage.setItem('highScores',JSON.stringify(highScore))
}
let highScoreList= 'HIGHSCORE: ';
if(highScore.length<5){
    for(let i=0;i<highScore.length;i++){
            highScoreList+=highScore[i].score+' <br>'
    }
}else{
    for(let i=0;i<5;i++){
            highScoreList+=highScore[i].score+' <br>'
    }
}

document.getElementById('highScore').innerHTML=highScoreList
