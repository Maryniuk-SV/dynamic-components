import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './insertion.directive';
import { DialogExComponent } from '../dialog-ex/dialog-ex.component';

@NgModule({
  declarations: [DialogComponent, InsertionDirective, DialogExComponent],
  entryComponents: [DialogComponent, DialogExComponent],
  imports: [CommonModule, MatButtonModule],
})
export class DialogModule {}
