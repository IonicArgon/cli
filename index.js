#!/usr/bin/env node

import axios from "axios";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import open from "open";

async function getRandomFact() {
    const endpoint = "https://uselessfacts.jsph.pl/random.json?language=en";
    const response = await axios.get(endpoint);
    return response.data.text;
}

async function getOptionInput() {
    const questions = [
        {
            type: "list",
            name: "option",
            message: "What can I do for you today?",
            choices: [
                "Get a random fact.",
                "Visit my GitHub.",
                "Visit my LinkedIn.",
                "Visit my Website."
            ]
        }
    ];

    const answers = await inquirer.prompt(questions);
    return answers.option;
}

async function getContinueInput() {
    const questions = [
        {
            type: "list",
            name: "continue",
            message: "Is there anything else I can do for you today?",
            choices: [
                "Yes.",
                "No."
            ]
        }
    ];

    const answers = await inquirer.prompt(questions);
    return answers.continue;
}

function sleep(ms = 1) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Main function
async function main() {
    // printing my name with cool colours and ascii art
    figlet.text("Marco.", {
        font: "alligator",
        horizontalLayout: "fitted",
        verticalLayout: "fitted"
    }, ( err, data ) => {
        if ( err ) {
            console.log( chalk.red( err ) );
            return;
        }
        console.log("Hey, my" + chalk.magenta(" name ") + "is");
        console.log( gradient.teen( data ) );
        console.log("It's nice meeting you!");
    });

    await sleep(500);

    // looping until user quits
    let looped = true;
    while (looped) {
        switch ( await getOptionInput() ) {
            case "Get a random fact.":
                console.log( chalk.green( "Here's your random fact: " ) );
                console.log( chalk.yellow( await getRandomFact() ) );
                break;
            case "Visit my GitHub.":
                open("https://github.com/IonicArgon");
                break;
            case "Visit my LinkedIn.":
                open("https://www.linkedin.com/in/marcotan04/");
                break;
            case "Visit my Website.":
                open("https://ionicargon.vercel.app/");
                break;
        };

        switch ( await getContinueInput() ) {
            case "Yes.":
                break;
            case "No.":
                looped = false;
                break;
        };
    }

    console.log( gradient.teen( "See you around!" ));
}

await main();
