import { Component, OnInit } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-dialog-ex',
  templateUrl: './dialog-ex.component.html',
  styleUrls: ['./dialog-ex.component.scss'],
})
export class DialogExComponent implements OnInit {
  constructor(private dialog: DialogService) {}

  ngOnInit() {}

  onClose() {
    this.dialog.close();
  }
}
