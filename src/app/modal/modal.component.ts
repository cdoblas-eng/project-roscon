import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Input() isError: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
