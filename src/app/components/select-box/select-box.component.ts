import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent {
  @Input() label!: string;
  @Input() options!: { label: string, value: string }[];
  @Input() selectedOption!: string;
  @Output() selectedOptionChange: EventEmitter<any> = new EventEmitter<any>();
}
