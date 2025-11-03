import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading: WritableSignal<boolean> = signal(false);
  show(): void {
    this.isLoading.set(true);
  }
  hide(): void {
    this.isLoading.set(false);
  }
}
