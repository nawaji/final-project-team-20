var body = document.body;
var table = document.createElement('table');
var trs = [];
var tds = [];
var pTurn = 'X';
var cTurn  = 'O'

var turn = pTurn

var threeTd

var start
var end
var period


function Game(event){
	start = new Date()
	var trNumber = trs.indexOf(event.target.parentNode)
	var tdNumber = tds[trNumber].indexOf(event.target)
	
	if(tds[trNumber][tdNumber].textContent === ''){
		tds[trNumber][tdNumber].textContent = turn
		ThreeTd = false

		
		// check
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

		// Check who is the winner
		if(threeTd === true){
			if(turn === pTurn){
				// alert("player is the winner")
				end = new Date()
				// tds.forEach(function (tr) {
				// 	tr.forEach(function (td) {
				// 		td.textContent = ''
				// 	})
				// })
			}
			else if(turn === cTurn){
				// alert("Cpu is the winner")
				end = new Date()
				// tds.forEach(function (tr) {
				// 	tr.forEach(function (td) {
				// 		td.textContent = ''
				// 	})
				// })
			}

			
			
			
		}
		else if(ThreeTd === false){
			if(turn === pTurn){
				var rand1 = Math.floor(Math.random()*2)
				var rand2 = Math.floor(Math.random()*2)
				if(tds[rand1][rand2].textContent !== pTurn){
					tds[rand1][rand2].textContent = cTurn
				}
				else{
					rand1 = Math.floor(Math.random()*2)
					rand2 = Math.floor(Math.random()*2)
				}

			}
			else if (turn === cTurn){
				turn = pTurn
			}
		}

	}
	period = end - start
console.log("==time",period)
	

}

// let start = new Date()
for (var i = 0; i < 3; i++) {
    var tr = document.createElement('tr');
    trs.push(tr);
    tds.push([]);
    for (var j = 0; j < 3; j++) {
        var td = document.createElement('td');
        td.addEventListener('click', Game);
        tds[i].push(td);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
body.appendChild(table);
// let end = new Date()



 