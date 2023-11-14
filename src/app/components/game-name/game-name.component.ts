import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-game-name',
  templateUrl: './game-name.component.html',
  styleUrls: ['./game-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameNameComponent {}
