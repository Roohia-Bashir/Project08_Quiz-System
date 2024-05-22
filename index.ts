#!/usr/bin/env node
// QUIZ PROJECT 7
// The app will show the students multiple choice questions and prompt the user to reply. In the end, it will show the students the result of the quiz.

import readline from "readline";
import chalk from "chalk";
import figlet from "figlet";

// Define the interface for a question
interface Question {
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

// Define the interface for a quiz
interface Quiz {
    questions: Question[];
}

// Define a function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Define a function to run the quiz
function runQuiz(quiz: Quiz, quizNumber: number): void {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question(
        chalk.green(figlet.textSync(`Quiz System`, { horizontalLayout: "full" })) +
            chalk.yellow("\nPress Enter to start the quiz..."),
        () => {
            let score = 0;

            // Shuffle questions to randomize order
            const shuffledQuestions = shuffleArray(quiz.questions);

            askQuestion(0);

            function askQuestion(index: number): void {
                if (index < shuffledQuestions.length) {
                    const question = shuffledQuestions[index];

                    console.log(chalk.cyan(`Question ${index + 1}: ${question.question}`));
                    for (let j = 0; j < question.options.length; j++) {
                        console.log(chalk.magenta(`${j + 1}. ${question.options[j]}`));
                    }

                    rl.question("Enter your answer (1, 2, 3, etc.): ", (userAnswer) => {
                        const userAnswerIndex = parseInt(userAnswer) - 1;

                        if (userAnswerIndex === question.correctAnswerIndex) {
                            console.log(chalk.green("Correct!"));
                            score++;
                        } else {
                            console.log(
                                chalk.red("Incorrect! The correct answer is: ") +
                                    chalk.yellow(question.options[question.correctAnswerIndex])
                            );
                        }
                        askQuestion(index + 1);
                    });
                } else {
                    const percentageScore = (score / shuffledQuestions.length) * 100;
                    console.log(
                        `Quiz ${quizNumber} Complete! Your Score: ${score}/${shuffledQuestions.length} (${percentageScore}%)`
                    );
                    if (score === shuffledQuestions.length) {
                        console.log(chalk.green("Congratulations! You've got 100% marks!"));
                    }
                    rl.close();
                }
            }
        }
    );
}

// Example quiz
const myQuiz: Quiz = {
    questions: [
        {
            question: "What is TypeScript?",
            options: [
                "A superset of JavaScript",
                "A new programming language",
                "A database management system",
            ],
            correctAnswerIndex: 0,
        },
        {
            question: "Which tool is used to compile TypeScript to JavaScript?",
            options: ["Node.js", "Babel", "TypeScript Compiler (tsc)"],
            correctAnswerIndex: 2, // Change this to 3
        },
        {
            question: "What is the purpose of type annotations in TypeScript?",
            options: [
                "To enhance code readability",
                "To define the types of variables",
                "To optimize code performance",
            ],
            correctAnswerIndex: 1,
        },
        {
            question: "What is the TypeScript file extension?",
            options: [".js", ".ts", ".txt"],
            correctAnswerIndex: 1,
        },
        {
            question: "Which TypeScript feature allows you to define complex types?",
            options: ["Loops", "Functions", "Interfaces"],
            correctAnswerIndex: 2,
        },
    ],
};

// Run the quiz
runQuiz(myQuiz, 1);
