import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameResultsComponent } from './components/game-results/game-results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';

import { GameNameComponent } from './components/game-name/game-name.component';
import { GameContainerComponent } from './components/game-container/game-container.component';
import { GameModalComponent } from './components/game-modal/game-modal.component';
import { GameButtonComponent } from './components/UI/game-button/game-button.component';
import { GameSpeedComponent } from './components/game-speed/game-speed.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameResultsComponent,
    GameNameComponent,
    GameContainerComponent,
    GameModalComponent,
    GameButtonComponent,
    GameSpeedComponent,
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
