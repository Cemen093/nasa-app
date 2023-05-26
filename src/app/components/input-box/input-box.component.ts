import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent {
  @Input() type!: string;
  @Input() label!: string;
  @Input() value!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
}
