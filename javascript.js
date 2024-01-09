document.addEventListener("DOMContentLoaded", function () {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newGameBtn = document.querySelector("#new-btn");
    let startGameBtn = document.querySelector("#start-game-btn");
    let inputContainer = document.querySelector(".input-container");
    let gameContainer = document.querySelector(".game-container");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");
    let winnerDisplay = document.querySelector("#winner");

    let turn = true;
    let player1Name = "";
    let player2Name = "";

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    const resetGame = () => {
        turn = true;
        enableBoxes();
        msgContainer.classList.add("hide");
        winnerDisplay.textContent = '';
    };

    const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
            box.classList.remove("x", "o");
        }
    };

    const disableBoxes = () => {
        for (let box of boxes) {
            box.disabled = true;
        }
    };

    const setPlayerNames = () => {
        const player1Input = document.getElementById('player1');
        const player2Input = document.getElementById('player2');

        player1Name = player1Input.value;
        player2Name = player2Input.value;

        if (player1Name && player2Name) {
            inputContainer.style.display = "none";
            gameContainer.style.display = "flex";
        } else {
            alert("Please enter both player names to start the game.");
        }
    };

    const showWinner = (winner) => {
        let winnerName = winner === 'X' ? player1Name : player2Name;
        msg.innerText = `Congratulations! Winner is ${winnerName}`;
        winnerDisplay.textContent = winnerName;
        msgContainer.classList.remove("hide");
        disableBoxes();
        playAudio('audioWin');
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            let [pos1, pos2, pos3] = pattern;
            let pos1val = boxes[pos1].innerText;
            let pos2val = boxes[pos2].innerText;
            let pos3val = boxes[pos3].innerText;

            if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
                if (pos1val === pos2val && pos2val === pos3val) {
                    showWinner(pos1val);
                    return;
                }
            }
        }
    };

    const checkDraw = () => {
        let count = 0;
        for (let box of boxes) {
            if (box.innerText !== "") {
                count++;
            }
        }
        if (count === 9) {
            msg.innerText = "It's a Draw!";
            msgContainer.classList.remove("hide");
            disableBoxes();
            playAudio('audioDraw');
        }
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            setPlayerNames();
            if (turn) {
                box.innerText = "X";
                box.classList.add("x");
                turn = false;
            } else {
                box.innerText = "O";
                box.classList.add("o");
                turn = true;
            }
            box.disabled = true;
            checkWinner();
            checkDraw();
        });
    });

    newGameBtn.addEventListener("click", () => {
        resetGame();
        inputContainer.style.display = "flex";
        gameContainer.style.display = "none";
    });

    resetBtn.addEventListener("click", resetGame);

    startGameBtn.addEventListener("click", setPlayerNames);

    const playAudio = (audioId) => {
        const audio = document.getElementById(audioId);
        audio.play();
    };
});