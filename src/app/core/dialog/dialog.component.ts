import { Subject, Observable } from 'rxjs';
import {
  Component,
  Type,
  AfterViewInit,
  OnDestroy,
  ComponentFactoryResolver,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ComponentRef } from '@angular/core/src/render3';
import { InsertionDirective } from './insertion.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild(InsertionDirective) insertionPoint: InsertionDirective;

  private close: Subject<boolean> = new Subject();
  private componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;

  constructor(
    private cfResolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef,
  ) {}

  get onClose(): Observable<boolean> {
    return this.close.asObservable();
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOverlayClicked(evt: MouseEvent) {
    this.close.next();
    console.log('onOverlayClicked: ', evt);
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
    console.log('onDialogClicked: ', evt);
  }

  loadChildComponent(componentType: Type<any>) {
    const factory = this.cfResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(
      factory,
    ) as ComponentRef<any>;
  }
}
