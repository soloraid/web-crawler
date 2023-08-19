import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormComponent {
  url: string = '';
  depth: number = 1;

  @Output() startCrawling = new EventEmitter<{ url: string, depth: number }>();

  onSubmit() {
    this.startCrawling.emit({ url: this.url, depth: this.depth });
  }
}
