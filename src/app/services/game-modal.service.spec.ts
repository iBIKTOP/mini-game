import { TestBed } from '@angular/core/testing';

import { GameModalService } from './game-modal.service';
import { MatDialog } from '@angular/material/dialog';

describe('GameModalService', () => {
  let service: GameModalService;
  const matDialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);
  let matDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: matDialogSpyObj }],
    });
    service = TestBed.inject(GameModalService);
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('openDialog() should call open() on the dialog', () => {
    const winner: string = 'Player';

    service.openDialog(winner);

    expect(matDialogSpyObj.open).toHaveBeenCalled();
  });
});
