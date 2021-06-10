//handles the closing of the modal and retrives name from the input, then
//sends it to updateLeaderboards() function
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
		}

		var reqBody = JSON.stringify(person)
		console.log(" == reqBody:", reqBody)
		req.setRequestHeader('Content-Type', 'application/json')
		req.send(reqBody)

		input.value = "";
		hideModal();
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
			num++
		}
		score_arr.push(num)
	}

	//push new entry to end of array if no duplicates
	if (!dup) {
		name_arr.push(name)
		score_arr.push(1)
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