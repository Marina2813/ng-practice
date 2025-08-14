import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() type: 'submit' | 'reset' | 'button' = 'button';
  @Input() disabled = false;
  @Input() text = 'Button';
  @Input() severity: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() isLoading = false;
  @Input() customClasses: string[] = [];


  get classes() {
    const cls = ['btn'];

    switch (this.severity) {
      case 'primary':
        cls.push('btn-theme-primary');
        break;
      case 'secondary':
        cls.push('btn-secondary');
        break;
      case 'danger':
        cls.push('btn-danger');
        break;
      case 'success':
        cls.push('btn-success');
        break;
    }
    return cls;
  }
}


