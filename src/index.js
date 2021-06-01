import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
Square is just a function component
When clicked it puts the appropriate design from css file
You need to just assign the correct div name for each value
check css file for div names, the ones needed here are
circle red-player, circle yellow-player, circle
I have put dollar signs where you need to fill up
*/

function Square(props) {
        return (
          <button className="square" onClick={() => props.onClick()}>
            <div className={props.value === 'Red' ? "circle red-player" : props.value === 'Yellow' ? "circle yellow-player" : 'circle'}></div>
          </button>
        );
    }
    
    /*
    in renderSquare call the square component
    pass value and onclick props to it
    
    in the render method of Col component
    call render square for all squares in
    1 column that is from 0-5.
    inside the div board-col
    */
    class Col extends React.Component {
    
        renderSquare(i) {
            return (
                <Square
                  value={this.props.value[i]}
                  onClick={() => this.props.onClick()}
                />
              );
        }
      
        render() {
          return (
            <div>
                <div className="board-col">
              
                    {this.renderSquare(5)}
                    {this.renderSquare(4)}
                    {this.renderSquare(3)}
                    {this.renderSquare(2)}
                    {this.renderSquare(1)}
                    {this.renderSquare(0)}
                    
                </div>
                
                
            
            
            </div>
          );
        }
    }
    
    class Board extends React.Component {
        //Default constructor values
        //NOTE: our board array is column x row format 
        //hence 7 x 6, don't get confused
        constructor() {
            super();
            this.state ={
                boardValue: new Array(7).fill(null).map(row => new Array(6).fill(null)),
                redIsNext: true,
                winner: null
            }
        }
    CheckFull(board){
        for(let c=0; c<7; c++){
            if(board[c][5] === null)
                return false;
            
        }
        return true;     
    }

    miniMax(tempBoard, curPlayer, depth, alpha, beta, track) {
        let score;
        //check if terminal state, depth == 0 or gameover or board filled(DRAW)
        //call get_state and return it
        if(depth===0|| this.CheckFull(tempBoard)|| gameOver(tempBoard)){
            score= get_state(tempBoard);
            return score;
        }
        

        const opponent = (curPlayer === 'Red')? 'Yellow' : 'Red';
        var best = (curPlayer === 'Red')? 50000 : -50000; // random big values i took
        var pos = 3; // default can be anything doesn't matter

        /* loop for all columns from 0-6
        if yellow(computer turn) then use maximizer function
        else if red(player turn) use minimzer function
        keep updating tempBoard & track when you pass them for recursion, decrease depth also by 1
        and once it comes back revert the change back to normal to pass for next iteration
        best should store the highest or lowest score possible depending on who current player is
        */
       for(let c=0; c<7; c++){
           if(track[c]<6 ){
                //maximizer
                if(curPlayer=== 'Yellow'){
                    tempBoard[c][track[c]]= curPlayer;
                    track[c]+=1;
                    score= this.miniMax(tempBoard, opponent, depth-1, alpha, beta, track);

                    if(score>best){
                        best = score;
                        pos=c;

                        if(best>alpha){
                            alpha=best;
                        }
                        if(beta<=alpha){
                            track[c]-=1;
                            tempBoard[c][track[c]]=null;
                            break;
                       }
                    }    
                    track[c]-=1;
                    tempBoard[c][track[c]]=null;
                }
                //minimizer
                else{
                    tempBoard[c][track[c]] = curPlayer;
                    track[c] += 1;
                    score = this.miniMax(tempBoard, opponent, depth-1, alpha, beta, track);
                    

                    if(score < best) {
                        best = score;
                        pos = c;
                        
                        if(best < beta) {
                            beta = best;
                        }

                        if(beta <= alpha) {
                            track[c] -= 1;
                            tempBoard[c][track[c]] = null;
                            break;
                        }
                    }
                    track[c] -= 1;
                    tempBoard[c][track[c]] = null;
                }
           }
            if(depth === 8) {
                return pos;
            }
            else {
                return best;
            }
       }
        /* if this was the starting point of recursion check depth == whatever value you set 
        in AIplay then return the position to play
        else return best which stored the best score we could get from this path */
        
    }

    AIplay() {
        //check if winner exists and return
        if(this.state.winner !==null || this.CheckFull(this.state.boardValue))
            return;
        

        
        const val = this.state.boardValue.slice();
        const curPlayer = this.state.redIsNext? 'Red' : 'Yellow';
        
        var depth = 8 //try changing this value in your browsers
        //in mine this works at a decent speed
        var track = new Array(7).fill(7);
        //Track first empty position of each column
        //track[i] = the position in the ith column where the next turn will fall
        for(let c=0; c<7; c++){
            for(let r=0; r<6; r++){
                if(val[c][r]===null){
                    track[c]=r;
                    break;
                }
            }
        }
        var pos = this.miniMax(val, curPlayer, depth, -50000, 50000, track);
        //returns which column is the most optimal to play in

        //put the computer token in pos column
        //check if game over
        let findResult;
        for(let c=0; c<6; c++){
            if(val[c][pos]===null){
                val[c][pos]= curPlayer;
                findResult= gameOver(val);
                break;
            }
        }

        var curWinner= this.state.winner? curPlayer: null;
        //set state again like how in player
        //no callback function needed
        this.setState({
            boardValue: val,
            redIsNext: !this.state.redIsNext,
            winner: curWinner
        });
    }

handleClick(col) {
    /* Check if there exists a winner 
    If winner is not null then return since game is over 
    and any other click should not continue playing*/
    if(this.state.winner !== null||this.CheckFull(this.state.boardValue)){
        return;
    }
        

    const val = this.state.boardValue.slice();
    const curPlayer = this.state.redIsNext? 'Red' : 'Yellow';
    let findResult;

    /*val is our current board
    check for the [col][0-5] which is the first free cell
    since in connect4 there can only be 1 position 
    for each column in a particular turn
    assign that cell the curPlayer value
    after making the turn call gameOver function
    and assign that value to findResult
    NOTE: when looping from 0-5 if we have reached the end(5)
    of the loop and there is no empty cell that implies the column
    is filled, so return immediately since the play is not possible
    NEED to use some jump statements like return, break, goto, continue etc...*/
    let row= null;
    let k;
    for(k =0;k<=5; k++ ){
        if(val[col][k]=== null){
            row= k;
            val[col][k]= curPlayer;
            findResult=gameOver(val);
            break;
        }
            
    }
    if(row === null)
        return;

    


    var curWinner = findResult? curPlayer : null;

    /*call this.setState now
    boardValue will be val
    redIsNext should be complemented
    winner assign curWinner*/
    this.setState({
        boardValue: val,
        redIsNext: !this.state.redIsNext,
        winner: curWinner,},
        () => {
        this.AIplay(); // Call to function for computer to take it's turn
    });
    }

    renderCol(i) {
         /* Call Column Component Here
        Pass the onclick handler and
        that column's values */
        return (
             <Col
               value={this.state.boardValue[i]}
               onClick={() => this.handleClick(i)}
              />
            );
    }
        
     render() {
         var status;
        // If there exists a winner status should show winner is ---
        // Else status should show next player is ---
        // Use the state values winner and isRedNext for doing the above conditions easily
        // let curWinner= this.state.curWinner;
        if(this.state.winner!== null){
            status=this.state.winner+' wins';
        }
        else if(this.CheckFull(this.state.boardValue)){
            status= 'It is a draw';
        }
        else{
            status= 'Next player is '+ (this.state.redIsNext? 'Red' : 'Yellow');
        }
                
        /* Render all 7 columns (0-6)
         inside the div game-board */
         return (
            <div className="game">
                <div className="status">{status}</div>
                <div className="game-board">                             
                        {this.renderCol(0)}
                        {this.renderCol(1)}
                        {this.renderCol(2)}
                        {this.renderCol(3)}
                        {this.renderCol(4)}
                        {this.renderCol(5)}
                        {this.renderCol(6)}
        
                        
                </div>
            </div>
         );
    }
}

