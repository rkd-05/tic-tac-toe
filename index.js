// to fetch all the boxes from 1 to 9
const boxes = document.querySelectorAll(".box");
// to fetch "game-info" class
const gameInfo = document.querySelector(".game-info");
// to fetch "new game" wala button
const newGameBtn = document.querySelector(".btn");

// variables needed
let currentPlayer;
let gameGrid;
// if we insert same symbol at given positions then we can win so there are 8 possibilities of winning
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    // initiliasing 9 cells as empty
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bhi karna padega boxes ko , line 124 ke liye hai ye 4 lines
    boxes.forEach((box, index) => {
        // doing boxes empty
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    // iniyially hide newGame button
    newGameBtn.classList.remove("active");
    // current player ki value show hogi 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();
// agar X ki baari thi tho O ki barri kar do and vice versa
function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    // variable for jeeta kon
    let answer = "";
// forEach se hum har ek position ko check kar sakte hai
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X or O
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
            // and winner cells ka color green ho jayega
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    // if cell is empty then put current player in cell on clicking
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        // jeb filled cell mei hoge tho cursor pointer nahi banega 
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}
// click karne pe "cross" aayega ya "circle"
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});
// newGame wale button pe click karo tho sare cells ko empty kar do ot we can say that call "initGame" function
newGameBtn.addEventListener("click", initGame);