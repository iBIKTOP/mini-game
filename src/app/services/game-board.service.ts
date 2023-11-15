import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import {
  BLOCK_COLOR_GREEN,
  BLOCK_COLOR_RED,
  BLOCK_COLOR_YELLOW,
  COLS_COUNT,
  COMPUTER_NAME,
  GameBlock,
  GameData,
  INITIAL_GAME_BLOCK,
  INITIAL_GAME_DATA,
  INITIAL_GAME_TIME,
  PLAYER_NAME,
  ROWS_COUNT,
} from '../models/game.models';
import { GameModalComponent } from '../components/game-modal/game-modal.component';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  private boardRowsCount: number = ROWS_COUNT;
  private boardColsCount: number = COLS_COUNT;
  private initialGameBlock: GameBlock = INITIAL_GAME_BLOCK;
  private initialGameData: GameData = INITIAL_GAME_DATA;
  private timer!: number;
  gameSpeed: number = INITIAL_GAME_TIME;

  gameBoard: BehaviorSubject<GameBlock[][]> = new BehaviorSubject<
    GameBlock[][]
  >([]);
  gameData: BehaviorSubject<GameData> = new BehaviorSubject<GameData>(
    this.initialGameData,
  );

  constructor(public dialog: MatDialog) {}

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
      gameActive: true,
    });
    this.playRound();
  }

  clickBlockHandler(row: number, col: number): void {
    const board: GameBlock[][] = this.gameBoard.value;
    if (board[row][col].color === 'yellow') {
      board[row][col].color = 'green';
      this.gameBoard.next(board);
      this.gameData.next({
        ...this.gameData.value,
        playerScore: ++this.gameData.value.playerScore,
      });
      this.checkGameStatus();
    }
  }

  private playRound(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    const board: GameBlock[][] = this.gameBoard.value;
    const [row, col]: [number, number] = this.initComputerStep();

    if (
      board[row][col].color === BLOCK_COLOR_RED ||
      board[row][col].color === BLOCK_COLOR_GREEN
    ) {
      this.playRound();
      return;
    }

    board[row][col].color = BLOCK_COLOR_YELLOW;
    this.gameBoard.next(board);

    this.timer = setTimeout((): void => {
      if (this.gameData.value.gameActive) {
        const board: GameBlock[][] = this.gameBoard.value;
        board[row][col].color = BLOCK_COLOR_RED;
        this.gameBoard.next(board);
        this.gameData.next({
          ...this.gameData.value,
          computerScore: ++this.gameData.value.computerScore,
        });
        this.checkGameStatus();
      }
    }, this.gameSpeed);
  }

  private initComputerStep(): [number, number] {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }

  private checkGameStatus(): void {
    this.gameData.value.playerScore === 10 ||
    this.gameData.value.computerScore === 10
      ? this.showWinner()
      : this.playRound();
  }

  private showWinner(): void {
    this.gameData.next({
      ...this.gameData.value,
      gameActive: false,
    });
    const winner: string =
      this.gameData.value.playerScore === 10 ? PLAYER_NAME : COMPUTER_NAME;

    let dialogRef: MatDialogRef<GameModalComponent> = this.dialog.open(
      GameModalComponent,
      {
        height: '300px',
        width: '700px',
        data: { winner },
      },
    );

    dialogRef.afterClosed().subscribe((): void => {
      this.resetGame();
    });
  }

  private resetGame(): void {
    this.gameData.next(this.initialGameData);
    this.initNewGameBoard();
  }
}
