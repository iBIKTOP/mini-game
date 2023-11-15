import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSpeedComponent } from './game-speed.component';

describe('GameSpeedComponent', () => {
  let component: GameSpeedComponent;
  let fixture: ComponentFixture<GameSpeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameSpeedComponent]
    });
    fixture = TestBed.createComponent(GameSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
