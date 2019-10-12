const names =
[
        "mary", "patricia", "jennifer", "linda", "elizabeth", "barbara", "susan", "jessica", "sarah", "karen"
]

const random = () => {
    return names[Math.floor(Math.random()*names.length)];
}

random();
const wordArray = random().split("")
// console.log(wordArray);
let guess = 0
let newArray = [];



$(document).ready(() => {


    for (let i = 0; i < wordArray.length; i++) {
        $('.word').append($(`<span id=${i} class="char">&nbsp&nbsp</span>`))
        // console.log(newArray[i]);

    }



    function select() {
        $('button').on('click', event => {
            $(event.currentTarget).css("background-color", "grey");
            if (!wordArray.includes(event.currentTarget.id)) {
                guess ++;
                hangMan();
            }
            else {
                wordArray.forEach((char, index) => {
                    if (event.currentTarget.id === char) {
                        newArray.push(char);
                        $(`#${index}`).replaceWith(`<span id=${index} class="char">${char}</span>`)
                    }

                });
                answerCheck();
            }
        })

    }

    select();
    hangMan();



    function answerCheck() {
        if (newArray.length == wordArray.length) {
            alert("congrats! You win!")
        }
    }



    function hangMan() {
        $('.gallow').html($(`<img src="images/gallows${guess}.jpg">`))
        if (guess >= 7) {
            alert("Man is hanged!Try next time")
        }
    }




});