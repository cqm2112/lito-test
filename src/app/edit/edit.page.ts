// edit-insurance.page.ts
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { InsuranceService,Insurance } from '../services/Insurance.service';


@Component({
  selector: 'app-edit-insurance',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditInsurancePage implements OnInit {
 
    insurance!: Insurance; 

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private insuranceService: InsuranceService
  ) { }

  ngOnInit() {
    // Recupera el seguro que se va a editar
    this.insurance = this.navParams.get('insurance');
}

  async saveChanges() {
    try {
      // Envía una solicitud de actualización al backend para guardar los cambios
      await this.insuranceService.updateInsurance(this.insurance._id,this.insurance);
      // Cierra el modal de edición
      this.modalController.dismiss();
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  }

  dismissModal() {
    // Cierra el modal de edición sin guardar cambios
    this.modalController.dismiss();
  }
}
