import { Component } from '@angular/core';
import { GameBoardService } from './services/game-board.service';
import { Observable } from 'rxjs';
import { GameData } from "./interfaces/gameBlock";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gameData!: Observable<GameData>;

  constructor(private gameBoardService: GameBoardService) {
    this.gameData = this.gameBoardService.gameData;
  }

  startGame(): void {
    this.gameBoardService.startGame();
  }
}
