const program = require("commander");
const { prompt } = require("inquirer");
const { getBooks, getOptionsList, saveOption } = require("./commands");

program.version("0.0.1").description("A Command Line Reading List Generator");

program
  .command("search <subject>")
  .alias("s")
  .description("search books by subject, then run command to view options")
  .action(subject => getBooks(subject));

program
  .command("list")
  .alias("l")
  .description("See what is in your reading list")
  .action(() => {
    const list = getOptionsList();
    prompt([
        {
          type: 'list',
          name: 'selected',
          message: 'Select Book to Save',
          choices: Object.keys(list)
        }
      ]).then(({selected}) => {
          const book = list[selected]
          console.log(JSON.stringify(book, null, 2))
      })
  });

program.parse(process.argv);
