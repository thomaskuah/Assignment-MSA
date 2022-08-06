import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';
import { Loan } from '../shared/loan';
import { LoanService } from '../shared/loan.service';

@Component({
  selector: 'app-new-loan',
  templateUrl: 'new-loan.page.html',
  styleUrls: ['new-loan.page.scss']
})
export class NewLoanPage {
  items: Item[];
  loan: Loan;

  constructor(
    private itemService: ItemService,
    private loanService: LoanService,
    private toastController: ToastController) {

    this.itemService.getAllAsync().subscribe(result =>
      this.items = result
    );

  }

  submit() {
    // for (let temp of this.items) {
    //   console.log(temp.id + ': ' + temp.quantity);
    // }

    this.loanService.createLoan(this.items).then(async loan => {

      const toast = await this.toastController.create({
        message: 'Loan created with ID ' + loan.id,
        duration: 2000,
        position: 'top',
        color: 'secondary'
      });
      toast.present();

      // After loan created successfully, reset all item quantity to 0
      this.itemService.resetQuantity();
    });

  }

}
