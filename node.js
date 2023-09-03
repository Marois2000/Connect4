class Node {
    constructor(board, depth, maximizingPlayer) {
        this.board = board; // The current game board state
        this.depth = depth; // The depth of this node in the search tree
        this.maximizingPlayer = maximizingPlayer; // true for Max player, false for Min player
        this.score = null; // The score associated with this node (computed by the evaluation function)
        this.bestMove = null; // The best move that leads to this node (for tracking the chosen move)
        this.children = [];
    }

    terminalNode() {
        if(this.board.win) {
            return true
        } else if(this.board.fullBoard()) {
            return true
        } else if(this.depth === 0) {
            return true
        } else {
            return false
        }
    }

    generateChildren() {
        const validMoves = this.board.openColumns()
        validMoves.forEach(move => {
            const newBoard = this.board.copyBoard()
            newBoard.addPiece(move, "red", false)
            const childNode = new Node(newBoard, this.depth - 1, !this.maximizingPlayer)
            childNode.bestMove = move
            this.children.push(childNode)
        });
    }

    evaluate() {

        let aiScore = 0
        let humanScore = 0

        const human4 = -1000
        const human3 = -500
        const human2 = -20

        const ai4 = 50
        const ai3 = 20
        const ai2 = 1

        //vertical score
        for(let x = 0; x < 7; x++) {
            const column = this.board.board[x]
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
                if(count == 2) {
                    if(color == "red") {
                        aiScore += ai3
                    } else if(color == "blue") {
                        humanScore -= human3
                    }
                } else if(count == 1) {
                    if(color == "red") {
                        aiScore += ai2
                    } else if(color == "blue") {
                        humanScore -= human2
                    }
                } else if(count == 3) {
                    if(color == "red") {
                        aiScore += ai4
                    } else if(color == "blue") {
                        humanScore -= human4
                    }
                }
            }
        }

        //vertical score
        for(let y = 0; y < 6; y++) {
            let color = this.board.board[0][y].color
            let count = 0
            for(let x = 1; x < 7; x++) {
                let space = this.board.board[x][y]
                if(space.color == color && space.color != "white") {
                    count++
                } else {
                    count = 0
                }
                color = space.color
                if(count == 2) {
                    if(color == "red") {
                        aiScore += ai3
                    } else if(color == "blue") {
                        humanScore -= human3
                    }
                } else if(count == 1) {
                    if(color == "red") {
                        aiScore += ai2
                    } else if(color == "blue") {
                        humanScore -= human2
                    }
                } else if(count == 3) {
                    if(color == "red") {
                        aiScore += ai4
                    } else if(color == "blue") {
                        humanScore -= human4
                    }
                }
            }
        }

        //diagonals score
        for(let x = 0; x < 4; x++) {
            for(let y = 0; y < 3; y++) {
                let color = this.board.board[x][y].color
                let count = 0
                for(let diagonalStep = 1; diagonalStep < 4; diagonalStep++) {
                    let space = this.board.board[x + diagonalStep][y + diagonalStep]
                    if(space.color == color && space.color != "white") {
                        count++
                    } else {
                        count = 0
                    }
                    color = space.color
                    if(count == 2) {
                        if(color == "red") {
                            aiScore += ai3
                        } else if(color == "blue") {
                            humanScore -= human3
                        }
                    } else if(count == 1) {
                        if(color == "red") {
                            aiScore += ai2
                        } else if(color == "blue") {
                            humanScore -= human2
                        }
                    } else if(count == 3) {
                        if(color == "red") {
                            aiScore += ai4
                        } else if(color == "blue") {
                            humanScore -= human4
                        }
                    }
                }
            }
        }

        for(let x = 0; x < 4; x++) {
            for(let y = 3; y < 6; y++) {
                let color = this.board.board[x][y].color
                let count = 0
                for(let diagonalStep = 1; diagonalStep < 4; diagonalStep++) {
                    let space = this.board.board[x + diagonalStep][y - diagonalStep]
                    if(space.color == color && space.color != "white") {
                        count++
                    } else {
                        count = 0
                    }
                    color = space.color
                    if(count == 2) {
                        if(color == "red") {
                            aiScore += ai3
                        } else if(color == "blue") {
                            humanScore -= human3
                        }
                    } else if(count == 1) {
                        if(color == "red") {
                            aiScore += ai2
                        } else if(color == "blue") {
                            humanScore -= human2
                        }
                    } else if(count == 3) {
                        if(color == "red") {
                            aiScore += ai4
                        } else if(color == "blue") {
                            humanScore -= human4
                        }
                    }
                }
            }
        }


        return humanScore += aiScore
    }
}