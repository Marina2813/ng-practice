import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() type: 'submit' | 'reset' | 'button' = 'button';
  @Input() disabled = false;
  @Input() text = 'Button';
  @Input() severity: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';

  get classes() {
    const cls = ['btn'];

    switch (this.severity) {
      case 'primary':
        cls.push('btn-primary');
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


