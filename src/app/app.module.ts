import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameResultsComponent } from './components/game-results/game-results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { GameNameComponent } from './components/game-name/game-name.component';
import { GameContainerComponent } from './components/game-container/game-container.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameResultsComponent,
    GameNameComponent,
    GameContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
