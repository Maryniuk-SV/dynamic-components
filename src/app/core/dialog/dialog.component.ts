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

  childComponentType: Type<any>;
  componentRef: ComponentRef<any>;

  constructor(
    private cfResolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef,
  ) {}

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
    console.log('onOverlayClicked: ', evt);
    // close the dialog
  }

  onDialogClicked(evt: MouseEvent) {
    console.log('onDialogClicked: ', evt);
    evt.stopPropagation();
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
