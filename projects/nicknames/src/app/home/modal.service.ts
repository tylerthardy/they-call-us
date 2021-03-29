import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalConfig } from './modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  viewContainerRef: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  open(config: ModalConfig): void {
    const injector: Injector = Injector.create({
      providers: [
        { provide: 'config', useValue: config }
      ]
    });
    const factory = this.factoryResolver.resolveComponentFactory(ModalComponent);
    const ref: ComponentRef<ModalComponent> = this.viewContainerRef.createComponent(factory, 0, injector);
    ref.instance.openModal = true;
  }
}
