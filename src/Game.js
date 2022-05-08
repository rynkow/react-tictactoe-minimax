import React, {useState} from "react";
import {calculateWinner, isDraw, minimaxPlayer} from "./ustils/ticTacToeUtils";
import {Board} from "./Board";


export function Game(props){
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
    }]);
    const [playerStarts, setPlayerStarts] = useState(false);
    const [stepNumber, setStepNumber] = useState(0);
    const player = 'X';
    const opponent = 'O';

    if (!playerStarts && history.length === 1){
        history[0].squares[Math.floor(Math.random() * 10)] = opponent;
    }

    const handleSquareClick = (i) =>{
        const prevHistory = history.slice(0, stepNumber + 1);
        const squares = prevHistory[prevHistory.length - 1].squares.slice();

        if (calculateWinner(squares) || squares[i])
            return;

        squares[i] = player

        if (!isDraw(squares) && !calculateWinner(squares)){
            let opponentMove = minimaxPlayer(squares, opponent);
            console.log(opponentMove);
            squares[opponentMove] = opponent;
        }

        setHistory(prevHistory.concat([{squares: squares}]));
        setStepNumber(stepNumber + 1);
    }

    const jumpTo = (step) =>{
        setStepNumber(step);
    }



    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner)
        status = 'Winner: ' + winner + '!';
    else
        status = '';

    let moves = history.map((step, move) => {
        const desc = move
            ? 'Go to move #' + move
            : 'Restart game';
        return (
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleSquareClick(i)}
                />
                <div>{status}</div>
            </div>
            <div className="game-info">

                <ol>{moves}</ol>
            </div>
        </div>
    );
}