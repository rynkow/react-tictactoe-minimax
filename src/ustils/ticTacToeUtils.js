export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export function isDraw(squares){
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null)
            return false;
    }
    return true;
}

export function minimaxPlayer(board, player){
    let bestEvaluation = -Infinity;
    let bestMove = 0;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null){
            let boardClone = board.slice()
            boardClone[i] = player;


            let evaluation = minimax(boardClone, reversePlayer(player), false, 0);

            if (evaluation > bestEvaluation){
                bestEvaluation = evaluation;
                bestMove = i;
            }
        }
    }

    return bestMove;

    function evaluate(board){
        let winner = calculateWinner(board);
        if (winner === player)
            return 100;
        if (winner === null)
            return 0;
        return -100;
    }

    function minimax(minimaxBoard, player, isMaximizing, depth){
        let evaluation = evaluate(minimaxBoard);
        if (evaluation === 100) {
            return evaluation - depth;
        }
        if (evaluation === -100)
            return evaluation + depth;
        if (isDraw(minimaxBoard))
            return 0;

        let evaluations = []
        for (let i = 0; i < 9; i++) {
            if (minimaxBoard[i] === null) {
                let boardClone = minimaxBoard.slice()
                boardClone[i] = player;

                evaluations.push(minimax(boardClone, reversePlayer(player), !isMaximizing, depth + 1));
            }
        }

        return isMaximizing
            ? Math.max(...evaluations)
            : Math.min(...evaluations)
    }

    function reversePlayer(player){
        if (player === 'O')
            return 'X';
        return 'O';
    }
}




