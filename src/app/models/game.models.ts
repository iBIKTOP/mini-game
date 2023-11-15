export const GAME_NAME: string = 'MINI GAME';
export const PLAYER_NAME: string = 'Player';
export const COMPUTER_NAME: string = 'Computer';
export const ROWS_COUNT: number = 10;
export const COLS_COUNT: number = 10;
export const INITIAL_GAME_TIME: number = 2000;

export const BLOCK_COLOR_BLUE: string = 'blue';
export const BLOCK_COLOR_YELLOW: string = 'yellow';
export const BLOCK_COLOR_RED: string = 'red';
export const BLOCK_COLOR_GREEN: string = 'green';

export const INITIAL_GAME_BLOCK: GameBlock = { color: BLOCK_COLOR_BLUE };
export const INITIAL_GAME_DATA: GameData = {
  playerScore: 0,
  computerScore: 0,
  gameActive: false,
};

export interface GameBlock {
  color: string;
}

export interface GameData {
  playerScore: number;
  computerScore: number;
  gameActive: boolean;
}
