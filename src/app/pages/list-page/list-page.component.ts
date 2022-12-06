import { Component } from '@angular/core';
import { LayoutComponent, ToolbarButton } from '../../layout/layout.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
  standalone: true,
  imports: [LayoutComponent],
})
export class ListPageComponent {
  protected toolbarButtons: ToolbarButton[] = [
    { label: 'Test', action() {}, color: '' },
  ];
}
