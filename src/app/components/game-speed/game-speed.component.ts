import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../../services/game-board.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../../validators/castom-validators';

@Component({
  selector: 'app-game-speed',
  templateUrl: './game-speed.component.html',
  styleUrls: ['./game-speed.component.scss'],
})
export class GameSpeedComponent implements OnInit {
  isEditing: boolean = false;
  gameSpeed!: number;
  speedForm!: FormGroup;
  constructor(
    private gameBoardService: GameBoardService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.gameSpeed = this.gameBoardService.gameSpeed;
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

  toggleIsEditing(): void {
    this.isEditing = !this.isEditing;
  }

  setNewSpeed(event: Event): void {
    this.gameSpeed = +(event.target as HTMLInputElement).value;
    this.gameBoardService.gameSpeed = this.gameSpeed;
  }

  get speed(): AbstractControl {
    return this.speedForm.get('speed')!;
  }
}
