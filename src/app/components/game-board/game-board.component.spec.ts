import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { GameBoardService } from '../../services/game-board.service';

describe('GameBoardComponent', (): void => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  const gameBoardServiceSpyObj = jasmine.createSpyObj(
    'GameBoardServiceSpyObj',
    ['clickBlockHandler', 'initNewGameBoard'],
  );
  let gameBoardService: jasmine.SpyObj<GameBoardService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameBoardComponent],
      providers: [
        { provide: GameBoardService, useValue: gameBoardServiceSpyObj },
      ],
    });
    fixture = TestBed.createComponent(GameBoardComponent);
    gameBoardService = TestBed.inject(
      GameBoardService,
    ) as jasmine.SpyObj<GameBoardService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should call clickBlockHandler() in gameBoardService if user clicks on block', (): void => {
    const expectedId: number = 0;

    component.clickBlockHandler(expectedId);

    expect(gameBoardService.clickBlockHandler).toHaveBeenCalledWith(expectedId);
  });
});
