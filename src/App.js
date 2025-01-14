import React from 'react'
import './App.css';
import './styles.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/shared/auth/authenticate/Login';
import Signup from './components/shared/auth/register/Signup'
import ForgetPassword from './components/shared/auth/forgotPassword/ForgetPassword'
import ResetPassword from './components/shared/auth/resetPassword/ResetPassword';
import VerifyUser from './components/shared/auth/verifyUser/VerifyUser'
import RegisterComplete from './components/shared/auth/registerComplete/RegisterComplete';
import LandingPage from './components/core/landing/LandingPage';


const App = () => {
  return (
    <>
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPassword" element={<ForgetPassword />}/>
        <Route path="/resetPassword" element={<ResetPassword />}/>
        <Route path="/verifyUser" element={<VerifyUser />}/>
        <Route path="/registerComplete" element={<RegisterComplete />}/>

        <Route path="/landingpage" element={<LandingPage/>} />
      </Routes>
    </Router>
    </>
  );
};
// function Square({ value, onSquareClick }) {
//   return (
//     <button className="square" onClick={onSquareClick}>{value}</button>

//   );
// }

// function Board({ xIsNext, squares, onplay }) {
//   function handleClick(i) {
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     const nextSquare = squares.slice(); // to create a new sopy of the squares
//     if (xIsNext) {
//       nextSquare[i] = 'X';
//     } else {
//       nextSquare[i] = 'O';
//     }
//     onplay(nextSquare)
//   }

//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = 'winner is : ' + winner;
//   } else {
//     status = 'Next player: ' + (xIsNext ? 'X' : 'O')
//   }

//   return (
//     <>
//       <div className="status">{status}</div>
//       <div className='board-row'>
//         <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//         <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//         <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//       </div>
//       <div className='board-row'>
//         <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
//         <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
//         <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
//       </div>
//       <div className='board-row'>
//         <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
//         <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
//         <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
//       </div>

//     </>


//   );

// }

//  function Game() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const currentSquare = history[history.length - 1];

//   function handlePlay(nextSquare) {
//     setHistory([...history, nextSquare]); // an array of all items in history
//     setXIsNext(!xIsNext);
//   }

//   function jumpTo(nextMove) {

//   }


//   const moves = history.map((squares, move) => {
//     let description;
//     if (move > 0) {
//       description = 'Go to move ' + move;
//     } else {
//       description = 'Start game';
//     }
//     return (
//       <li>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     )

//   });


//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquare} onplay={handlePlay} />
//       </div>
//       <div className="game-info">
//         <ol>{moves}</ol>
//       </div>
//     </div>
//   );

// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];

//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }

//   }
//   return;
// }

// ReactDOM.render(<Board />, document.getElementById('root'));
 export default App;
