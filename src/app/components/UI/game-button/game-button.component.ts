import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.scss'],
})
export class GameButtonComponent {
  @Input() isDisabled!: boolean;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  clickHandler(): void {
    this.onClick.emit();
  }
}
