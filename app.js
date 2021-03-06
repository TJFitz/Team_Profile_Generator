const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employees = [];
let newEmployee;
const questions = [
  {
    type: "list",
    name: "employeeChoice",
    message: "Which type of employee would you like to add?",
    choices: [
      "Manager",
      "Engineer",
      "Intern",
      new inquirer.Separator(),
      "I'm finished entering employees",
    ],
  },
  {
    type: "input",
    name: "employeeName",
    message: "Please enter the name of this employee",
    when: (answers) =>
      answers.employeeChoice !== "I'm finished entering employees",
  },
  {
    type: "input",
    name: "employeeId",
    message: "Please enter the ID of this employee",
    when: (answers) =>
      answers.employeeChoice !== "I'm finished entering employees",
  },
  {
    type: "input",
    name: "employeeEmail",
    message: "Please enter the email of this employee",
    when: (answers) =>
      answers.employeeChoice !== "I'm finished entering employees",
  },
  {
    type: "input",
    name: "employeeSchool",
    message: "Please enter the school of this employee",
    when: (answers) => answers.employeeChoice === "Intern",
  },
  {
    type: "input",
    name: "employeeGithub",
    message: "Please enter the Github username of this employee",
    when: (answers) => answers.employeeChoice === "Engineer",
  },
  {
    type: "input",
    name: "employeeOffice",
    message: "Please enter the office number of this employee",
    when: (answers) => answers.employeeChoice === "Manager",
  },
];
function getEmployee() {
  if (employees.length === 0) {
    console.log("\n", "Welcome to the Team Profile Generator CLI", "\n");
  }
  inquirer.prompt(questions).then((answers) => {
    console.log("\n");
    if (answers.employeeChoice !== "I'm finished entering employees") {
      switch (answers.employeeChoice) {
        case "Manager":
          newEmployee = new Manager(
            answers.employeeName,
            answers.employeeId,
            answers.employeeEmail,
            answers.employeeOffice
          );
          employees.push(newEmployee);
          break;
        case "Engineer":
          newEmployee = new Engineer(
            answers.employeeName,
            answers.employeeId,
            answers.employeeEmail,
            answers.employeeGithub
          );
          employees.push(newEmployee);
          break;
        case "Intern":
          newEmployee = new Intern(
            answers.employeeName,
            answers.employeeId,
            answers.employeeEmail,
            answers.employeeSchool
          );
          employees.push(newEmployee);
          break;
        default:
          console.log("done");
      }
      getEmployee();
    } else {
      fs.writeFile(outputPath, render(employees), (err) => {
        if (err) {
          return console.log(err);
        }
      });
      console.log("\n", "Thank you for using my application!");
    }
  });
}
getEmployee();

// Write code to use inquirer to gather information about the development team members,
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
