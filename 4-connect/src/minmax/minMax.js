function boardToKey(board) {
    return board.flat().join(",");
}

function evaluate(board, botSymbol) {
    const winner = checkWinner(board);
    if (winner === botSymbol) return 10;
    if (winner === -botSymbol) return -10;
    return 0;
}

function checkWinner(board) {
    const N = 4;

    // Check rows
    for (let r = 0; r < N; r++) {
        const sum = board[r].reduce((a, b) => a + b, 0);
        if (sum === 4) return 1;
        if (sum === -4) return -1;
    }

    // Check columns
    for (let c = 0; c < N; c++) {
        let sum = 0;
        for (let r = 0; r < N; r++) sum += board[r][c];
        if (sum === 4) return 1;
        if (sum === -4) return -1;
    }

    // Check diagonals
    let diag1 = 0, diag2 = 0;
    for (let i = 0; i < N; i++) {
        diag1 += board[i][i];
        diag2 += board[i][N - i - 1];
    }
    if (diag1 === 4 || diag2 === 4) return 1;
    if (diag1 === -4 || diag2 === -4) return -1;

    return 0; // no winner
}

function minimax(board, depth, isMaximizing, botSymbol, cache = new Map()) {
    const key = boardToKey(board) + isMaximizing;
    if (cache.has(key)) return cache.get(key);

    const score = evaluate(board, botSymbol);
    if (score !== 0 || depth === 0) return score;

    const N = 4;
    let best;

    if (isMaximizing) {
        best = -Infinity;
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (board[r][c] === 0) {
                    board[r][c] = botSymbol;
                    const val = minimax(board, depth - 1, false, botSymbol, cache);
                    board[r][c] = 0;
                    best = Math.max(best, val);
                }
            }
        }
    } else {
        best = Infinity;
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (board[r][c] === 0) {
                    board[r][c] = -botSymbol;
                    const val = minimax(board, depth - 1, true, botSymbol, cache);
                    board[r][c] = 0;
                    best = Math.min(best, val);
                }
            }
        }
    }

    cache.set(key, best);
    return best;
}

export function getBestMove(board, botSymbol = -1) {
    const N = 4;
    let bestScore = -Infinity;
    let move = null;
    const cache = new Map();

    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            if (board[r][c] === 0) {
                board[r][c] = botSymbol;
                const score = minimax(board, 6, false, botSymbol, cache);
                board[r][c] = 0;
                if (score > bestScore) {
                    bestScore = score;
                    move = { r, c };
                }
            }
        }
    }

    return move;
}
