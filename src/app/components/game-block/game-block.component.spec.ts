import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBlockComponent } from './game-block.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GameBlock } from '../../models/game.models';

describe('GameBlockComponent', (): void => {
  let component: GameBlockComponent;
  let fixture: ComponentFixture<GameBlockComponent>;
  let expectedBlock: GameBlock = { id: 0, state: 'red' };

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [GameBlockComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(GameBlockComponent);
    component = fixture.componentInstance;
    component.block = expectedBlock;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should emit onClickBlock', (): void => {
    const onClickBlockSpy = spyOn(component.onClickBlock, 'emit');

    component.clickBlock(0);

    expect(onClickBlockSpy).toHaveBeenCalledOnceWith(0);
  });
});
