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
					if(tds[1][2].textContent === ''){
						tds[1][2].textContent = cTurn
					}
					else if(tds[0][0].textContent === ''){
						tds[0][0].textContent = cTurn
					}
					else if(tds[0][2].textContent === ''){
						tds[0][2].textContent = cTurn
					}
					else if(tds[2][0].textContent === ''){
						tds[2][0].textContent = cTurn
					}
					else if(tds[2][2].textContent === ''){
						tds[2][2].textContent = cTurn
					}	
					
					else if(tds[1][0].textContent === ''){
						tds[1][0].textContent = cTurn
					}
					else if(tds[0][1].textContent === ''){
						tds[0][1].textContent = cTurn
					}
					else if(tds[1][1].textContent === ''){
						tds[1][1].textContent = cTurn
					}
					else if(tds[2][1].textContent === ''){
						tds[2][1].textContent = cTurn
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
		if(threeTd === true){
			end = Date.now()
			alert("You win the Game!")
			showModal()
			// location.reload()
		}
		else if(cCheck === 1){
			end = Date.now()
			alert("You Lose!")	
			location.reload()		
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
		alert("It is Tie Game!")
		showModal()
	}
	else{pSocre = cScore = 0}
}

function calScore(){
	
	// when the player wins
	if(threeTd === true){
		if(param > 0 && param < 10){pScore = 1000}
		else if(10 <=param && param < 15){pScore = 60}
		else if(15 <= param && param < 25){pScore = 50}
		else if(25 <= param && param < 30){pScore = 45}
		else if(30 <= param && param < 77){pScore = 35}
		// Jackpot!!!
		else if(param === 77){pScore = 7700}
		else{pScore = 10}

	}
	else if(dCheck === 1){pScore = 3}
}


//Activate the Game
for (var i = 0; i < 3; i += 1) {
    var tr = document.createElement('tr');
    trs.push(tr);
    tds.push([]);
    for (var j = 0; j < 3; j += 1) {
        var td = document.createElement('td');

		//Adds border elements to the generated game table
		if (i == 0) { td.classList.add("no_top_border");}
		else if (i == 2) { td.classList.add("no_bottom_border");}
		if (j == 0) { td.classList.add("no_left_border");}
		else if (j == 2) { td.classList.add("no_right_border");}

        td.addEventListener('click', Game);
        tds[i].push(td);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

var main = document.createElement('main');
main.classList.add('board_container');
var board = document.createElement('div');
board.classList.add('board');
table.classList.add('game-grid');

board.appendChild(table);
main.appendChild(board);
body.appendChild(main);


function handleNameSubmit() {
	var lead_list = document.getElementById("leaderboard_list");
	var input = document.getElementById("username");

	if (!input){
		alert("Please input a name!")
	} else {

		handleLeaderboards(input.value);

		var req = new XMLHttpRequest()
		var reqName = "/user/add";
		req.open('POST', reqName)

		var person = {
			name: input.value,
			score: pScore
		}

		var reqBody = JSON.stringify(person)
		console.log(" == reqBody:", reqBody)
		req.setRequestHeader('Content-Type', 'application/json')
		req.send(reqBody)

		input.value = "";
		hideModal();
		location.reload()
	}
}

function handleLeaderboards(name) {
	var separator = ": ";
	var parent = document.getElementById("leaderboard_list")
	var lead_list = parent.getElementsByTagName("li")

	var unsorted_data = parseLeaderboards(name)
	var sorted_data = sortLeaderboards(unsorted_data.name_arr, unsorted_data.score_arr)

	var name_arr = sorted_data.name_arr
	var score_arr = sorted_data.score_arr

	//delete our leaderboards and reconstruct it
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }

	for (i = 0; i < name_arr.length; i++) {
		var new_ref = document.createElement("li")
		var new_str = name_arr[i] + separator + score_arr[i].toString()
		var content = document.createTextNode(new_str)

		new_ref.appendChild(content)
		parent.appendChild(new_ref)
	}

}

function parseLeaderboards(name) {
	var separator = ": ";
	var parent = document.getElementById("leaderboard_list")
	var lead_list = parent.getElementsByTagName("li")

	var name_arr = []
	var score_arr = []
	var dup = false;

	//turn our leaderboards into two arrays for sorting
	//check for duplicate name, increment score if found
	for (entry of lead_list) {
		let str = entry.textContent
		var nm = str.split(separator)[0]
		var num = parseInt(str.split(separator)[1])

		name_arr.push(nm)
		if (nm == name) {
			dup = true;
			num += pScore
		}
		score_arr.push(num)
	}

	//push new entry to end of array if no duplicates
	if (!dup) {
		name_arr.push(name)
		score_arr.push(pScore)
	}

	var out = {
		name_arr,
		score_arr
	}
	return out	
}

function sortLeaderboards(name_arr, score_arr) {
	var sorted = false
	while(!sorted) {
		sorted = true;
		for (i = 0; i < name_arr.length; i++) {
			if (i-1 >= 0) {
				if (score_arr[i-1] < score_arr[i]) {
					sorted = false;
					let sc_temp = score_arr[i-1]
					score_arr[i-1] = score_arr[i]
					score_arr[i] = sc_temp

					let nm_temp = name_arr[i-1]
					name_arr[i-1] = name_arr[i]
					name_arr[i] = nm_temp
				}
			}
		}
	}

	var out = {
		name_arr,
		score_arr
	}
	return out
}

function showModal() {
	var modal_backdrop = document.getElementById("modal_backdrop");
	var win_modal = document.getElementById("you_won_modal");

	modal_backdrop.classList.remove("hidden");
	win_modal.classList.remove("hidden");
}

function hideModal() {
	var modal_backdrop = document.getElementById("modal_backdrop");
	var win_modal = document.getElementById("you_won_modal");

	modal_backdrop.classList.add("hidden");
	win_modal.classList.add("hidden");
}

window.addEventListener("DOMContentLoaded", function() {

	//temporary win condition by clicking any space on the board
	// var temp_win_button = document.getElementsByClassName("board")[0];
	// if (temp_win_button) {
	// 	temp_win_button.addEventListener("click", showModal);
	// }

	//handles username input in the win modal
	var name_button = document.getElementById("name_button");
	if (name_button) {
		name_button.addEventListener("click", handleNameSubmit);
	}

	
})