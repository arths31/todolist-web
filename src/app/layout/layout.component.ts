import { Component, Input } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '../common.module';

export interface ToolbarButton {
  label: string;
  color: string;
  icon?: string;
  action(): void;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true,
  imports: [ToolbarModule, CommonModule],
})
export class LayoutComponent {
  @Input()
  public title!: string;

  @Input()
  public toolbarButtons: ToolbarButton[] = [];
}
