const sqareCells = document.querySelectorAll('[data-cell]');
const displayTurn = document.querySelector('.show_turn');
const wrapper = document.querySelector('.winning_wrapper');
let squares = [['0'], ['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8']];
const reset = document.querySelector('.reset');
let crossTurn = true;
let circleTurn = false;
let gotWinner;

function won(str) {
    // ---------------confetti----------------
    var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };
    
    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }
    
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
    wrapper.classList.add('active');
    wrapper.querySelector('.verdict').innerHTML = `__Hurray__`
    wrapper.querySelector('.winner').innerHTML = `${str} WON`
    reset.addEventListener('click', () => {
        squares = [['0'], ['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8']];
        wrapper.classList.remove('active');
        sqareCells.forEach((cell) => {
            cell.innerHTML = '';
            displayTurn.innerHTML = '';
            gotWinner = false;
        });
    })
}

function draw(){
    wrapper.classList.add('active');
    wrapper.querySelector('.verdict').innerHTML = `_DRAW_`
    wrapper.querySelector('.winner').innerHTML = `&#x1F615`
    reset.addEventListener('click', () => {
        squares = [['0'], ['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8']];
        wrapper.classList.remove('active');
        sqareCells.forEach((cell) => {
            cell.innerHTML = '';
            displayTurn.innerHTML = '';
        });
    })
}

function checkWinner(str) {
    // console.log((squares[0][0]), (squares[1][0]), (squares[2][0]));
    // console.log((squares[3][0]), (squares[4][0]), (squares[5][0]));
    // console.log((squares[6][0]), (squares[7][0]), (squares[8][0]));
    for (let n = 0; n < 7; n += 3) {
        if ((squares[n][0] === squares[n + 1][0]) && (squares[n][0] === squares[n + 2][0])) {
            displayTurn.innerHTML = `${str} WINS!`;
            won(str);
            gotWinner = true;
        }
    }
    for (let n = 0; n < 3; n++) {
        if ((squares[n][0] === squares[n + 3][0]) && (squares[n][0] === squares[n + (2 * 3)][0])) {
            displayTurn.innerHTML = `${str} WINS!`;
            won(str);
            gotWinner = true;
        }
    }
    if ((squares[0][0] === squares[4][0]) && (squares[0][0] === squares[8][0])) {
        displayTurn.innerHTML = `${str} WINS!`;
        won(str);
        gotWinner = true;
    }
    if ((squares[2][0] === squares[4][0]) && (squares[2][0] === squares[6][0])) {
        displayTurn.innerHTML = `${str} WINS!`;
        won(str);
        gotWinner = true;
    }

}

function cellClicked(e) {
    displayTurn.innerHTML = '';
    if ((squares[this.dataset.cell] != 'x') && (squares[this.dataset.cell] != 'o')) {
        if (crossTurn) {
            displayTurn.innerHTML = '◯ Circle';
            squares[this.dataset.cell].pop();
            squares[this.dataset.cell].push('x');
            this.innerHTML = '✖';
            checkWinner('✖');
            crossTurn = false;
            circleTurn = true;
        } else {
            displayTurn.innerHTML = '✖ Cross'
            squares[this.dataset.cell].pop();
            squares[this.dataset.cell].push('o');
            this.innerHTML = '◯';
            checkWinner('◯');
            crossTurn = true;
            circleTurn = false;
        }
    }
    if (checkAllButtonsClicked() && !gotWinner) {
        console.log("draw------------")
        draw();
        gotWinner = false;
    }
}

function checkAllButtonsClicked() {
    const sol = squares.every((element) => {
        return (element[0] === 'o' || element[0] === 'x');
    })
    return sol;
}

sqareCells.forEach((cells) => {
    cells.addEventListener('click', cellClicked)
});


