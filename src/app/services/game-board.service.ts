import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

import {
  BlockState,
  GameBlock,
  GameState,
  INITIAL_GAME_STATE,
  InitialGameConfig,
} from '../models/game.models';
import { GameModalService } from './game-modal.service';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  gameSpeed: number = InitialGameConfig.Speed;
  gameBoard: BehaviorSubject<GameBlock[]> = new BehaviorSubject<GameBlock[]>(
    [],
  );
  gameState: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(
    INITIAL_GAME_STATE,
  );
  private timer!: number | undefined;

  constructor(private gameModalService: GameModalService) {}

  initNewGameBoard(): void {
    let initialGameBoard: GameBlock[] = [];
    const blockCount: number =
      InitialGameConfig.CountBoardRows * InitialGameConfig.CountBoardCols;
    for (let i: number = 0; i < blockCount; i++) {
      initialGameBoard.push({ id: i, state: BlockState.InitialState });
    }
    this.gameBoard.next(initialGameBoard);
  }

  startGame(): void {
    this.gameState.next({
      ...this.gameState.value,
      isGameActive: true,
    });
    this.playRound();
  }

  clickBlockHandler(id: number): void {
    const board: GameBlock[] = this.gameBoard.value;
    const blockIndex: number = board.findIndex(
      (block: GameBlock): boolean => block.id === id,
    );
    if (board[blockIndex].state === BlockState.TemporaryState) {
      board[blockIndex].state = BlockState.PlayerState;
      this.gameBoard.next(board);
      this.gameState.next({
        ...this.gameState.value,
        playerScore: ++this.gameState.value.playerScore,
      });
      this.checkGameStatus();
    }
  }

  toggleIsEditing() {
    this.gameState.next({
      ...this.gameState.value,
      isSpeedEditing: !this.gameState.value.isSpeedEditing,
    });
  }

  private playRound(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    const board: GameBlock[] = this.gameBoard.value;
    const randomIndex: number = Math.floor(
      Math.random() *
        (InitialGameConfig.CountBoardRows * InitialGameConfig.CountBoardCols),
    );

    if (
      board[randomIndex].state === BlockState.ComputerState ||
      board[randomIndex].state === BlockState.PlayerState
    ) {
      this.playRound();
      return;
    }

    board[randomIndex].state = BlockState.TemporaryState;
    this.gameBoard.next(board);

    this.timer = setTimeout((): void => {
      if (this.gameState.value.isGameActive) {
        board[randomIndex].state = BlockState.ComputerState;
        this.gameBoard.next(board);
        this.gameState.next({
          ...this.gameState.value,
          computerScore: ++this.gameState.value.computerScore,
        });
        this.checkGameStatus();
      }
    }, this.gameSpeed);
  }

  private checkGameStatus(): void {
    this.gameState.value.playerScore === 10 ||
    this.gameState.value.computerScore === 10
      ? this.showWinner()
      : this.playRound();
  }

  private showWinner(): void {
    this.gameState.next({
      ...this.gameState.value,
      isGameActive: false,
    });
    const winner: string =
      this.gameState.value.playerScore === 10
        ? InitialGameConfig.PlayerName
        : InitialGameConfig.ComputerName;

    this.gameModalService.openDialog(winner);
    this.gameModalService.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((): void => {
        this.resetGame();
      });
  }

  private resetGame(): void {
    this.gameState.next(INITIAL_GAME_STATE);
    this.initNewGameBoard();
  }
}
