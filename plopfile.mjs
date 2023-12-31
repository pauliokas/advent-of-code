import { fetchAssignment, fetchInput, fetchExample } from '@aoctools/fetch-task';
import prettier from 'prettier';
import fs from 'fs';

const aocSession = fs.readFileSync('./.aocsession', 'utf-8').trim();


export default (plop) => {
    plop.setHelper('pad', (num) => String(num).padStart(2, '0'));

    const task = {};
    plop.setActionType('downloadTask', async (answers, config, plop) => {
        Object.assign(task, {
            assignment: await fetchAssignment({ year: answers.year, day: answers.day, session: aocSession }),
            input: await fetchInput({ year: answers.year, day: answers.day, session: aocSession }),
            example: await fetchExample({ year: answers.year, day: answers.day, session: aocSession }),
        });
    });

    plop.setGenerator('day', {
        description: 'generator for a new day in the advent of code',
        prompts: [
            { type: 'input', name: 'year' },
            { type: 'input', name: 'day' },
        ],
        actions: [
            {
                type: 'downloadTask',
            },
            {
                type: 'add',
                path: 'solutions/{{ year }}/{{ pad day }}/README.md',
                force: true,
                transform: async (skipped) => {
                    return prettier.format(task.assignment, { parser: 'markdown',
                        "singleQuote": true,
                            "trailingComma": "all",
                            "printWidth": 120,
                            "proseWrap": "always",
                    });
                },
            },
            {
                type: 'add',
                path: 'solutions/{{ year }}/{{ pad day }}/src/input.txt',
                skipIfExists: true,
                transform: async (skipped, answers) => task.input,
            },
            {
                type: 'add',
                path: 'solutions/{{ year }}/{{ pad day }}/src/input-example.txt',
                skipIfExists: true,
                transform: async (skipped, answers) => task.example,
            },
            {
                type: 'addMany',
                destination: 'solutions/{{ year }}/{{ pad day }}',
                base: 'templates/day',
                templateFiles: 'templates/day/**/*.json',
                skipIfExists: true,
                transform: async (contents) => {
                    return prettier.format(contents, {
                        parser: 'json',
                        singleQuote: true,
                        trailingComma: "all",
                        printWidth: 120,
                        proseWrap: "always",
                    });
                },
            },
            {
                type: 'addMany',
                destination: 'solutions/{{year}}/{{ pad day }}',
                base: 'templates/day',
                templateFiles: 'templates/day/**/*.ts',
                skipIfExists: true,
                data: task,
                transform: async (contents) => {
                    return prettier.format(contents, {
                        parser: 'typescript',
                        singleQuote: true,
                        trailingComma: "all",
                        printWidth: 120,
                        proseWrap: "always",
                    });
                },
            },
        ],
    });
}
