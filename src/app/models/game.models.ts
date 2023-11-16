export enum InitialGameConfig {
  GameName = 'MINI GAME',
  PlayerName = 'Player',
  ComputerName = 'Computer',
  CountBoardRows = 10,
  CountBoardCols = 10,
  Speed = 1000,
}

export const INITIAL_GAME_STATE: GameState = {
  playerScore: 0,
  computerScore: 0,
  isGameActive: false,
  isSpeedEditing: false,
};

export enum BlockState {
  InitialState = 'blue',
  TemporaryState = 'yellow',
  PlayerState = 'green',
  ComputerState = 'red',
}

export interface GameBlock {
  id: number;
  state: string;
}

export interface GameState {
  playerScore: number;
  computerScore: number;
  isGameActive: boolean;
  isSpeedEditing: boolean;
}
