import { Component } from '@angular/core';

import { DialogConfig } from './../dialog/dialog.config';
import { DialogRef } from '../dialog/dialog.ref';

@Component({
  selector: 'app-dialog-ex',
  templateUrl: './dialog-ex.component.html',
  styleUrls: ['./dialog-ex.component.scss'],
})
export class DialogExComponent {
  constructor(public config: DialogConfig, private dialog: DialogRef) {}

  public onClose() {
    this.dialog.close('some');
  }
}
