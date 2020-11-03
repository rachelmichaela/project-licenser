function hide(elementID) {
	document.getElementById(elementID).style.display = "none";
}

function show(elementID) {
	document.getElementById(elementID).style.display = "block";
}

function begin() {
	hide("start");
	show("picker");
}

function end() {
	hide("yes");
	hide("no");
}

function restartbtn() {
	location.reload(true);
}

var licenses = new Map([
	["BSD 2-Clause License", 0],
	["GNU Affero General Public License, version 3.0", 0],
	["Copyright, no free software license", 0]
]);

var stages = new Map([
	["Are you licensing a software project?", null],
	["Should users be able to modify your source code?", null],
	["Should users be required to distribute their modifications?", null]
]);

function weight(license) {
	licenses.set(license, licenses.get(license)++);
}

function response(boolean) {
	if (boolean == true) {
		stages.set(document.getElementById("question").textContent, 1);
	} else {
		stages.set(document.getElementById("question").textContent, 0);
	}
	progress();
}

function progress() {
	if (stages.get("Are you licensing a software project?") != 1) {
		setQuestion("Project licenser does not support creative projects at this time.")
		end();
	} else {
		if(stages.get("Should users be able to modify your source code?") == null) {
			setQuestion("Should users be able to modify your source code?");
		} else if (stages.get("Should users be able to modify your source code?") == 1) {
			if(stages.get("Should users be required to distribute their modifcations?") == null) {
				setQuestion("Should users be required to distribute their modifcations?");
			} else if (stages.get("Should users be required to distribute their modifcations?") == 1) {
				setQuestion("We recommend the GNU General Public License, version 3.0 for your project.");
				end();
			} else {
				setQuestion("We recommend the BSD 2-Clause License for your project.");
				end();
			}
		} else {
			setQuestion("We recommend standard copyright with no free software license for your project.");
			end();
		}
	}
}

function setQuestion(questionText) {
	document.getElementById("question").textContent = questionText;
}