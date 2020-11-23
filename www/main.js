/**
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2020 Rachel Michaela Bradley
 *
 * This file is a part of Project Licenser.
 *
 * Project Licenser is free software: you can redistribute it and/or 
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the 
 * License, or (at your option) any later version.
 *
 * Project Licenser is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public 
 * License along with Project Licenser.  If not, see 
 * <https://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 */

/**
 * When the page is initially loaded, this function will hide all of the
 * body of the page. It will then hide the tag that displays when
 * JavaScript is not enabled and show the tag that explains how to start
 * using the picker, redisplaying the body tag at the end.
 */
function pageLoad() {
	hide("body");
	hide("noscript");
	show("start");
	show("body");
}

/**
 * Hides the element provided by the formal argument by setting the tag
 * display value to "none".
 *
 * @param {string} the element ID.
 */
function hide(elementID) {
	document.getElementById(elementID).style.display = "none";
}

/**
 * Shows the element provided by the formal argument by setting the tag
 * display value to "block".
 *
 * @param {string} the element ID.
 */
function show(elementID) {
	document.getElementById(elementID).style.display = "block";
}

/**
 * Starts the picking process by removing the explanatory start tag and
 * enabling the picker tags.
 */
function begin() {
	hide("start");
	show("picker");
}

/**
 * Ends the picking process by removing all picker buttons, except for
 * the restart button.
 */
function end() {
	hide("yes");
	hide("no");
}

/**
 * This function triggers when the restart button is clicked. It will
 * reload the page, restarting the script from the beginning.
 */
function restartbtn() {
	location.reload(true);
}

/**
 * The array of software licenses supported by the picker. Each item is
 * formatted by the license name followed by the current license weight.
 */
var softwareLicenses = [
	["Apache License, version 2.0", 0], // 0
	["BSD 2-Clause License", 0], // 1
	["BSD 3-Clause License", 0], // 2
	["BSD 4-Clause License", 0], // 3
	["Common Development and Distribution License", 0], // 4
	["Copyright, no license", 0], // 5
	["GNU Affero General Public License, version 3.0", 0], // 6
	["GNU All-Permissive License", 0], // 7
	["GNU General Public License, version 3.0", 0], // 8
	["GNU Lesser General Public License, version 3.0", 0], // 9
	["ISC License", 0], // 10
	["Mozilla Public License, version 2.0", 0], // 11
	["Public domain, no license", 0] // 12
];

/**
 * The array of creative licenses supported by the picker. Each item is
 * formatted by the license name followed by the current license weight.
 */
var creativeLicenses = [
	["CC0", 0], // 0
	["Copyright, no license", 0], // 1
	["Creative Commons Attribution 4.0", 0], // 2
	["Creative Commons Attribution No-Derivatives 4.0", 0], // 3
	["Creative Commons Attribution Non-Commercial 4.0", 0], // 4
	["Creative Commons Attribution Non-Commercial No-Derivatives 4.0", 0], // 5
	["Creative Commons Attribution Non-Commercial Share-Alike 4.0", 0], // 6
	["Creative Commons Attribution Share-Alike 4.0", 0], // 7
	["FreeBSD Documentation License", 0], // 8
	["GNU Free Documentation License", 0], // 9
	["GNU Verbatim Copyright License", 0], // 10
	["Public domain, no license", 0], // 11
	["SIL Open Font License", 0] // 12
];

/**
 * Weights the licenses based on the array provided by the formal
 * argument.
 * 
 * @param {array} the array of licenses.
 */
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

/**
 * The array of stages that the picker will proceed through based on
 * user input. Each item is formatted by the text that will be displayed
 * to the user, followed by two integers representing the yes and no
 * response steps respectively, followed by two arrays of license
 * indexes. 
 *
 * For each item in the array of license indexes, the equivalent item in
 * the arrays of licenses will be weighted by the weight(i) function. If
 * the array of license indexes is null, no weighting occurs.
 */
