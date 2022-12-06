import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ButtonModule, AngularCommonModule, FormsModule],
  exports: [ButtonModule, AngularCommonModule, FormsModule],
  providers: [],
})
export class CommonModule {}
