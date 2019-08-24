const readline = require('readline');



const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let todoList = [];
let completeItems = [];
console.log('welcome to ToDo CLI!');

homePage();

//answer page
function homePage() {
    //options
    terminal.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n', (answer) => {
        if (answer === 'v') {
            view();
        } else if (answer === 'q') {
            console.log('see you soon 😄');
            terminal.close();
        } else if (answer === 'n') {
            create();
        } else if (answer.indexOf('c') == 0) {
            complete(answer.substring(1));
        } else if (answer.indexOf('d') == 0) {
            remove(answer.substring(1));
        } else {
            homePage();
        };
    });

};


//viewItems


function view() {
    if (todoList.length === 0) {
        console.log('list is empty...');
    } else {
        for (let i = 0; i < todoList.length; i++) {

            let completed = completeItems.indexOf(i) >= 0 ? '[✓]' : '[ ]'
            console.log(`${i} ${completed} ${todoList[i][0]}`);
        }
    }
    homePage();
}

//add

function create() {
    terminal.question('what? \n', todoItem => {
        todoList.push([todoItem, ' ']);
        homePage();
    })

}
//complete

function complete(index) {
    if (todoList[index]) {
        completeItems.push(parseInt(index));
        homePage();
    }
}

// delete

function remove(index) {
    if (todoList[index]) {
        let deleted = todoList[index];
        todoList.splice(index, 1);
        console.log(`your ${deleted} is deleted`);
    }
    homePage();
}