/* called from get_state
count the number of yellow, red and empty in the sequence of 4 passed
and assign scores according to how close to win or lose
computer winning should be positive scores
player winning should be negative scores
*/

function calc(a, b, c, d) {
    let y = 0;
    let r = 0;
    //Count for Each
    if(a==='Yellow')
        y++;
    if(b==='Yellow')
        y++;
    if(c==='Yellow')
        y++;
    if(d==='Yellow')
        y++;
    if(a==='Red')
        r++;
    if(b==='Red')
        r++;
    if(c==='Red')
        r++;
    if(d==='Red')
        r++;
    /* these are very random values i have given based on intuition
    and it seems to be working well */
    /*Check these references for better understanding
    https://medium.com/analytics-vidhya/artificial-intelligence-at-play-connect-four-minimax-algorithm-explained-3b5fc32e4a4f
    https://towardsdatascience.com/creating-the-perfect-connect-four-ai-bot-c165115557b0
    */

    if(y === 4 && r === 0) {
        return 5000;
    } 
    else if(y === 3 && r === 0) {
        return 50;
    } 
    else if(y === 2 && r === 0) {
        return 4;
    }
    else if(y === 0 && r === 4) {
        return -3000;
    }
    else if(y === 0 && r === 3) {
        return -100;
    }
    else if(y === 0 && r === 2) {
        return -10;
    }
    else {
        return 0;
    }
}

