import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNameComponent } from './game-name.component';

describe('GameNameComponent', (): void => {
  let component: GameNameComponent;
  let fixture: ComponentFixture<GameNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameNameComponent],
    });
    fixture = TestBed.createComponent(GameNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
