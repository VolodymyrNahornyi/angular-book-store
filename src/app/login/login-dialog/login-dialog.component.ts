import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {
  @Input() title: string = 'Alert';
  @Input() message: string = '';

  @Output() close = new EventEmitter<void>();

  closeDialog() {
    this.close.emit();
  }
}
