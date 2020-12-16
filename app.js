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

const managerQ = [
	{
		type: "input",
		message: "What is your manager's name?",
		name: "name",
	},
	{
		type: "input",
		message: "What is your manager's ID?",
		name: "id",
	},
	{
		type: "input",
		message: "What is your manager's Email?",
		name: "email",
	},
	{
		type: "input",
		message: "What is your manager's Office Number?",
		name: "officeNumber",
	},
];
const engineerQ = [
	{
		type: "input",
		message: "What is your engineer's name?",
		name: "name",
	},
	{
		type: "input",
		message: "What is your engineer's ID?",
		name: "id",
	},
	{
		type: "input",
		message: "What is your engineer's Email?",
		name: "email",
	},
	{
		type: "input",
		message: "What is your engineers Github username?",
		name: "github",
	},
];
const internQ = [
	{
		type: "input",
		message: "What is your intern's name?",
		name: "name",
	},
	{
		type: "input",
		message: "What is your intern's ID?",
		name: "id",
	},
	{
		type: "input",
		message: "What is your intern's Email?",
		name: "email",
	},
	{
		type: "input",
		message: "What is your inter's School?",
		name: "school",
	},
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
console.log("please build your team");
// ASK user for manager info
function askManagerInfo() {
	return inquirer.prompt(managerQ).then((managerData) => {
		// console.log("Please build your new team!");
		const newManager = new Manager(
			managerData.name,
			managerData.id,
			managerData.email,
			managerData.officeNumber
		);
		employeeList.push(newManager);
		// console.log(employeeList);
		askNextEmployeeType();
	});
}
// ASK user for next employee type
function askNextEmployeeType() {
	return inquirer.prompt(employeeTypeQ).then((newChoiceData) => {
		// if user selected Engineer
		if (newChoiceData.addingNew === "Engineer") {
			console.log("=====================================================");
			console.log(newChoiceData);
			askEngineerInfo();
		}
		// if user selected Intern
		if (newChoiceData.addingNew === "Intern") {
			console.log("=====================================================");
			console.log(newChoiceData);
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
	return inquirer.prompt(engineerQ).then((engineerData) => {
		const newEngineer = new Engineer(
			engineerData.name,
			engineerData.id,
			engineerData.email,
			engineerData.github
		);
		employeeList.push(newEngineer);
		askNextEmployeeType();
	});
}
// ASK user for intern info
function askInternInfo() {
	return inquirer.prompt(internQ).then((internData) => {
		const newIntern = new Intern(
			internData.name,
			internData.id,
			internData.email,
			internData.school
		);
		employeeList.push(newIntern);
		askNextEmployeeType();
	});
}
function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) => {
		if (err) throw err;
		// console.log(
		// 	"You have New Team for your Project! Check your Output Folder! "
		// );
		// WHY this message  appear after choosing Engineer?
	});
}
function renderHTML() {
	const htmlContent = render(employeeList);
	writeToFile(outputPath, htmlContent);
}
// starting
askManagerInfo();
