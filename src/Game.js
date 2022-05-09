import React, {useState} from "react";
import {calculateWinner, isDraw, minimaxPlayer} from "./ustils/ticTacToeUtils";
import {Board} from "./Board";


export function Game(){
    const [playerStarts, setPlayerStarts] = useState(true);
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const player = 'X';
    const opponent = 'O';


    const handleSquareClick = (i) =>{
        const prevHistory = history.slice(0, stepNumber + 1);
        const squares = prevHistory[prevHistory.length - 1].squares.slice();

        if (calculateWinner(squares) || squares[i])
            return;

        squares[i] = player

        if (!isDraw(squares) && !calculateWinner(squares)){
            let opponentMove = minimaxPlayer(squares, opponent);
            squares[opponentMove] = opponent;
        }

        setHistory(prevHistory.concat([{squares: squares}]));
        setStepNumber(stepNumber + 1);
    }

    const resetGame = () =>{
        const initialHistory = [{
            squares: Array(9).fill(null),
        }];
        if (!playerStarts)
            initialHistory[0].squares[Math.floor(Math.random() * 9)] = opponent;

        setStepNumber(0);
        setHistory(initialHistory);
    }


    const current = history[stepNumber];
    console.log(current);
    const winner = calculateWinner(current.squares);

    let status = '';
    if (winner)
        status = 'Winner: ' + winner + '!';
    if (isDraw(current.squares))
        status = 'Draw';

    return (
        <div>
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleSquareClick(i)}
                />
            </div>
            <div className="game-controls">
                <label>
                    AI gets first move
                    <input type='checkbox' checked={!playerStarts} onChange={() => setPlayerStarts(!playerStarts)}/>
                </label>
                <button onClick={() => resetGame()}>newGame</button>
                <div className="timeControls">
                    <button className="button-undo" disabled={stepNumber===0} onClick={()=>setStepNumber(stepNumber-1)}>Undo</button>
                    <button className="button-redo" disabled={history.length -1 === stepNumber} onClick={()=>setStepNumber(stepNumber+1)}>Redo</button>
                </div>
            </div>
        </div>
            <p className="status">player: {player}</p>
            <p className="status">AI: {opponent}</p>
            <h1 className="status">{status}</h1>
        </div>
    );
}