/* We check similar to gameover
for every winnable sequence of 4 positions
what they are filled with or how many are empty*/

function get_state(tempBoard) {
    var total = 0;
    //VERTICAL
    for (let c = 0; c < 7; c++)
        for (let r = 0; r < 3; r++)
            total += calc(tempBoard[c][r], tempBoard[c][r+1], tempBoard[c][r+2], tempBoard[c][r+3]);
    //Horizintal
    for(let r=0; r<6; r++)
        for(let c=0; c<3; c++)
            total+= calc(tempBoard[c][r], tempBoard[c+1][r], tempBoard[c+2][r], tempBoard[c+3][r]);
    //Diagonal
    for (let c = 0; c < 4; c++)
        for (let r = 0; r < 3; r++)
            total+= calc(tempBoard[c][r], tempBoard[c+1][r+1], tempBoard[c+2][r+2], tempBoard[c+3][r+3]);
    //Antidiagonal
    for (let r = 0; r < 3; r++)
        for (let c = 3; c < 7; c++)
            total+= calc(tempBoard[c][r], tempBoard[c-1][r+1], tempBoard[c-2][r+2], tempBoard[c-3][r+3]);  

    return total;

}

/*
Return true if all 4 positions have the same colour
Else return false
NOTE(possible bug): if all 4 have null then it should return false 
since the game is not over, don't return true there
*/

function check(a, b, c, d) {
    if(a === b && b === c && c === d && a !== null)
        return true;
    return false;
}

/*
Function to check if the game is over
check if there exists a winner
take all possible combinations of 4 that can win
and pass it to the check function to see if they are all the same
I have checked for all vertical conditions
In a similar manner check for the other 3 directions
*/

function gameOver(board) {
    //VERTICAL
    for (let c = 0; c < 7; c++){
        for (let r = 0; r < 3; r++){
            if (check(board[c][r], board[c][r+1], board[c][r+2], board[c][r+3]))
                return true;
        }
      }
    //HORIZONTAL
    for (let r = 0; r < 6; r++){
        for (let c = 0; c < 3; c++){
            if (check(board[c][r], board[c+1][r], board[c+2][r], board[c+3][r]))
                return true;
           }
       }

    //DIAGONAL
    for (let c = 0; c < 4; c++)
        for (let r = 0; r < 3; r++)
            if (check(board[c][r], board[c+1][r+1], board[c+2][r+2], board[c+3][r+3]))
                return true;
    
    //ANTIDIAGONAL
    for (let r = 0; r < 3; r++)
            for (let c = 3; c < 7; c++)
                if (check(board[c][r], board[c-1][r+1], board[c-2][r+2], board[c-3][r+3]))
                    return true;
    return null;
}

/* 
Topmost Component Game
Call Board Component from game
write one line to call board below the h1 header
no props passed 
*/

class Game extends React.Component {
    render() {
        return (
            <div>
                <h1>Connect4</h1>
                <Board/>
            </div>
        );
    }
}

// ========================================
// Entry Point of Code, Dont change anything
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
