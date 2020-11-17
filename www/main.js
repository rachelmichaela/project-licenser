function pageLoad() {
	hide("body");
	hide("noscript");
	show("start");
	show("body");
}

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

var softwareLicenses = [
	["Apache License, version 2.0", 0], // 0
	["BSD 2-Clause License", 0], // 1
	["BSD 3-Clause License", 0], // 2
	["BSD 4-Clause License", 0], // 3
	["Common Development and Distribution License", 0], // 4
	["Copyright, no free software license", 0], // 5
	["GNU Affero General Public License, version 3.0", 0], // 6
	["GNU All-Permissive License", 0], // 7
	["GNU General Public License, version 3.0", 0], // 8
	["GNU Lesser General Public License, version 3.0", 0], // 9
	["ISC License", 0], // 10
	["Mozilla Public License, version 2.0", 0], // 11
	["Public domain, no free software license", 0] // 12
];

var creativeLicenses = [
	["Copyright, no license", 0],
	["Creative Commons Attribution 4.0", 0],
	["Creative Commons Attribution No-Derivatives 4.0", 0],
	["Creative Commons Attribution Non-Commercial 4.0", 0],
	["Creative Commons Attribution Non-Commercial No-Derivatives 4.0", 0],
	["Creative Commons Attribution Non-Commercial Share-Alike 4.0", 0],
	["Creative Commons Attribution Share-Alike 4.0", 0],
	["FreeBSD Documentation License", 0],
	["GNU Free Documentation License", 0],
	["GNU Verbatim Copyright License", 0],
	["Public Domain", 0],
	["SIL Open Font License", 0]
];

function weight(licenses) {
	if (software == 1) {
		licenses.forEach(function(currentValue) {
			softwareLicenses[currentValue][1]++;
		});
	} else {
		licenses.forEach(function(currentValue) {
			creativeLicenses[currentValue][1]++;
		});
	}
}

var stages = [
	["Are you contributing to an existing project?", -1, 1, null, null], // existing project license, next question
	["Are you licensing a software project?", 2, 0, null, null], // software branch, creative branch
	["Should users be able to modify your source code?", 3, 0, [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12], [5]], // free software branch, copyright
	["Should users be required to distribute their modifications?", 4, 8, [4, 6, 8, 9, 11], [0, 1, 2, 3, 7, 10, 12]], // copyleft branch, permissive branch
	["Should users be able to run the project on web servers without sharing source code?", 5, 0, [4, 8, 9, 11], [6]], // next question, AGPL
	["Should users that link to your project be required to use the same license as your project?", 0, 6, [8], [4, 9, 11]], // GPL, next question
	["Is your project a software library?", 0, 7, [9], [4, 11]], // LGPL, next question
	["Does your project require license compatibility with the GNU GPL?", 0, 0, [11], [4]], // Moz, CDDL
	["Do you require explicit patent usage grants?", 0, 9, [0], [1, 2, 3, 7, 10, 12]], // Apache, next question
	["Should users be required to name your project in their advertising material?", 0, 10, [3], [1, 2, 7, 10, 12]], // BSD-4 Clause, next question
	["Do you want to relinquish all copyright rights?", 0, 11, [12], [1, 2, 7, 10]], // Public domain, next question
	["Do you need to be able to disallow certain users or use cases from your project?", 0, 12, [10], [1, 2, 7]], // ISC, next question
	["Should users be able to promote their project by referencing your own without written permission?", 0, 13, [1, 7], [2]], // next question, BSD 3-Clause
	["Would you prefer a license authored by the Free Software Foundation?", 0, 0, [7], [1]] // GNU APL, BSD 2-Clause
];

var step = 0;
var software = 0;

function response(boolean) {
	if (boolean == true && step == 1) {
		software = 1;
	}

	if (boolean == true) {
		if (stages[step][3] != null) {
			weight(stages[step][3]);
		}
		step = stages[step][1];
	} else {
		if (stages[step][4] != null) {
			weight(stages[step][4]);
		}
		step = stages[step][2];
	}

	if (step == 0 || step == -1) {
		progress(0);
	} else {
		progress(1);
	}
}

function progress(itsTimeToChooseMrFreeman) {
	if (itsTimeToChooseMrFreeman == 0) {
		setQuestion(calculateResult());
		end();
	} else {
		setQuestion(stages[step][0])
	}
}

function setQuestion(questionText) {
	document.getElementById("question").textContent = questionText;
}

function calculateResult() {
	var str = null;
	var result = [null, 0];
	var licensesArray = null;
	if (step != -1) {
		if (software == 1) {
			licensesArray = softwareLicenses;
		} else {
			licensesArray = creativeLicenses;
		}
		licensesArray.forEach(function(currentValue) {
			if (currentValue[1] > result[1]) {
				result[0] = currentValue[0];
				result[1] = currentValue[1];
			}
		});
		str = "We recommend " + result[0] + " for your project.";
	} else {
		str = "We recommend using the license already used by your project.";
	}
	return str;
}