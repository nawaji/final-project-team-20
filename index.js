//handles the closing of the modal and retrives name from the input, then
//sends it to updateLeaderboards() function
function handleNameSubmit() {
	var lead_list = document.getElementById("leaderboard_list");
	var input = document.getElementById("username");
	
//	if (input.value != "") {
//		handleLeaderboards(input.value);
//		input.value = "";
//		hideModal();
//	} else {
//		alert("Please input a name!")
//	}
	if (!input){
		alert("Please input a name!")
	} else {
		var req = new XMLHttpRequest()
		var reqName = //'urlpath'
		req.open('POST', reqName)

		var name = {
			name: name,
			score: score
		}
		var reqBody = JSON.stringify(name)
		console.log(" == reqBody:", reqBody)
		req.setRequestHeader('Content-Type', 'application/json')
		req.send(reqBody)


		hideModal();
	}
}

//checks for duplicate name, updates if needed, otherwise creates new entry if new name
function handleLeaderboards(data) {
	var separator = ": ";
	var parent = document.getElementById("leaderboard_list")
	var lead_list = parent.getElementsByTagName("li")

	var i = 0;
	var duplicate = false;

	//check each entry in the leaderboards for duplicate name
	for (item of lead_list) {
		let str = item.textContent
		var name = str.split(separator)[0];
		var score = str.split(separator)[1];
		//console.log("== Person & Score:", name, score);

		if (data == name) {
			item.parentNode.removeChild(item);
			duplicate = true;
			console.log("== Duplicate found!");
			score++;
			modifyLeaderboards(name, score, i);
			break;
		}

		i++;
	}

	//create new entry at the bottom of leaderboards
	if (!duplicate) {
		modifyLeaderboards(data, 1, -1);
	}
}

//handles inserting new element into the DOM, whether its at a certain index or end of list
function modifyLeaderboards(name, score, index) {
	var lead_list = document.getElementById("leaderboard_list");
	var lead_list_arr = lead_list.getElementsByTagName("li");
	var new_str = name + ": " + score;

	//create a new node to be inserted into the DOM
	var new_ref = document.createElement("li")
	var temp_content = document.createTextNode(new_str)
	new_ref.appendChild(temp_content)
	console.log("== Node:", new_ref)

	//if index < 0, append to end of list, otherwise insert before index
	//and remove the original DOM element
	if (index < 0) {
		lead_list.appendChild(new_ref);

	} else {

		lead_list.insertBefore(new_ref, lead_list_arr[index]);

	}
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
	var temp_win_button = document.getElementsByClassName("board")[0];
	if (temp_win_button) {
		temp_win_button.addEventListener("click", showModal);
	}

	//handles username input in the win modal
	var name_button = document.getElementById("name_button");
	if (name_button) {
		name_button.addEventListener("click", handleNameSubmit);
	}

})

