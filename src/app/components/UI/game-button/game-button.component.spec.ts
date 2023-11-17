import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameButtonComponent } from './game-button.component';

describe('GameButtonComponent', (): void => {
  let component: GameButtonComponent;
  let fixture: ComponentFixture<GameButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameButtonComponent],
    });
    fixture = TestBed.createComponent(GameButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick', (): void => {
    const onClickSpy = spyOn(component.onClick, 'emit');

    component.clickHandler();

    expect(onClickSpy).toHaveBeenCalled();
  });
});
