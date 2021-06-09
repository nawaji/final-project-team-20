var body = document.body;
var table = document.createElement('table');
var trs = [];
var tds = [];
var pTurn = 'X';
var cTurn  = 'O'

var turn = pTurn

var threeTd = false

var start
var end
var period

start = Date.now()

function Game(event){
	

	
	var trNumber = trs.indexOf(event.target.parentNode)
	var tdNumber = tds[trNumber].indexOf(event.target)
	
	if(tds[trNumber][tdNumber].textContent === ""){
		tds[trNumber][tdNumber].textContent = turn
		
		


		
		// check
		

	

			
		
			
		
		if(threeTd === false){
			checkWin(trNumber, tdNumber)
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
				turn = pTurn

			}
			
				
			
		}
		if(threeTd === true){
			if(turn === pTurn){
				alert("player is the winner")
				end = Date.now()
			}
			if(turn === cTurn){
				alert("Cpu is the winner")
				end = Date.now()
			}
		}
	}
period = end - start
console.log("==time",period)
	
}

function checkWin(trNumber, tdNumber ){
	if ( tds[trNumber][0].textContent === turn &&
		tds[trNumber][1].textContent === turn &&
		tds[trNumber][2].textContent === turn 
	   ) {
		   threeTd = true;
		   }
	   
			   
   else if (tds[0][tdNumber].textContent === turn &&
			tds[1][tdNumber].textContent === turn &&
			tds[2][tdNumber].textContent === turn
		   ){
			   threeTd = true;
		   }
	   
			   
   else if (trNumber - tdNumber === 0) { 
		   if ( 
			   tds[0][0].textContent === turn &&
			   tds[1][1].textContent === turn &&
			  tds[2][2].textContent === turn
				   ) {
					   threeTd = true;
				   }
			   }
	   
   else if (Math.abs(trNumber - tdNumber) === 2) { 
				   if ( 
					   tds[0][2].textContent === turn &&
					   tds[1][1].textContent === turn &&
					   tds[2][0].textContent === turn
				   ) {
					   threeTd = true;
				   }
	}

	console.log(threeTd)
}


// let start = new Date()
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
body.appendChild(table);
// let end = new Date()
