var body = document.body;
var table = document.createElement('table');
var trs = [];
var tds = [];

var pTurn = 'X';
var cTurn  = 'O'

var turn = pTurn

var threeTd = false
var cCheck = 0
var dCheck = 0

var start
var end
var period
var param
var digit
var sub

var pScore = 0
var cScore = 0

start = Date.now()

function Game(event){
	

	
	var trNumber = trs.indexOf(event.target.parentNode)
	var tdNumber = tds[trNumber].indexOf(event.target)
	
	if(tds[trNumber][tdNumber].textContent === ""){
		tds[trNumber][tdNumber].textContent = turn
		if(threeTd === false){
			checkWin(trNumber, tdNumber)
			// checkWinC(trNumber, tdNumber)
	        turn = cTurn

			if(turn === cTurn){
				
				var rand1 = Math.floor(Math.random()*3)
				var rand2 = Math.floor(Math.random()*3)
				if(tds[rand1][rand2].textContent === ''){
					tds[rand1][rand2].textContent = cTurn
				}
				else if(tds[rand1][rand2].textContent !== ''){
					if(tds[0][0].textContent === ''){
						tds[0][0].textContent = cTurn
					}
					else if(tds[0][2].textContent === ''){
						tds[0][2].textContent = cTurn
					}
					else if(tds[0][1].textContent === ''){
						tds[0][1].textContent = cTurn
					}
					
					else if(tds[1][0].textContent === ''){
						tds[1][0].textContent = cTurn
					}
					else if(tds[1][1].textContent === ''){
						tds[1][1].textContent = cTurn
					}
					else if(tds[1][2].textContent === ''){
						tds[1][2].textContent = cTurn
					}
					else if(tds[2][0].textContent === ''){
						tds[2][0].textContent = cTurn
					}
					else if(tds[2][1].textContent === ''){
						tds[2][1].textContent = cTurn
					}
					else if(tds[2][2].textContent === ''){
						tds[2][2].textContent = cTurn
					}	
				
				}
				checkWin(trNumber, tdNumber)
				// checkWinC()
				turn = pTurn

			}
			else if(turn === pTurn){
				checkWin(trNumber, tdNumber)
				// checkWinC()
			}
		}
		if(threeTd === true && cCheck === 0){
			end = Date.now()
			alert("player is the winner")
		}
		else if(cCheck === 1 && threeTd === false){
			end = Date.now()
			alert("Cpu is the winner")			
		}
		
		
	}
	checkDraw()
	
period = end - start
calScore()

console.log("==DrawCheck: ",dCheck)
console.log("==time: ",period)
console.log("===Player: ",pScore)
console.log("===CPU: ", cScore)
}



function checkWin(trNumber, tdNumber ){ 
	var t
	for(t = 0; t < 3; t++){
		if ( tds[t][0].textContent === turn &&
		tds[t][1].textContent === turn &&
		tds[t][2].textContent === turn 
	   	) {
		   if(turn === pTurn){threeTd = true}
		   else if(turn === cTurn){cCheck = 1}
		}
	   
			   
   		else if (tds[0][t].textContent === turn &&
			tds[1][t].textContent === turn &&
			tds[2][t].textContent === turn
		   ){
			   if(turn === pTurn){threeTd = true}
			   else if(turn === cTurn){cCheck = 1}
		}
	}

	if ( 
		tds[0][0].textContent === turn &&
		tds[1][1].textContent === turn &&
		tds[2][2].textContent === turn
		) {
			if(turn === pTurn){threeTd = true}
			else if(turn === cTurn){cCheck = 1}
	}
			
	else if ( 
			tds[0][2].textContent === turn &&
			tds[1][1].textContent === turn &&
			tds[2][0].textContent === turn
			) {
				if(turn === pTurn){threeTd = true}
				else if(turn === cTurn){cCheck = 1}
	}
	

	console.log("===ThreeTd",threeTd)
	console.log("===c-check: ", cCheck)
}

function checkDraw(){
	if(tds[0][0].textContent !== '' && tds[0][1].textContent !== '' && tds[0][2].textContent !== '' && 
		tds[1][0].textContent !== '' && tds[1][1].textContent !== '' && tds[1][2].textContent !== '' && 
		tds[2][0].textContent !== '' && tds[2][1].textContent !== '' && tds[2][2].textContent !== '' ){
			if(threeTd === false && cCheck === 0){
				dCheck = 1
			}
	}
	if(dCheck === 1){
		end = Date.now()
		alert("draw")
	}
	else{pSocre = cScore = 0}
}

function calScore(){
	param = period/100
	digit = period/1000
	sub = digit%5
	// when the player wins
	if(threeTd === true){
		if(param > 0 && param < 10){pScore = 1000 + period}
		else if(10 <=param && param < 15){pScore = 60 + digit}
		else if(15 <= param && param < 25){pScore = 50 + digit}
		else if(25 <= param && param < 30){pScore = 45 + digit}
		else if(30 <= param && param < 77){pScore = 35 + sub}
		else if(param === 77){pScore = 7700}
		else{pScore = 10 + sub }

	}
	else if(cCheck === 1){cScore++}
	else if(dCheck === 1){pScore = 3}
}


//Activate the Game
for (var i = 0; i < 3; i += 1) {
    var tr = document.createElement('tr');
    trs.push(tr);
    tds.push([]);
    for (var j = 0; j < 3; j += 1) {
        var td = document.createElement('td');
        td.addEventListener('click', Game);
        tds[i].push(td);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
body.appendChild(table)
