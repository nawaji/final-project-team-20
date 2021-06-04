function handleNameSubmit() {
	var lead_list = document.getElementById("leaderboard_list")
	var new_name = document.createElement("li")
	var input = document.getElementById("username")
	
	new_name.textContent = input.value
	lead_list.appendChild(new_name)

	input.value = ""
	hideModal()
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
	var temp_win_button = document.getElementById("grid5")
	if (temp_win_button) {
		temp_win_button.addEventListener("click", showModal)
	}

	var name_button = document.getElementById("name_button")
	if (name_button) {
		name_button.addEventListener("click", handleNameSubmit)
	}

})

