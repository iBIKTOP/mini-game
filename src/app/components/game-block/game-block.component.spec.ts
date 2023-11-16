import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBlockComponent } from './game-block.component';

describe('GameBlockComponent', () => {
  let component: GameBlockComponent;
  let fixture: ComponentFixture<GameBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameBlockComponent]
    });
    fixture = TestBed.createComponent(GameBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
