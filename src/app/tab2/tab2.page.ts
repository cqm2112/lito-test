import { Component, OnInit } from '@angular/core';
import { Insurance, InsuranceService } from '../services/Insurance.service';
import { ModalController, NavController } from '@ionic/angular';
import {EditInsurancePage} from '../edit/edit.page'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  insurances: Insurance[] = [];

  constructor(private insuranceService: InsuranceService,private modalController: ModalController ) {}

  async ngOnInit() {
    try {
      const response = await this.insuranceService.getAllInsurances().toPromise();
      if (response !== undefined) {
        this.insurances = response;
        console.log(response);
      } else {
        console.error('La respuesta del servicio es undefined.');
      }
    } catch (error) {
      console.error('Error al obtener seguros:', error);
    }
  }
  async deleteInsurance(insuranceId: string) {
    try {
      const response = await this.insuranceService.deleteInsurance(insuranceId).toPromise();
      // Actualizar la lista de seguros después de eliminar uno (si es necesario)
      // Puedes volver a cargar los seguros o filtrar el elemento eliminado de la lista
      console.log('Seguro eliminado:', response);
    } catch (error) {
      console.error('Error al eliminar seguro:', error);
    }
  }

  async openEditModal(insurance: Insurance) {
    const modal = await this.modalController.create({
      component: EditInsurancePage,
      componentProps: {
        insurance: insurance
      }
    });
    await modal.present();
}
}