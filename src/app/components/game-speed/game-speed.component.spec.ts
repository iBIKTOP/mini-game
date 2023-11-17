import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSpeedComponent } from './game-speed.component';
import { GameBoardService } from '../../services/game-board.service';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

describe('GameSpeedComponent', (): void => {
  let component: GameSpeedComponent;
  let fixture: ComponentFixture<GameSpeedComponent>;
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
      toggleIsEditing: jasmine.createSpy('toggleIsEditing'),
    } as unknown as GameBoardService;
    TestBed.configureTestingModule({
      declarations: [GameSpeedComponent],
      providers: [
        { provide: GameBoardService, useValue: fakedGameBoardService },
      ],
    });
    fixture = TestBed.createComponent(GameSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.speedForm = new FormGroup<any>({
      speed: new FormControl(''),
    });
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should call toggleIsEditing on GameBoardService if game is not active', (): void => {
    fakedGameBoardService.gameState.next({
      playerScore: 0,
      computerScore: 0,
      isGameActive: false,
      isSpeedEditing: false,
    });

    component.toggleIsEditing();

    expect(fakedGameBoardService.toggleIsEditing).toHaveBeenCalled();
  });

  it('should not call toggleIsEditing on GameBoardService if game is active', (): void => {
    fakedGameBoardService.gameState.next({
      playerScore: 0,
      computerScore: 0,
      isGameActive: true,
      isSpeedEditing: false,
    });

    component.toggleIsEditing();

    expect(fakedGameBoardService.toggleIsEditing).not.toHaveBeenCalled();
  });

  it('should set gameSpeed on gameBoardService if input is editing', (): void => {
    fakedGameBoardService.gameState.next({
      playerScore: 0,
      computerScore: 0,
      isGameActive: false,
      isSpeedEditing: true,
    });
    const expectedSpeed: number = 2000;
    component.gameSpeed = expectedSpeed;

    component.toggleIsEditing();

    expect(fakedGameBoardService.gameSpeed).toEqual(expectedSpeed);
  });

  it('should set gameSpeed from input', (): void => {
    const expectedSpeed: number = 3000;
    const event: Event = {
      target: { value: expectedSpeed },
    } as unknown as Event;

    component.setNewSpeed(event as unknown as Event);

    expect(component.gameSpeed).toEqual(expectedSpeed);
  });

  it('inputHasErrors() should send true if errors is exist', (): void => {
    const speedControl = component.speedForm.controls['speed'];
    speedControl.setErrors({
      speedDurationRangeValidator: { speedDurationRangeValidator: true },
    });
    speedControl.markAsDirty();
    speedControl.markAsTouched();

    expect(component.inputHasErrors()).toBeTruthy();
  });
});
