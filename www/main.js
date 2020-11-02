function hide(elementID) {
	document.getElementById(elementID).style.display = "none";
}

function show(elementID) {
	document.getElementById(elementID).style.display = "block";
}

function begin() {
	hide("start");
	show("picker");
	picker();
}

var licenses = [
	["BSD 2-Clause License", 0],
	["GNU Affero General Public License, version 3.0", 0],
	["Copyright, no free software license", 0]
];

function picker() {
	document.getElementById("yes").addEventListener("click", function() {
		console.log("Software project selected.");
		setQuestion("Should your users have the right to modify your source code?");
		document.getElementById("yes").addEventListener("click", function() {
			console.log("Free software selected.");
			setQuestion("If a user wants to use your code in their own project, should they be required to share their project's source code with their users?");
			document.getElementById("yes").addEventListener("click", function() {
				console.log("Mandatory sharing selected.");
				setQuestion("We recommend the GNU General Public License, version 3.0 for your project.");
			});
			document.getElementById("no").addEventListener("click", function() {
				console.log("Voluntary sharing selected.");
				setQuestion("We recommend the BSD 2-Clause License for your project.");
			});
		});
		document.getElementById("no").addEventListener("click", function() {
			console.log("Proprietary software selected.");
			setQuestion("We recommend standard copyright with no free software license for your project.");
		});
	});
	document.getElementById("no").addEventListener("click", function() {
		console.log("Creative project selected.");
		setQuestion("Project licenser does not support creative projects at this time.");
	})
}

function setQuestion(questionText) {
	document.getElementById("question").textContent = questionText;
}