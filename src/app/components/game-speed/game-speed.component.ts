import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../../services/game-board.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../../validators/castom-validators';
import { GameState } from '../../models/game.models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-game-speed',
  templateUrl: './game-speed.component.html',
  styleUrls: ['./game-speed.component.scss'],
})
export class GameSpeedComponent implements OnInit {
  gameState!: BehaviorSubject<GameState>;
  gameSpeed!: number;
  speedForm!: FormGroup;
  constructor(
    private gameBoardService: GameBoardService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.gameState = this.gameBoardService.gameState;
    this.gameSpeed = this.gameBoardService.gameSpeed;
    this.initForm();
  }

  toggleIsEditing(): void {
    if (this.gameBoardService.gameState.value.isGameActive) {
      return;
    }

    if (this.gameBoardService.gameState.value.isSpeedEditing) {
      this.gameBoardService.gameSpeed = this.gameSpeed;
    }

    this.gameBoardService.toggleIsEditing();
  }

  setNewSpeed(event: Event): void {
    this.gameSpeed = +(event.target as HTMLInputElement).value;
  }

  inputHasErrors(): boolean {
    return (this.speed.touched || this.speed.dirty) && !!this.speed.errors;
  }

  get speed(): AbstractControl {
    return this.speedForm.get('speed')!;
  }

  private initForm(): void {
    this.speedForm = this.fb.group({
      speed: [
        this.gameSpeed,
        [
          Validators.required,
          CustomValidators.speedDurationRangeValidator(0, 10000),
        ],
      ],
    });
  }
}
