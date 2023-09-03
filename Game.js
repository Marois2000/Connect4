class Game {
    constructor() {
        this.board = new Board()
        this.turn = 0
    }

    roundHandle = (frame) => {
        window.requestAnimationFrame(this.roundHandle)
        if(this.turn % 2 == 0) {
            playerButtons.forEach(button => {
                button.style.pointerEvents = "all"
            });
        } else {
            playerButtons.forEach(button => {
                button.style.pointerEvents = "none"
            });
            this.cpuInput()
        }

        if(this.board.win) {
            this.turn = 0
            playerButtons.forEach(button => {
                button.style.pointerEvents = "none"
            });
        }
    }

    cpuInput() {
        let color = "red"
        if(game.turn % 2 == 0) {
            color = "blue"
        } else {
            color = "red"
        }
        let choice = Math.floor(Math.random() * 7)
        
        while(!this.board.validMove(choice)) {
            choice = Math.floor(Math.random() * 42)
        }

        let node = new Node(game.board.copyBoard(), 42, true)

        node.generateChildren()
        let bestMove = this.board.openColumns()[0]
        let bestScore = -Infinity

        node.children.forEach(child => {
            const score = this.minimax(child, 7, Infinity, -Infinity, true)

            if(score > bestScore) {
                bestScore = score
                bestMove = child.bestMove
            }
        });

        console.log(bestScore)
        this.board.addPiece(bestMove, color, true)
        this.turn++
    }

    minimax(node, depth, alpha, beta, maximizingPlayer) {
        if(node.terminalNode() || depth === 0) {
            return node.evaluate()
        }

        node.generateChildren()


        if(maximizingPlayer) {
            let bestScore = -Infinity

            for(let i = 0; i < node.children.length; i++) {
                const child = node.children[i] 
                const score = this.minimax(child, depth - 1, alpha, beta, false)
                bestScore = Math.max(bestScore, score)
                alpha = Math.max(alpha, bestScore)
                if(beta <= alpha) {
                    break
                }
            }
            return bestScore
        } else {
            let bestScore = Infinity
            for(let i = 0; i < node.children.length; i++) {
                const child = node.children[i] 
                const score = this.minimax(child, depth - 1, alpha, beta, true)
                bestScore = Math.min(bestScore, score)
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) {
                    break
                }
            }
            return bestScore
        }
    }
}

