const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER = 2;
const OPPONENT = 1;

function createBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

function getValidLocations(board) {
    const valid = [];
    for (let c = 0; c < COLS; c++) if (board[0][c] === EMPTY) valid.push(c);
    return valid;
}

function dropPiece(board, col, piece) {
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] === EMPTY) {
            board[r][col] = piece;
            return r;
        }
    }
    return -1;
}

function removePiece(board, row, col) {
    board[row][col] = EMPTY;
}

function winningMove(board, piece) {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            if (
                board[r][c] === piece &&
                board[r][c + 1] === piece &&
                board[r][c + 2] === piece &&
                board[r][c + 3] === piece
            ) return true;
        }
    }

    for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 3; r++) {
            if (
                board[r][c] === piece &&
                board[r + 1][c] === piece &&
                board[r + 2][c] === piece &&
                board[r + 3][c] === piece
            ) return true;
        }
    }

    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            if (
                board[r][c] === piece &&
                board[r + 1][c + 1] === piece &&
                board[r + 2][c + 2] === piece &&
                board[r + 3][c + 3] === piece
            ) return true;
        }
    }

    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            if (
                board[r][c] === piece &&
                board[r - 1][c + 1] === piece &&
                board[r - 2][c + 2] === piece &&
                board[r - 3][c + 3] === piece
            ) return true;
        }
    }

    return false;
}

function evaluateWindow(window, piece) {
    const oppPiece = piece === PLAYER ? OPPONENT : PLAYER;
    let score = 0;
    const countPiece = window.filter((v) => v === piece).length;
    const countOpp = window.filter((v) => v === oppPiece).length;
    const countEmpty = window.filter((v) => v === EMPTY).length;

    if (countPiece === 4) score += 10000;
    else if (countPiece === 3 && countEmpty === 1) score += 100;
    else if (countPiece === 2 && countEmpty === 2) score += 10;

    if (countOpp === 3 && countEmpty === 1) score -= 500;
    else if (countOpp === 2 && countEmpty === 2) score -= 50;

    return score;
}

function scorePosition(board, piece) {
    let score = 0;
    const mid = Math.floor(COLS / 2);
    for (let r = 0; r < ROWS; r++){
        if (board[r][mid] === piece) score += 6;
    }
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            score += evaluateWindow([board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]], piece);
        }
    }
    for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 3; r++) {
            score += evaluateWindow([board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]], piece);
        }
    }
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            score += evaluateWindow([board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]], piece);
        }
    }
    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            score += evaluateWindow([board[r][c], board[r - 1][c + 1], board[r - 2][c + 2], board[r - 3][c + 3]], piece);
        }
    }
    return score;
}

const cache = new Map();
function boardToKey(board, depth, maximizingPlayer) {
    return board.flat().join('') + '_' + depth + '_' + (maximizingPlayer ? '1' : '0');
}

function minimax(board, depth, alpha, beta, maximizingPlayer) {
    const key = boardToKey(board, depth, maximizingPlayer);
    if (cache.has(key)) return cache.get(key);
    const validLocations = getValidLocations(board);

    if (winningMove(board, PLAYER)) {
        return {column: null, score: 1e9};
    }
    if (winningMove(board, OPPONENT)) {
        return {column: null, score: -1e9};
    }
    if (validLocations.length === 0) {
        return {column: null, score: 0};
    }
    if (depth === 0){
        const sc = scorePosition(board, PLAYER);
        return { column: null, score: sc };
    }

    let value = (maximizingPlayer ? -Infinity : Infinity);
    let bestCol = validLocations[0];
    validLocations.sort((a, b) => Math.abs(b - Math.floor(COLS / 2)) - Math.abs(a - Math.floor(COLS / 2)));
    if (maximizingPlayer) {
        for (const col of validLocations) {
            const row = dropPiece(board, col, PLAYER);
            const newScore = minimax(board, depth - 1, alpha, beta, false).score;
            removePiece(board, row, col);
            if (newScore > value) {
                value = newScore;
                bestCol = col;
            }
            alpha = Math.max(alpha, value);
            if (alpha >= beta) break;
        }
    }
    else {
        for (const col of validLocations) {
            const row = dropPiece(board, col, OPPONENT);
            const newScore = minimax(board, depth - 1, alpha, beta, true).score;
            removePiece(board, row, col);
            if (newScore < value) {
                value = newScore;
                bestCol = col;
            }
            beta = Math.min(beta, value);
            if (alpha >= beta) break;
        }
    }
    const result = {column: bestCol, score: value};
    cache.set(key, result);
    return result;
}

function getBestMove(board, depth) {
    return minimax(board, depth, -Infinity, Infinity, true).column;
}

export {
    createBoard,
    dropPiece,
    getValidLocations,
    winningMove,
    getBestMove
};
