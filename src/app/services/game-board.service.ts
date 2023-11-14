import { Injectable } from '@angular/core';
import { GameBlock, GameData } from '../interfaces/gameBlock';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameBoardService {
  private boardRowsCount: number = 10;
  private boardColsCount: number = 10;
  private initialGameBlock: GameBlock = { color: 'blue' };
  private initialGameData: GameData = { playerScore: 0, computerScore: 0, gameActive: false };
  private timer!: number;
  gameTime: number = 2000;

  gameBoard: BehaviorSubject<GameBlock[][]> = new BehaviorSubject<GameBlock[][]>([]);
  gameData: BehaviorSubject<GameData> = new BehaviorSubject<GameData>(this.initialGameData);

  initNewGameBoard(): void {
    const initialGameBoard: GameBlock[][] = [];
    for (let i: number = 0; i < this.boardRowsCount; i++) {
      initialGameBoard[i] = [];
      for (let j: number = 0; j < this.boardColsCount; j++) {
        initialGameBoard[i][j] = { ...this.initialGameBlock };
      }
    }
    this.gameBoard.next(initialGameBoard);
  }

  startGame(): void {
    this.gameData.next({
      ...this.gameData.value,
      gameActive: true
    });
    this.playRound();
  }

  playRound(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    const randomRow: number = Math.floor(Math.random() * 10);
    const randomCol: number = Math.floor(Math.random() * 10);
    const board: GameBlock[][] = this.gameBoard.value;
    board[randomRow][randomCol].color = 'yellow';
    this.gameBoard.next(board);

    this.timer = setTimeout((): void => {
      if (this.gameData.value.gameActive) {
        const board: GameBlock[][] = this.gameBoard.value;
        board[randomRow][randomCol].color = 'red';
        this.gameBoard.next(board);
        this.gameData.next({
          ...this.gameData.value,
          computerScore: ++this.gameData.value.computerScore
        });
        this.checkGameStatus();
      }
    }, this.gameTime);
  }

  clickBlockHandler(row: number, col: number): void {
    const board: GameBlock[][] = this.gameBoard.value;
    if (board[row][col].color === 'yellow') {
      board[row][col].color = 'green';
      this.gameBoard.next(board);
      this.gameData.next({
        ...this.gameData.value,
        playerScore: ++this.gameData.value.playerScore
      });
      this.checkGameStatus();
    }
  }

  checkGameStatus(): void {
    if (this.gameData.value.playerScore === 10 || this.gameData.value.computerScore === 10) {
      this.gameData.next({
        ...this.gameData.value,
        gameActive: false
      });
      const winner: string = this.gameData.value.playerScore === 10 ? 'Гравець' : 'Комп\'ютер';
      console.log(`Гра завершена! ${winner} переміг!`);
      this.resetGame();
    } else {
      this.playRound();
    }
  }

  resetGame(): void {
    this.gameData.next(this.initialGameData);
    this.initNewGameBoard();
  }
}
