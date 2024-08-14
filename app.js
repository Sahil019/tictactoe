let boxes = document.querySelectorAll(".box"); // Declaring boxes only once
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;

const winningPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

const resetgame = () => { // Corrected function declaration
    turn0 = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
}

const disableBoxes = () => { // Corrected function name
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => { 
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Prevents overwriting the box content
            box.innerText = turn0 ? "X" : "O"; // Toggle between "X" and "O"
            turn0 = !turn0; // Switch turns
            console.log("box was clicked");
            const winner = checkWinner(); // Check for a winner after each click
            if (winner) {
                showWinner(winner);
            }
        }
    });
});

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = ""; // Clear all the boxes
    });
    turn0 = true; // Reset the turn to the initial state
    console.log("Game reset");
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes(); // Corrected function name
};

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1val = boxes[pattern[0]].innerText,
            pos2val = boxes[pattern[1]].innerText,
            pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log(`Winner: ${pos1val}`);
            return pos1val; // Return the winner (X or O)
        }
    }
    return null; // No winner
};
newGameBtn.addEventListener("click",resetgame);
resetBtn.addEventListener("click",resetgame);