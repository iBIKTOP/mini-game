import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { GameBoardService } from './game-board.service';
import { GameModalService } from './game-modal.service';
import {
  BlockState,
  GameBlock,
  GameState,
  INITIAL_GAME_STATE,
  InitialGameConfig,
} from '../models/game.models';
import { of } from 'rxjs';

describe('GameBoardService', () => {
  let service: GameBoardService;
  let gameModalServiceStub: GameModalService = {
    openDialog: (): void => {},
    dialogRef: { afterClosed: () => of({}) },
  } as unknown as GameModalService;
  let gameModalService: GameModalService;
  let initialGameBoard: GameBlock[] = [];
  const blockCount: number =
    InitialGameConfig.CountBoardRows * InitialGameConfig.CountBoardCols;
  for (let i: number = 0; i < blockCount; i++) {
    initialGameBoard.push({ id: i, state: BlockState.InitialState });
  }

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GameModalService, useValue: gameModalServiceStub },
      ],
    });
    service = TestBed.inject(GameBoardService);
    gameModalService = TestBed.inject(GameModalService);
    service.gameBoard.next(initialGameBoard);
    service.gameState.next({
      playerScore: 0,
      computerScore: 0,
      isGameActive: false,
      isSpeedEditing: false,
    });
    service.gameSpeed = 1;
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  describe('clickBlockHandler()', (): void => {
    it('should set state to block as green if state equals yellow', (): void => {
      const id: number = 10;
      const board: GameBlock[] = service.gameBoard.value;
      const index: number = board.findIndex(
        (block: GameBlock): boolean => block.id === id,
      );
      board[index] = { id: 10, state: BlockState.TemporaryState };
      service.gameBoard.next(board);

      service.clickBlockHandler(id);

      expect(service.gameBoard.value[index].state).toEqual(
        BlockState.PlayerState,
      );
    });

    it('should not set state to block as green if state does not equal yellow', (): void => {
      const id: number = 0;
      const index: number = service.gameBoard.value.findIndex(
        (block: GameBlock): boolean => block.id === id,
      );

      service.clickBlockHandler(id);

      expect(service.gameBoard.value[index].state).not.toEqual(
        BlockState.PlayerState,
      );
    });

    it('should increase playerScore if state equals yellow and call checkGameStatus()', (): void => {
      const id: number = 10;
      const spyCheckGameStatus = spyOn(service, 'checkGameStatus' as any);
      const board: GameBlock[] = service.gameBoard.value;
      const index: number = board.findIndex(
        (block: GameBlock): boolean => block.id === id,
      );
      board[index] = { id: 10, state: BlockState.TemporaryState };
      service.gameBoard.next(board);
      const expectedPlayerScore: number =
        service.gameState.value.playerScore + 1;

      service.clickBlockHandler(id);

      expect(service.gameState.value.playerScore).toEqual(expectedPlayerScore);
      expect(spyCheckGameStatus).toHaveBeenCalled();
    });

    it('should not increase playerScore if state does not equal yellow and not call checkGameStatus()', (): void => {
      const id: number = 10;
      const spyCheckGameStatus = spyOn(service, 'checkGameStatus' as any);
      const expectedPlayerScore: number = service.gameState.value.playerScore;

      service.clickBlockHandler(id);

      expect(service.gameState.value.playerScore).toEqual(expectedPlayerScore);
      expect(spyCheckGameStatus).not.toHaveBeenCalled();
    });
  });

  describe('startGame()', (): void => {
    it('Should set isGameActive to true and call playRound', (): void => {
      const playRoundSpy = spyOn(service, 'playRound' as any);

      service.startGame();

      expect(service.gameState.value.isGameActive).toBeTruthy();
      expect(playRoundSpy).toHaveBeenCalled();
    });
  });

  describe('toggleIsEditing()', (): void => {
    it('should toggle isSpeedEditing to true', (): void => {
      service.toggleIsEditing();

      expect(service.gameState.value.isSpeedEditing).toBeTruthy();
    });

    it('should toggle isSpeedEditing to false', (): void => {
      service.gameState.next({
        playerScore: 0,
        computerScore: 0,
        isGameActive: false,
        isSpeedEditing: true,
      });

      service.toggleIsEditing();

      expect(service.gameState.value.isSpeedEditing).toBeFalsy();
    });
  });

  describe('playRound()', (): void => {
    it('should clear Timeout if exist', (): void => {
      const clearTimeoutSpy = spyOn(window, 'clearTimeout');
      service['timer'] = 1;

      service['playRound']();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('should not clear Timeout if does not exist', (): void => {
      const clearTimeoutSpy = spyOn(window, 'clearTimeout');
      service['timer'] = undefined;

      service['playRound']();

      expect(clearTimeoutSpy).not.toHaveBeenCalled();
    });

    it('should not update board state if state is red or green', (): void => {
      const gameBoard: GameBlock[] = service.gameBoard.value;
      gameBoard[0] = { id: 0, state: BlockState.ComputerState };
      service.gameBoard.next(gameBoard);

      service['playRound']();

      expect(service.gameBoard.value[0].state).toEqual(
        BlockState.ComputerState,
      );
    });

    it('should update computerScore and call checkGameStatus() if speed time is over and game is active', fakeAsync((): void => {
      const checkGameStatusSpy = spyOn(service, 'checkGameStatus' as any);
      service.gameState.next({
        playerScore: 0,
        computerScore: 0,
        isGameActive: true,
        isSpeedEditing: false,
      });

      service['playRound']();
      tick(service.gameSpeed);

      expect(service.gameState.value.computerScore).toBe(1);
      expect(checkGameStatusSpy).toHaveBeenCalled();

      clearTimeout(service['timer']);
    }));

    it('should not update computerScore and call checkGameStatus() if game is not active', fakeAsync((): void => {
      const checkGameStatusSpy = spyOn(service, 'checkGameStatus' as any);
      service.gameState.next({
        playerScore: 0,
        computerScore: 0,
        isGameActive: false,
        isSpeedEditing: false,
      });

      service['playRound']();
      tick(service.gameSpeed);

      expect(service.gameState.value.computerScore).toBe(0);
      expect(checkGameStatusSpy).not.toHaveBeenCalled();

      clearTimeout(service['timer']);
    }));
  });

  describe('checkGameStatus()', (): void => {
    it('should call showWinner() if playerScore or computerScore are equal 10', (): void => {
      const showWinnerSpy = spyOn(service, 'showWinner' as any);
      service.gameState.next({
        playerScore: 10,
      } as GameState);

      service['checkGameStatus']();

      expect(showWinnerSpy).toHaveBeenCalled();
    });

    it('should call playRound() if playerScore or computerScore are not equal 10', (): void => {
      const showWinnerSpy = spyOn(service, 'playRound' as any);
      service.gameState.next({
        playerScore: 2,
      } as GameState);

      service['checkGameStatus']();

      expect(showWinnerSpy).toHaveBeenCalled();
    });
  });

  describe('showWinner()', (): void => {
    it('should set isGameActive to false', () => {
      service['showWinner']();

      expect(service.gameState.value.isGameActive).toBeFalse();
    });

    it('should call openDialog on gameModalService with "Player"', (): void => {
      const openDialogSpy = spyOn(gameModalService, 'openDialog');
      service.gameState.next({
        playerScore: 10,
      } as GameState);

      service['showWinner']();

      expect(openDialogSpy).toHaveBeenCalledWith(InitialGameConfig.PlayerName);
    });

    it('should call openDialog on gameModalService with "Computer"', (): void => {
      const openDialogSpy = spyOn(gameModalService, 'openDialog');
      service.gameState.next({
        computerScore: 10,
      } as GameState);

      service['showWinner']();

      expect(openDialogSpy).toHaveBeenCalledWith(
        InitialGameConfig.ComputerName,
      );
    });

    it('should call afterClosed on gameModalService.dialogRef', (): void => {
      const dialogRefSpy = spyOn(
        gameModalService.dialogRef,
        'afterClosed',
      ).and.returnValue(of({}));

      service['showWinner']();

      expect(dialogRefSpy).toHaveBeenCalled();
    });
  });

  describe('resetGame()', (): void => {
    it('should set INITIAL_GAME_STATE and call initNewGameBoard()', (): void => {
      const initNewGameBoardSpy = spyOn(service, 'initNewGameBoard');

      service['resetGame']();

      expect(service.gameState.value).toEqual(INITIAL_GAME_STATE);
      expect(initNewGameBoardSpy).toHaveBeenCalled();
    });
  });
});
