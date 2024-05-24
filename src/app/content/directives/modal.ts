import { Directive, HostListener, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Directive({
    selector: '[modalDirective]'
})
export class modalDirective {
    constructor(
        private modalService: NgbModal,
    ) { }
    //get the modal content
    @Input() content: any;
    //get the modal size default size is lg
    @Input() size: string = 'lg';
    closeModal: string = '';


    //listen for the click event in the template ... since the template contains modalDirective below function will be triggered 
    //when the element with modalDirective is clicked
    @HostListener('click', ['$event'])
    clickEvent() {
        this.triggerModal(this.content)
    }


    triggerModal(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: this.size, centered: true }).result.then((res) => {
            this.closeModal = `Closed with: ${res}`;
        }, (res) => {
            this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        });
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}