import { Component, OnInit } from '@angular/core';
import { GameBlock } from '../../models/game.models';
import { GameBoardService } from '../../services/game-board.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {
  gameBoard!: Observable<GameBlock[]>;

  constructor(private gameBoardService: GameBoardService) {}

  ngOnInit(): void {
    this.gameBoardService.initNewGameBoard();
    this.gameBoard = this.gameBoardService.gameBoard;
  }

  clickBlockHandler(id: number): void {
    this.gameBoardService.clickBlockHandler(id);
  }
}
