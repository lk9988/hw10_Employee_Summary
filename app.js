const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

class Question {
	constructor(type, message, name) {
		this.type = type;
		this.message = message;
		this.name = name;
	}
}

const employeeQ = [
	new Question("input", "What is your new employee's name?", "name"),
	new Question(
		"input",
		"What is your" + "What is your new employee's id?",
		"id"
	),
	new Question("input", "What is your new employee's email?", "email"),
];

const employeeTypeQ = [
	{
		type: "list",
		message: "Which of team member would you like to add?",
		name: "addingNew",
		choices: [
			"Engineer",
			"Intern",
			"I don't want to add any more team memebers",
		],
	},
];

console.log("Let's build your team");
console.log("== Please add Manager Info ==");

// ASK user for manager info
function askManagerInfo() {
	return inquirer
		.prompt(
			(managerQ = employeeQ.concat([
				{
					type: "input",
					message: "What is your Manager's Office Number?",
					name: "officeNumber",
				},
			]))
		)
		.then((managerData) => {
			const newManager = new Manager(
				managerData.name,
				managerData.id,
				managerData.email,
				managerData.officeNumber
			);

			employeeList.push(newManager);
			askNextEmployeeType();
		});
}
// ASK user for next employee type
function askNextEmployeeType() {
	return inquirer.prompt(employeeTypeQ).then((newChoiceData) => {
		// if user selected Engineer
		if (newChoiceData.addingNew === "Engineer") {
			console.log("=====================================================");

			console.log("==  Please add new " + `${newChoiceData.addingNew}`);
			askEngineerInfo();
		}
		// if user selected Intern
		else if (newChoiceData.addingNew === "Intern") {
			console.log("=====================================================");

			console.log("==  Please add new " + `${newChoiceData.addingNew}`);
			askInternInfo();
		}
		// Else, when user does not want to add more people
		else {
			renderHTML();
		}
	});
}

// ASK user for engineer info
function askEngineerInfo() {
	return inquirer
		.prompt(
			(engineerQ = employeeQ.concat([
				{
					type: "input",
					message: "What is your Engineers Github username?",
					name: "github",
				},
			]))
		)
		.then((engineerData) => {
			const newEngineer = new Engineer(
				engineerData.name,
				engineerData.id,
				engineerData.email,
				engineerData.github
			);
			//
			employeeList.push(newEngineer);
			askNextEmployeeType();
		});
}
// ASK user for intern info
function askInternInfo() {
	return inquirer
		.prompt(
			(internQ = employeeQ.concat([
				{
					type: "input",
					message: "What is your Intern's School?",
					name: "school",
				},
			]))
		)
		.then((internData) => {
			const newIntern = new Intern(
				internData.name,
				internData.id,
				internData.email,
				internData.school
			);
			//
			employeeList.push(newIntern);
			askNextEmployeeType();
		});
}
function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) => {
		if (err) throw err;
		console.log(
			"**** You have New Team for your Project! Check your Output Folder! ****"
		);
	});
}
function renderHTML() {
	const htmlContent = render(employeeList);
	//
	writeToFile(outputPath, htmlContent);
}
// starting
askManagerInfo();
