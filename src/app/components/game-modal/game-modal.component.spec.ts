import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModalComponent } from './game-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GameModalComponent', (): void => {
  let component: GameModalComponent;
  let fixture: ComponentFixture<GameModalComponent>;
  const matDialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);
  const matDialogData: string = 'Player';
  let matDialogRef: jasmine.SpyObj<MatDialogRef<GameModalComponent>>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [GameModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: matDialogData },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(GameModalComponent);
    matDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<GameModalComponent>
    >;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should call close() on dialogRef if user closes dialog', (): void => {
    component.closeDialog();

    expect(matDialogRef.close).toHaveBeenCalled();
  });
});
