import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameBlock } from '../../models/game.models';

@Component({
  selector: 'app-game-block',
  templateUrl: './game-block.component.html',
  styleUrls: ['./game-block.component.scss'],
})
export class GameBlockComponent {
  @Input() block!: GameBlock;
  @Output() onClickBlock: EventEmitter<number> = new EventEmitter<number>();

  clickBlock(id: number): void {
    this.onClickBlock.emit(id);
  }
}
