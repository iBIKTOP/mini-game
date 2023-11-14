import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent {
  @Input() playerScore!: number;
  @Input() computerScore!: number;

  playerName: string = 'Human';
  computerName: string = 'Computer';
}
