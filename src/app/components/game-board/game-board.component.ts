import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameBlock } from '../../models/game.models';
import { GameBoardService } from '../../services/game-board.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  gameBoard!: Observable<GameBlock[][]>;

  @Output() onClickBlock: EventEmitter<[i: number, j: number]> = new EventEmitter<[i: number, j: number]>();

  constructor(private gameBoardService: GameBoardService) {}

  ngOnInit(): void {
    this.gameBoardService.initNewGameBoard();
    this.gameBoard = this.gameBoardService.gameBoard;
  }

  clickBlock(row: number, col: number): void {
    this.gameBoardService.clickBlockHandler(row, col);
  }
}
