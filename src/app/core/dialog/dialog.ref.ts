import { Subject, Observable } from 'rxjs';

export class DialogRef {
  private readonly afterClosedDialog: Subject<any> = new Subject();

  get afterClosed(): Observable<any> {
    return this.afterClosedDialog.asObservable();
  }

  close(result?: any): void {
    this.afterClosedDialog.next(result);
  }
}
