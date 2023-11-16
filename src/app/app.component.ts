import { Component } from '@angular/core';
import { InitialGameConfig } from './models/game.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = InitialGameConfig.GameName;
}
