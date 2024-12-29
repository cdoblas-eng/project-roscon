import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Fill, newRoscon, Roscon, Size} from '../products';
import { HttpClient } from "@angular/common/http";
import {RosconesService} from "../services/roscones.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-mainpanel',
    templateUrl: './main-panel.component.html',
    styleUrls: ['./main-panel.component.scss'],
})
export class MainPanelComponent {


    constructor(private http: HttpClient, private rosconesService: RosconesService, private modalService: NgbModal) { }

    openModal(content: any) {
        this.modalService.open(content, { centered: true });
    }

    closeModal(content: any) {
        this.deleteModal = false;
        this.modalService.dismissAll();
    }

    onConfirm(modal: any) {
        // Lógica de confirmación
        console.log('Acción confirmada');
        //Formulario de confirmacion
        this.rosconesService.deleteOrder(this.client).subscribe(
            {
                next: (v) => {
                    // console.log(v)
                },
                error: (e) => {
                    //mostrar error
                    this.openPopupError()
                    console.error(e)
                },
                complete: () => {
                    this.clear()
                }
            }
        )
        modal.close('Confirmar');
    }

    client: string = ''; // Cliente, numero de telefono o dni
    enableSecondFill: boolean = false; // Estado de añadir segundo relleno por defecto false
    plusOrMinusButton: string = 'bi bi-plus-lg';
    rosconArray: Roscon[] = [];
    main: boolean = false;
    displayStyle: string = 'none';
    displayStyleError: string = 'none';
    popupMessage: string = "";
    //Valores de enumerados
    fillValues: Fill[]= Object.values(Fill).filter(value => value != Fill.NATA && value != Fill.EMPTY);
    fillValues2: Fill[]= [];

    sizeValues = Object.values(Size);
    activeSize = Size.GR.toString();
    specialSize: Size = Size.GR;
    especialIns: Fill = Fill.CREMA;
    especialIns2: Fill | null = Fill.EMPTY;
    //Si el modo edicion de pedido esta activo se debe deshabilitar el campo cliente y cambiar botones de Enviar por Modificar y añadir boton de eliminar pedido
    updateOrderMode = false;
    sold = false;

    modalTitle: string = '';
    modalMessage: string = '';
    deleteModal: boolean = false;

    //Metodo auxiliar para la configuracion de los combobox de los rellenos especiales
    //De inicio nunca se podra añadir un roscon especial de nata, se habilitará la opcion cuando se habilite el segundo relleno
    //Una vez se habilita el segundo relleno no se pueden poner ambos rellenos del mismo tipo
    getFillValues(){
        // Si no se encuentra habilitado el relleno 2
        if (!this.enableSecondFill){
            this.fillValues = Object.values(Fill).filter(value => value != Fill.NATA && value != Fill.EMPTY);
            this.especialIns = this.especialIns == Fill.NATA ? Fill.CREMA : this.especialIns;
            this.especialIns = this.especialIns == Fill.EMPTY ? Fill.CREMA : this.especialIns;
            this.especialIns2 = this.especialIns == this.especialIns2 ? Fill.NATA : this.especialIns2;
        }
        else{
            this.fillValues =  Object.values(Fill).filter(value => value != this.especialIns2);
            this.fillValues2 = Object.values(Fill).filter(value => value != this.especialIns);
        }
    }

    setActive(size: string) {
        this.activeSize = size;
    }

    half() {
        this.enableSecondFill = !this.enableSecondFill;
        this.getFillValues();

        if (this.enableSecondFill) {
            this.plusOrMinusButton = 'bi bi-dash-lg';
        } else {
            this.plusOrMinusButton = 'bi bi-plus-lg';
        }
    }

    addRoscon(size: Size, fill: Fill) {
        let found: boolean = false;

        for (let roscon of this.rosconArray) {
            if (size === roscon.size && fill === roscon.fill ) {
                found = true;
                roscon.quantity++;
                break;
            }
        }

        if (!found)
            this.rosconArray.push(newRoscon(size, fill));
    }

    addEspecial(){
        //En caso de que sea especial
        let esp_default: Roscon = {
            quantity: 1,
            notes: null,
            size: this.specialSize,
            fill: this.especialIns,
            half: this.enableSecondFill ? this.especialIns2 : null,
        };
        this.rosconArray.push(esp_default);
    }

