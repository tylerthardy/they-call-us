import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ModalComponent } from './modal.component';
import { ModalConfig } from './modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  viewContainerRef: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver, private formBuilder: FormBuilder) { }

  setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  open(config: ModalConfig): Subject<any> {
    const injector: Injector = Injector.create({
      providers: [
        { provide: 'config', useValue: config }
      ]
    });
    const factory = this.factoryResolver.resolveComponentFactory(ModalComponent);
    const ref: ComponentRef<ModalComponent> = this.viewContainerRef.createComponent(factory, 0, injector);
    ref.instance.openModal = true;
    ref.instance.destroy = () => ref.destroy();

    return ref.instance.afterDestroy;
  }
}
