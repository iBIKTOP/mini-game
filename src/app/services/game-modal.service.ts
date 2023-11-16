import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GameModalComponent } from '../components/game-modal/game-modal.component';

@Injectable({
  providedIn: 'root',
})
export class GameModalService {
  dialogRef!: MatDialogRef<GameModalComponent>;
  constructor(public dialog: MatDialog) {}

  openDialog(winner: string): void {
    this.dialogRef = this.dialog.open(GameModalComponent, {
      height: '300px',
      width: '700px',
      data: { winner },
    });
  }
}