    increaseQuantity(index: number) {
        this.rosconArray[index].quantity++;
    }

    decreaseQuantity(index: number) {
        this.rosconArray[index].quantity--;
        if (this.rosconArray[index].quantity == 0) {
            this.rosconArray.splice(index, 1);
        }
    }

    openPopup(message: string) {
        this.popupMessage = message;
        this.displayStyle = 'block';
    }

    closePopup() {
        this.displayStyle = 'none';
        this.clear();
    }

    openPopupError() {
        this.displayStyleError = 'block';
    }

    closePopupError() {
        this.displayStyleError = 'none';
    }

    clear() {
        this.client = '';
        this.enableSecondFill = false;
        this.plusOrMinusButton = 'bi bi-plus-lg';
        this.rosconArray = [];
        this.main = false;
        this.activeSize = Size.GR.toString();
        this.updateOrderMode = false
        this.deleteModal = false;
    }

    newSpecial(form: NgForm) {
        this.specialSize = form.controls['special-size'].value;
    }

    send(content: any) {
        this.rosconesService.sendOrder(this.client, this.rosconArray).subscribe(
            {
                next: (v) => console.log(v),
                error: (e) => {
                    //mostrar error en la busqueda
                    console.error(e)
                    this.openPopupError()
                    //popup error de la peticion
                },
                complete: () => {
                    //si esta vacio no encuentra nada
                    this.modalTitle = "Pedido enviado al sistema"
                    this.modalMessage = "El pedido ha sido enviado correctamente"
                    this.openModal(content);
                    this.clear();
                }
            })

    }

    search(content: any) {
        //hacer peticion a servidor
        this.rosconesService.getRoscones(this.client).subscribe({
            next: (v) => {
                //si encuentra roscones
                if (Object.keys(v).length != 0) {
                    v.forEach(roscon => {
                        console.log(roscon)
                    })
                    this.rosconArray = v;
                    console.log(v);
                    this.updateOrderMode = true;
                    this.sold = v[0].vendido == "TRUE";

                } else { // si no encuentra el cliente
                    this.modalTitle = "No se encuentra al cliente"
                    this.modalMessage = `El cliente: ${this.client} no existe en el sistema`
                    this.openModal(content);
                }
            },
            error: (e) => {
                //mostrar error en la busqueda
                this.openPopupError()
                console.error(e)
            },
            complete: () => {
                console.info('get roscones request complete')
            }
        })
    }

    //Funcion utilizada en los botones para salir del modo busqueda
    cancelUpdateMode() {
        this.updateOrderMode = false;
        this.clear();
    }

    updateOrder(content: any) {
        this.rosconesService.modifyOrder(this.client, this.rosconArray).subscribe(
            {
                error: (e) => {
                    //mostrar error
                    this.openPopupError()
                    console.error(e)
                },
                complete: () => {
                    this.modalTitle = "Confirmación"
                    this.modalMessage = "El pedido ha sido modificado correctamente"
                    this.openModal(content);
                    this.clear();
                }
            }
        )
    }

    markAsSold(content: any) {
        this.rosconesService.markAsSold(this.client).subscribe(
            {
                error: (e) => {
                    this.openPopupError()
                    console.error(e)
                },
                complete: () => {
                    this.modalTitle = "Confirmación"
                    this.modalMessage = "El pedido se ha establecido como vendido"
                    this.openModal(content);
                    this.clear();
                }
            }
        )
    }

    markAsUnsold(content: any) {
        this.rosconesService.markAsUnsold(this.client).subscribe(
            {
                error: (e) => {
                    this.openPopupError()
                    console.error(e)
                },
                complete: () => {
                    this.modalTitle = "Confirmación"
                    this.modalMessage = "El pedido se ha establecido como no vendido"
                    this.openModal(content);
                    this.clear();
                }
            }
        )
    }

    deleteOrder(content: any) {
        this.modalTitle = "Confirmación borrar pedido"
        this.modalMessage = "¿Está seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer"
        this.deleteModal = true;
        this.openModal(content);
    }

    protected readonly Size = Size;
    protected readonly Fill = Fill;
}
