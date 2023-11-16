import { Component } from '@angular/core';
import { GameBoardService } from '../../services/game-board.service';
import { Observable } from 'rxjs';
import { GameState, InitialGameConfig } from '../../models/game.models';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss'],
})
export class GameResultsComponent {
  gameState!: Observable<GameState>;

  playerName: string = InitialGameConfig.PlayerName;
  computerName: string = InitialGameConfig.ComputerName;

  constructor(private gameBoardService: GameBoardService) {
    this.gameState = this.gameBoardService.gameState;
  }

  startGame(): void {
    if (
      this.gameBoardService.gameState.value.isSpeedEditing ||
      this.gameBoardService.gameState.value.isGameActive
    ) {
      return;
    }
    this.gameBoardService.startGame();
  }
}
