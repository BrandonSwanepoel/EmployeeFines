import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

enum ModalTypes {
  Employees = "Employees",
  Fine = "Fine"
}

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html'
})
export class ModalComponent implements OnChanges {
  @Input() details: any;

  @Output() updatedDetails = new EventEmitter<boolean>();

  public updatedDetailsValue!: boolean;

  public modalTypes: typeof ModalTypes = ModalTypes;
  public showModal!: boolean;
  public employeeId!:number;

  get getDetails(): any { return this.details.body }
  get type(): string { return this.details?.type }

  ngOnChanges(): void {
    this.showModal = this.details?.showModal;

    if(this.type == ModalTypes.Fine && this.getDetails.id == undefined)
    {
      this.employeeId = this.getDetails;
    }
  }

  public closeModal(): void {
    this.showModal = false;
  }
  public setUpdatedDetails(event: any) {
    this.updatedDetails.emit(event);
    this.showModal = false
  }
}
