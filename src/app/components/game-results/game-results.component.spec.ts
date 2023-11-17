import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultsComponent } from './game-results.component';
import { GameBoardService } from '../../services/game-board.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('GameResultsComponent', (): void => {
  let component: GameResultsComponent;
  let fixture: ComponentFixture<GameResultsComponent>;
  let fakedGameBoardService: GameBoardService;

  beforeEach((): void => {
    fakedGameBoardService = {
      gameState: new BehaviorSubject({
        playerScore: 0,
        computerScore: 0,
        isGameActive: false,
        isSpeedEditing: false,
      }),
      startGame: jasmine.createSpy('startGame'),
    } as unknown as GameBoardService;
    TestBed.configureTestingModule({
      declarations: [GameResultsComponent],
      providers: [
        { provide: GameBoardService, useValue: fakedGameBoardService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(GameResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should call startGame() on gameBoardService if game is not active and speed is not editing', (): void => {
    fakedGameBoardService.gameState.next({
      playerScore: 0,
      computerScore: 0,
      isGameActive: false,
      isSpeedEditing: false,
    });

    component.startGame();

    expect(fakedGameBoardService.startGame).toHaveBeenCalled();
  });

  it('should not call startGame() on gameBoardService if game is active', (): void => {
    fakedGameBoardService.gameState.next({
      playerScore: 0,
      computerScore: 0,
      isGameActive: true,
      isSpeedEditing: false,
    });

    component.startGame();

    expect(fakedGameBoardService.startGame).not.toHaveBeenCalled();
  });

  it('should not call startGame() on gameBoardService if speed is editing', (): void => {
    fakedGameBoardService.gameState.next({
      playerScore: 0,
      computerScore: 0,
      isGameActive: false,
      isSpeedEditing: true,
    });

    component.startGame();

    expect(fakedGameBoardService.startGame).not.toHaveBeenCalled();
  });
});
