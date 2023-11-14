import { Component } from '@angular/core';
import { GAME_NAME } from './models/game.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = GAME_NAME;
}
