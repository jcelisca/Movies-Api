import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataModal } from '../domain/data-modal';

@Injectable()
export class ModalService {

  public newMessage = new Subject<DataModal>();
  public newMessage$ = this.newMessage.asObservable();

  getModal(title: string, message: string): void {
    const dataModal = new DataModal();
    dataModal.title = title;
    dataModal.message = message;
    this.newMessage.next(dataModal);
  }
}
