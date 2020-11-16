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

var softwareLicenses = new Map([
	["Apache License, version 2.0", 0],
	["BSD 2-Clause License", 0],
	["BSD 3-Clause License", 0],
	["BSD 4-Clause License", 0],
	["Common Development and Distribution License", 0],
	["Copyright, no free software license", 0],
	["GNU Affero General Public License, version 3.0", 0],
	["GNU All-Permissive License", 0],
	["GNU General Public License, version 3.0", 0],
	["GNU Lesser General Public License, version 3.0", 0],
	["ISC License", 0],
	["Mozilla Public License, version 2.0", 0],
	["Public domain, no free software license", 0]
]);

var creativeLicenses = new Map([
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
]);

function weight(license) {
	if (software == 1) {
		softwareLicenses.set(license, softwareLicenses.get(license)++);
	} else {
		creativeLicenses.set(license, creativeLicenses.get(license)++);
	}
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
var software = 0;
var existingProject = 0;

function response(boolean) {
	if (boolean == true) {
		if (step == 0) {
			software = 1;
		}
		step = stages[step][1];
	} else {
		step = stages[step][2];
	}
	progress();
}

function progress() {
	if (step <= -1) {
		setQuestion(calculateResult());
	} else {
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

function calculateResult() {
	var str = null;
	var result = [null, 0];
	var licenseMap = null;
	if (existingProject = 0) {
		if (software == 1) {
			licenseMap == softwareLicenses;
		} else {
			licenseMap == creativeLicenses;
		}
		for (const [license, weight] of licenseMap.entries()) {
			if (weight > result[1]) {
				result[0] = license;
				result[1] = weight;
			}
		}
		str = "We recommend " + result[0] + " for your project.";
	} else {
		str = "We recommend using the license already used by your project.";
	}
	return str;
}