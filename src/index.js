const program = require("commander");
const { prompt } = require("inquirer");
const { getBooks, getList,saveData, optionsListLocation, readingListLocation  } = require("./commands");

program.version("0.0.1").description("A Command Line Reading List Generator");

program
  .command("search <subject>")
  .alias("s")
  .description("search books by subject, then run command to view options")
  .action(subject => getBooks(subject));

program
  .command("list")
  .alias("l")
  .description("View reading list")
  .action(() => console.log(getList(readingListLocation)));

program
  .command("results")
  .alias("r")
  .description("See what options you have to save")
  .action(() => {
    const optionsList = getList(optionsListLocation);
    const readingList = getList(readingListLocation);
    console.log(optionsList)
    prompt([
        {
          type: 'list',
          name: 'selected',
          message: 'Select Book to Save',
          choices: Object.keys(optionsList)
        }
      ]).then(({selected}) => {
          const book = optionsList[selected];
          let saved = false;
          readingList.forEach((option, i) => {
            if(option.title === book.title){
              saved = true
            } 
          })
          if(saved){
            console.log(`Book already saved`)
          } else{
            readingList.push(book)
            saveData(readingList,readingListLocation)
            console.log(JSON.stringify(book, null, 2))
          };
      }).catch(err => console.error(err))
  });

program.parse(process.argv);
