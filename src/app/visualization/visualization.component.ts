import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizationComponent{
  @Input() links: string[] = [];
}
