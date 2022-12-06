import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { CommonModule as AngularCommonModule } from '@angular/common';

@NgModule({
  imports: [ButtonModule, AngularCommonModule],
  exports: [ButtonModule, AngularCommonModule],
  providers: [],
})
export class CommonModule {}
