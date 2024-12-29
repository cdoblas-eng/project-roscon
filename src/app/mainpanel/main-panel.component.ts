import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Fill, newRoscon, Roscon, Size} from '../products';
import { HttpClient } from "@angular/common/http";
import {RosconesService} from "../services/roscones.service";

@Component({
    selector: 'app-mainpanel',
    templateUrl: './main-panel.component.html',
    styleUrls: ['./main-panel.component.scss'],
})
export class MainPanelComponent {

    constructor(private http: HttpClient, private rosconesService: RosconesService) {

    }

    client: string = ''; // Cliente, numero de telefono o dni
    enableSecondFill: boolean = false; // Estado de añadir segundo relleno por defecto false
    plusOrMinusButton: string = 'bi bi-plus-lg';
    rosconArray: Roscon[] = [];
    total: string = '0,00€';
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

    showModal: boolean = false;
    modalTitle: string = '';
    modalMessage: string = '';
    modalIsError: boolean = false;

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

    showConfirmation() {
        this.modalTitle = 'Confirm Action';
        this.modalMessage = 'Are you sure you want to proceed?';
        this.modalIsError = false;
        this.showModal = true;
    }

    showError() {
        this.modalTitle = 'Error';
        this.modalMessage = 'An unexpected error occurred.';
        this.modalIsError = true;
        this.showModal = true;
    }

    onModalClose() {
        this.showModal = false;
    }

    onModalConfirm() {
        this.showModal = false;
        // Perform the confirmed action
        console.log('Action confirmed');
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
        if (this.rosconArray[index].quantity == 0) this.rosconArray.splice(index, 1);

        // this.totals();
        //console.log(this.prods);
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
        this.total = '0,00€';
        this.main = false;
        this.activeSize = Size.GR.toString();
        this.updateOrderMode = false
    }

    newSpecial(form: NgForm) {
        this.specialSize = form.controls['special-size'].value;
    }

    send() {
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
                    console.info('complete')
                    this.openPopup("El pedido ha sido enviado correctamente")
                }
            })

    }

    search() {
        //hacer peticion a servidor
        this.rosconesService.getRoscones(this.client).subscribe({
            next: (v) => {
                //si encuentra roscones
                if (Object.keys(v).length != 0) {
                    v.forEach(roscon => {
                        console.log(roscon)
                        // this.rosconesService.addSpecialFields(roscon);
                    })
                    this.rosconArray = v;
                    // console.log(this.prods);
                    this.updateOrderMode = true;
                } else { // si no encuentra el cliente
                    this.openPopup(`El cliente: ${this.client} no existe en el sistema`)
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


        // //.subscribe(
        // data => this.prods = data,
        // error => console.log("wachin")
        // );
        // this.rosconesService.getRoscones(this.client).subscribe(
        //     (data) => {
        //       this.prods = data;
        //       console.log('Datos obtenidos:', this.prods);
        //     }
        // );
        //si encuentro el cliente

        //si no encuento el cliente
        // this.updateOrderMode = false;
    }

    //Funcion utilizada en los botones para salir del modo busqueda
    cancelUpdateMode() {
        this.updateOrderMode = false;
        this.clear();
    }

    updateOrder() {
        this.rosconesService.modifyOrder(this.client, this.rosconArray).subscribe(
            {
                error: (e) => {
                    //mostrar error
                    this.openPopupError()
                    console.error(e)
                },
                complete: () => {
                    this.openPopup("El pedido ha sido modificado correctamente")
                }
            }
        )
    }

    markAsSold() {
        this.rosconesService.markAsSold(this.client).subscribe(
            {
                error: (e) => {
                    //mostrar error
                    this.openPopupError()
                    console.error(e)
                },
                complete: () => {
                    this.openPopup("El pedido se ha establecido como vendido")
                }
            }
        )
    }

    markAsUnsold() {
        this.rosconesService.markAsSold(this.client).subscribe(
            {
                error: (e) => {
                    //mostrar error
                    this.openPopupError()
                    console.error(e)
                },
                complete: () => {
                    this.openPopup("El pedido se ha establecido como vendido")
                }
            }
        )
    }

    deleteOrder() {
        //Formulario de confirmacion

        //peticion a servidor eliminando el cliente x
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
                    this.openPopup("El pedido ha sido eliminado del sistema")
                }
            }
        )

        this.clear()
    }

    protected readonly Size = Size;
    protected readonly Fill = Fill;
}
