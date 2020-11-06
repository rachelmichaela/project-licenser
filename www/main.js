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

function weight(license) {
	licenses.set(license, licenses.get(license)++);
}

var stages = [
	["Are you licensing a software project?", 2, 1],
	["Project licenser does not support creative projects at this time.", null, null],
	["Should users be able to modify your source code?", 4, 3],
	["We recommend copyright with no free software license for your project.", null, null],
	["Should users be required to distribute their modifications?", 5, 6],
	["We recommend the GNU General Public License, version 3.0 or later for your project.", null, null],
	["We recommend the BSD 2-Clause License for your project.", null, null]
];

var step = 0;

function response(boolean) {
	if (boolean == true) {
		step = stages[step][1];
	} else {
		step = stages[step][2];
	}
	progress();
}

function progress() {
	if (step == 1) {
		setQuestion(stages[1][0]);
		end();
	}
	if (step >= 2) {
		if (stages[step][1] == null) {
			setQuestion(stages[step][0])
			end();
		} else {
			setQuestion(stages[step][0]);
		}
	}
}

function setQuestion(questionText) {
	document.getElementById("question").textContent = questionText;
}