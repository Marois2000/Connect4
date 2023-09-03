class Board {
    constructor(board, clone) {
        if(clone) {
            this.board = board
        } else {
            this.board = this.initializeBoard()
        }
        this.win = false
        this.winner
    }

    initializeBoard() {
        let board = []
        for(let x = 0; x < 7; x++) {
            let column = []
            for(let y = 0; y < 6; y++) {
                column [y] = new Space({
                    position: {
                        x: x,
                        y: y
                    },
                    color: "white"
                })
            }
            board.push(column)
        }

        return board
    }

    addPiece(rowIndex, color, draw) {
        const column = this.board[rowIndex]
        for(let y = 5; y >= 0; y--) {
            const space = column[y]
            if(space.color == "white") {
                space.updateColor(color, draw)
                break
            }
        }

        this.checkWin()
    }

    fullBoard() {
        let count = 0
        this.board.forEach(column => {
            column.forEach(space => {
                if(space.color != "white") {
                    count++
                }
            });
        });

        if(count == 42) {
            return true
        }
        return false
    }

    validMove(columnNum) {
        const column = this.board[columnNum]
        if(column[0].color != "white") {
            return false
        } 
        return true
    }

    openColumns() {
        let cols = []
        for(let i = 0; i < 7; i++) {
            if(this.validMove(i)) {
                cols.push(i)
            }
        }
        return cols
    }

    copyBoard() {
        let newBoard = [];
        for (let x = 0; x < 7; x++) {
            const column = [];
            for (let y = 0; y < 6; y++) {
                let space = new Space({
                    position: this.board[x][y].position,
                    color: this.board[x][y].color
                });
                column.push(space); // Push the node into the column array
            }
            newBoard.push(column);
        }
        let clonedBoard = new Board(newBoard, true);
        return clonedBoard;
    }

    checkWin() {
        for(let x = 0; x < 7; x++) {
            const column = this.board[x]
            let color = column[0].color
            let count = 0
            for(let y = 1; y < 6; y++) {
                let space = column[y]
                if(space.color == color && space.color != "white") {
                    count++
                } else {
                    count = 0
                }
                color = space.color
                if(count == 3) {
                    this.win = true
                    this.winner = color
                }
            }
        }

        for(let y = 0; y < 6; y++) {
            let color = this.board[0][y].color
            let count = 0
            for(let x = 1; x < 7; x++) {
                let space = this.board[x][y]
                if(space.color == color && space.color != "white") {
                    count++
                } else {
                    count = 0
                }
                color = space.color
                if(count == 3) {
                    this.win = true
                    this.winner = color
                }
            }
        }

        for(let x = 0; x < 4; x++) {
            for(let y = 0; y < 3; y++) {
                let color = this.board[x][y].color
                let count = 0
                for(let diagonalStep = 1; diagonalStep < 4; diagonalStep++) {
                    let space = this.board[x + diagonalStep][y + diagonalStep]
                    if(space.color == color && space.color != "white") {
                        count++
                    } else {
                        count = 0
                    }
                    color = space.color
                    if(count == 3) {
                        this.win = true
                        this.winner = color
                    }
                }
            }
        }

        for(let x = 0; x < 4; x++) {
            for(let y = 3; y < 6; y++) {
                let color = this.board[x][y].color
                let count = 0
                for(let diagonalStep = 1; diagonalStep < 4; diagonalStep++) {
                    let space = this.board[x + diagonalStep][y - diagonalStep]
                    if(space.color == color && space.color != "white") {
                        count++
                    } else {
                        count = 0
                    }
                    color = space.color
                    if(count == 3) {
                        this.win = true
                        this.winner = color
                    }
                }
            }
        }
    }
}