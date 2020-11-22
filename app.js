const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];
function renderSite() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    } fs.writeFileSync(outputPath, render(team), "UTF8")
}

function switchStatement() {
    inquirer.prompt([
        {
            type: "list",
            message: "Employee Position",
            choices: ["Manager", "Engineer", "Intern", "Done"],
            name: "switch"
        },
    ])
        .then(function (answer) {
            switch (answer.switch) {
                case "Manager":
                    askManager();
                    break;
                case "Engineer":
                    askEngineer();
                    break;
                case "Intern":
                    askIntern();
                    break;
                case "Done":
                    renderSite();
                    break;
            }
        });
}
// Write code to use inquirer to gather information about the development team members,

const managerPrompts = [
    {
        type: "input",
        name: "managerName",
        message: "Enter your name.",
    },
    {
        type: "input",
        name: "managerID",
        message: "Enter your ID number.",
    },
    {
        type: "input",
        name: "managerOffice",
        message: "Enter your office number.",
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Enter your email address.",
    }
];
const engineerPrompts = [
    {
        type: "input",
        name: "engineerName",
        message: "Enter your name.",
    },
    {
        type: "input",
        name: "engineerID",
        message: "Enter your ID number.",
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "Enter your gitHub link.",
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "Enter your email address.",
    }
];
const internPrompts = [
    {
        type: "input",
        name: "internName",
        message: "Enter your name.",
    },
    {
        type: "input",
        name: "internID",
        message: "Enter your ID number.",
    },
    {
        type: "input",
        name: "internSchool",
        message: "Enter your school.",
    },
    {
        type: "input",
        name: "internEmail",
        message: "Enter your email address.",
    }
];

function askManager() {
    inquirer
        .prompt(managerPrompts)
        .then(function ({ managerName, managerID, managerEmail, managerOffice }) {
            const manager = new Manager(
                managerName,
                managerID,
                managerEmail,
                managerOffice
            );
            console.log(manager);
            team.push(manager);
            switchStatement();
        });
}

function askEngineer() {
    inquirer
        .prompt(engineerPrompts)
        .then(function ({ engineerName, engineerID, engineerEmail, engineerGithub }) {
            const engineer = new Engineer(
                engineerName,
                engineerID,
                engineerEmail,
                engineerGithub
            );
            console.log(engineer);
            team.push(engineer);
            switchStatement();
        });
}
function askIntern() {
    inquirer
        .prompt(internPrompts)
        .then(function ({ internName, internID, internEmail, internSchool }) {
            const intern = new Intern(
                internName,
                internID,
                internEmail,
                internSchool
            );
            console.log(intern);
            team.push(intern);
            switchStatement();
        });
}

switchStatement();


// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
