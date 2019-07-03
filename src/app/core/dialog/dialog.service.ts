import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  Type,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DialogComponent } from './dialog.component';
import { DialogInjector } from './dialog.injector';
import { DialogConfig } from './dialog.config';
import { DialogRef } from './dialog.ref';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(
    private cfResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  public open(componentType: Type<any>, config: DialogConfig): DialogRef {
    const dialogRef = this.appendDialogComponentToBody(config);

    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  public close() {
    this.removeDialogComponentFromBody();
  }

  private appendDialogComponentToBody(config: DialogConfig): DialogRef {
    // create a map with the config
    const map = new WeakMap();
    map.set(DialogConfig, config);

    // add the DialogRef to dependency injection
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    // we want to know when somebody called the closed method
    const sub: Subscription = dialogRef.afterClosed.subscribe(() => {
      // close the dialog
      this.close();
      sub.unsubscribe();
    });

    const factory = this.cfResolver.resolveComponentFactory(DialogComponent);
    const componentRef = factory.create(new DialogInjector(this.injector, map));
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => this.close());

    return dialogRef;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
