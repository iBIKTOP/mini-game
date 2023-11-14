export const GAME_NAME: string = 'MINI GAME';
export const PLAYER_NAME: string = 'Human';
export const COMPUTER_NAME: string = 'Computer';
export const ROWS_COUNT: number = 10;
export const COLS_COUNT: number = 10;
export const INITIAL_GAME_BLOCK: GameBlock = { color: 'blue' };
export const INITIAL_GAME_DATA: GameData = { playerScore: 0, computerScore: 0, gameActive: false };

export interface GameBlock {
  color: string;
}

export interface GameData {
  playerScore: number;
  computerScore: number;
  gameActive: boolean;
}
