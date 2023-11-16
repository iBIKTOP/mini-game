import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameResultsComponent } from './components/game-results/game-results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';

import { GameNameComponent } from './components/game-name/game-name.component';
import { GameModalComponent } from './components/game-modal/game-modal.component';
import { GameButtonComponent } from './components/UI/game-button/game-button.component';
import { GameSpeedComponent } from './components/game-speed/game-speed.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameBlockComponent } from './components/game-block/game-block.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameResultsComponent,
    GameNameComponent,
    GameModalComponent,
    GameButtonComponent,
    GameSpeedComponent,
    GameBlockComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
