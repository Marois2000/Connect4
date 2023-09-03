const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

//buttons
const button1 = document.getElementById("1")
const button2 = document.getElementById("2")
const button3 = document.getElementById("3")
const button4 = document.getElementById("4")
const button5 = document.getElementById("5")
const button6 = document.getElementById("6")
const button7 = document.getElementById("7")
const playerButtons = [button1, button2, button3, button4, button5, button6, button7]

const game = new Game()

let index = 0

for(let i = 0; i < playerButtons.length; i++) {
    playerButtons[i].addEventListener("click", () => {
        let color = "red"
        if(game.turn % 2 == 0) {
            color = "blue"
        } else {
            color = "red"
        }

        if(game.board.validMove(i)) {
            game.board.addPiece(i, color, true)
            game.turn++;
        }
    })
}



canvas.width = 725
canvas.height = 625

for(let i = 0; i < 8; i ++) {
    c.fillRect(i * spacing.x, 0, 25, 625)
}

for(let i = 0; i < 7; i ++) {
    c.fillRect(0, i * spacing.y, 725, 25)
}


game.board.board.forEach(column => {
    column.forEach(space => {
        space.draw()
    });
});

game.roundHandle(0)