var stages = [
	["Are you contributing to an existing project?", -1, 1, null, null], // existing project license, next question
	["Are you licensing a software project?", 2, 14, null, null], // software branch, creative branch
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
	["Would you prefer a license authored by the Free Software Foundation?", 0, 0, [7], [1]], // GNU APL, BSD 2-Clause
	["Should users be allowed to modify your work?", 15, 0, [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1]], // free culture branch, copyright
	["Do you want to relinquish all copyright rights?", 16, 17, [0, 11], [2, 3, 4, 5, 6, 7, 8, 9, 10, 12]], // public domain options, licensed options
	["Do you want a formal license to declare your relinquishment?", 0, 0, [0], [11]], // CC0, public domain
	["Are you licensing written work?", 18, 20, null, null], // documentation, testimony
	["Are you licensing documentation?", 19, 20, [8, 9], [2, 3, 4, 5, 6, 7, 10, 12]], // documentation, testimony
	["Should users be required to distribute any modifications that they make?", 0, 0, [9], [8]], // GNU FDL, FreeBSD Doc license
	["Are you licensing testimony, opinion articles, or other documents that should be free to share but not change?", 0, 21, [10], [2, 3, 4, 5, 6, 7, 12]], // GNU Verbatim, font next question
	["Are you licensing a font?", 0, 22, [12], [2, 3, 4, 5, 6, 7]], // SIL, next question
	["Should users be allowed to profit from your project?", 23, 25, [2, 3, 7], [4, 5, 6]], // CC, CC NonCom
	["Should users be allowed to create derivative works based on your project?", 24, 0, [2, 7], [3]],
	["Should users be required to share derivative works under the same license?", 0, 0, [7], [2]],
	["Should users be allowed to create derivative works based on your project?", 26, 0, [4, 6], [5]],
	["Should users be required to share derivative works under the same license?", 0, 0, [6], [4]]
];

/**
 * The current step of the picker script in the stages array.
 */
var step = 0;

/**
 * A representation of whether or not the user is licensing a software
 * project. 
 *
 * Set to zero by default; set to one if the user is licensing a 
 * software project.
 */
var software = 0;

/**
 * This function triggers when either the yes or the no buttons are
 * triggered. It will then progress the script towards the next
 * relevant item of the array of picker stages by setting the current
 * step to the relevant item of the array of picker stages and
 * running the progress(i) function with the relevant argument.
 * 
 * If the current step is the first step into the software branch of
 * the array of picker stages, and the response is true, then the
 * global variable step will be incremented to one.
 *
 * Based on whether or not the yes or no buttons were pressed, it will
 * weight the appropriate arrays of licenses in the manner informed by
 * the current step in the array of picker stages.
 *
 * @param {boolean} which button the user clicked.
 */
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

/**
 * Progresses through the array of picker stages by setting the question
 * text displayed to the user to the relevant picker stage question
 * text.
 *
 * If instructed that progression in the array of picker stages should
 * halt, it will instead perform the recommended license calculation and
 * display the result to the user. It will also remove all input buttons
 * excluding the restart button.
 * 
 * @param {integer} if a license should be recommended.
 */
function progress(itsTimeToChooseMrFreeman) {
	if (itsTimeToChooseMrFreeman == 0) {
		setContent("question", calculateResult());
		end();
	} else {
		setContent("question", stages[step][0])
	}
}

/**
 * Sets the text content displayed to the user to the string provided
 * by the formal argument for the element ID provided by the formal
 * argument.
 * 
 * @param {string} The new element text content.
 */
function setContent(contentID, contentText) {
	document.getElementById(contentID).textContent = contentText;
}

/**
 * Calculates the appropriate license that should be displayed to the
 * user based on their provided input.
 * 
 * If the user is working on an existing project, it will automatically
 * return a recommendation of the project's existing license. Otherwise,
 * it will evaluate the arrays of licenses and determine which license
 * as the most weight. It will then return a string representing the
 * recommendation of the license with the most weight.
 *
 * @return {string} the recommended license text.
 */
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
		fetch("licenses.json").then(
		response => response.json()
		).then(function(response) {
			response.forEach(function(currentValue) {
				console.log(currentValue);
				console.log("currentValue.name: " + currentValue.name);
				console.log("Result[0]: " + result[0]);
				if (currentValue.name == result[0]) {
					setContent("detailsName", currentValue.name);
					setContent("detailsCategory", currentValue.category);
					setContent("detailsType", currentValue.type);
					setContent("detailsPatent", currentValue.patent);
					setContent("detailsPromotion", currentValue.promotion);
					setContent("detailsCompatible", currentValue.compatible);
					document.getElementById("detailsURL").href = currentValue.url; 
					show("details");
				}
			});
		});
		str = "We recommend \"" + result[0] + "\" for your project.";
	} else {
		str = "We recommend using the license already used by your project.";
	}
	return str;
}