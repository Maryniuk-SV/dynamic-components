import { Component } from '@angular/core';
import { DialogService } from './core/dialog/dialog.service';
import { DialogExComponent } from './core/dialog-ex/dialog-ex.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dialog: DialogService) {}

  open() {
    this.dialog.open(DialogExComponent);
  }
}
