import { Component, Input } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '../common.module';
import { RouterLink } from '@angular/router';

export interface ToolbarButton {
  label: string;
  style: string;
  icon?: string;
  action(): void;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [ToolbarModule, CommonModule, RouterLink],
})
export class LayoutComponent {
  @Input()
  public title!: string;

  @Input()
  public toolbarButtons: ToolbarButton[] = [];

  @Input()
  public backButton: boolean = false;
}
