// Connect4 Minimax with Alpha-Beta pruning (JavaScript)
// Standard board: 6 rows x 7 columns

const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER = 1;   // AI
const OPPONENT = 2; // Human (or other AI)

// Create empty board
function createBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

// Return list of valid column indices (0..6) where a move can be made
function getValidLocations(board) {
    const valid = [];
    for (let c = 0; c < COLS; c++) if (board[0][c] === EMPTY) valid.push(c);
    return valid;
}

// Drop a piece in column for player; returns row index where placed or -1 if full
function dropPiece(board, col, piece) {
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] === EMPTY) {
            board[r][col] = piece;
            return r;
        }
    }
    return -1;
}

// Undo piece placed at (row, col)
function removePiece(board, row, col) {
    board[row][col] = EMPTY;
}

// Check if last move created a win for 'piece'
function winningMove(board, piece) {
    // horizontal
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

    // vertical
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

    // positively sloped diagonal
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

    // negatively sloped diagonal
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

// Check if board is full
function isBoardFull(board) {
    for (let c = 0; c < COLS; c++) if (board[0][c] === EMPTY) return false;
    return true;
}

// Score a window of 4 cells for heuristic
function evaluateWindow(window, piece) {
    const oppPiece = piece === PLAYER ? OPPONENT : PLAYER;
    let score = 0;
    const countPiece = window.filter((v) => v === piece).length;
    const countOpp = window.filter((v) => v === oppPiece).length;
    const countEmpty = window.filter((v) => v === EMPTY).length;

    if (countPiece === 4) score += 10000;
    else if (countPiece === 3 && countEmpty === 1) score += 100;
    else if (countPiece === 2 && countEmpty === 2) score += 10;

    if (countOpp === 3 && countEmpty === 1) score -= 80; // block opponent
    else if (countOpp === 2 && countEmpty === 2) score -= 5;

    return score;
}

// Heuristic evaluation of the board for 'piece' (higher is better for piece)
function scorePosition(board, piece) {
    let score = 0;

    // Center column preference
    const centerArray = [];
    for (let r = 0; r < ROWS; r++) centerArray.push(board[r][Math.floor(COLS / 2)]);
    const centerCount = centerArray.filter((v) => v === piece).length;
    score += centerCount * 6;

    // Horizontal windows
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            const window = [board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]];
            score += evaluateWindow(window, piece);
        }
    }

    // Vertical windows
    for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 3; r++) {
            const window = [board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]];
            score += evaluateWindow(window, piece);
        }
    }

    // Positive diagonal windows
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            const window = [
                board[r][c],
                board[r + 1][c + 1],
                board[r + 2][c + 2],
                board[r + 3][c + 3],
            ];
            score += evaluateWindow(window, piece);
        }
    }

    // Negative diagonal windows
    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            const window = [
                board[r][c],
                board[r - 1][c + 1],
                board[r - 2][c + 2],
                board[r - 3][c + 3],
            ];
            score += evaluateWindow(window, piece);
        }
    }

    return score;
}

// Check terminal node: win or draw
function isTerminalNode(board) {
    return (
        winningMove(board, PLAYER) ||
        winningMove(board, OPPONENT) ||
        getValidLocations(board).length === 0
    );
}

// Minimax with alpha-beta pruning
// Returns an object { column, score }
function minimax(board, depth, alpha, beta, maximizingPlayer) {
    const validLocations = getValidLocations(board);
    const isTerminal = isTerminalNode(board);

    if (depth === 0 || isTerminal) {
        if (isTerminal) {
            if (winningMove(board, PLAYER)) {
                return { column: null, score: 1e9 }; // very large positive
            } else if (winningMove(board, OPPONENT)) {
                return { column: null, score: -1e9 }; // very large negative
            } else {
                return { column: null, score: 0 }; // draw
            }
        } else {
            // depth === 0
            const sc = scorePosition(board, PLAYER);
            return { column: null, score: sc };
        }
    }

    if (maximizingPlayer) {
        let value = -Infinity;
        let bestCol = validLocations[Math.floor(Math.random() * validLocations.length)]; // fallback
        // Optional move ordering: prefer center moves first (improves pruning)
        validLocations.sort((a, b) => Math.abs(b - Math.floor(COLS / 2)) - Math.abs(a - Math.floor(COLS / 2)));
        for (const col of validLocations) {
            const row = dropPiece(board, col, PLAYER);
            const newScore = minimax(board, depth - 1, alpha, beta, false).score;
            removePiece(board, row, col);
            if (newScore > value) {
                value = newScore;
                bestCol = col;
            }
            alpha = Math.max(alpha, value);
            if (alpha >= beta) break; // alpha-beta prune
        }
        return { column: bestCol, score: value };
    } else {
        let value = Infinity;
        let bestCol = validLocations[Math.floor(Math.random() * validLocations.length)];
        validLocations.sort((a, b) => Math.abs(a - Math.floor(COLS / 2)) - Math.abs(b - Math.floor(COLS / 2)));
        for (const col of validLocations) {
            const row = dropPiece(board, col, OPPONENT);
            const newScore = minimax(board, depth - 1, alpha, beta, true).score;
            removePiece(board, row, col);
            if (newScore < value) {
                value = newScore;
                bestCol = col;
            }
            beta = Math.min(beta, value);
            if (alpha >= beta) break; // prune
        }
        return { column: bestCol, score: value };
    }
}

// Public function to get best move for the AI (PLAYER)
// depth: search depth (typical values: 4..8 depending on speed)
function getBestMove(board, depth = 5) {
    const result = minimax(board, depth, -Infinity, Infinity, true);
    return result.column;
}

/* ---------------------------
Example usage:

const board = createBoard();
// simulate moves (dropPiece(board, col, PLAYER or OPPONENT))
dropPiece(board, 3, OPPONENT);
dropPiece(board, 3, PLAYER);
dropPiece(board, 2, OPPONENT);

// Ask AI to pick best column with depth 5:
const aiMove = getBestMove(board, 5);
console.log("AI chooses column:", aiMove);

Note: Depth 5-6 is a good balance; increase depth for stronger play but it's exponential.
---------------------------- */

export {
    createBoard,
    dropPiece,
    removePiece,
    getValidLocations,
    winningMove,
    getBestMove,
    PLAYER,
    OPPONENT,
    EMPTY
}
