import { Component } from '@angular/core';
import { GameBoardService } from '../../services/game-board.service';
import { Observable } from 'rxjs';
import { COMPUTER_NAME, GameData, PLAYER_NAME } from '../../models/game.models';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent {
  gameData!: Observable<GameData>;

  playerName: string = PLAYER_NAME;
  computerName: string = COMPUTER_NAME;

  constructor(private gameBoardService: GameBoardService) {
    this.gameData = this.gameBoardService.gameData;
  }

  startGame(): void {
    this.gameBoardService.startGame();
  }
}
