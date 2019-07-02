import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  Type,
} from '@angular/core';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogRef: ComponentRef<DialogComponent>;

  constructor(
    private cfResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  public open(componentType: Type<any>) {
    this.appendDialogComponentToBody();

    this.dialogRef.instance.childComponentType = componentType;
  }

  public close() {
    this.removeDialogComponentFromBody();
  }

  private appendDialogComponentToBody() {
    const factory = this.cfResolver.resolveComponentFactory(DialogComponent);
    const componentRef = factory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogRef = componentRef;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogRef.hostView);
    this.dialogRef.destroy();
  }
}
