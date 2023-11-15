import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss'],
})
export class GameModalComponent {
  constructor(
    public dialogRef: MatDialogRef<GameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { winner: string },
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
