import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Loan } from '../shared/loan';
import { LoanService } from '../shared/loan.service';

@Component({
  selector: 'app-loans',
  templateUrl: 'loans.page.html',
  styleUrls: ['loans.page.scss']
})
export class LoansPage {
  loans: Loan[];

  constructor(private loanService: LoanService, public navCtrl: NavController, private router: Router) {
    this.loanService.getAllLoans()
      .subscribe(data => {
        this.loans = data;

        console.log(this.loans)
      })
  }
  
  getIconName(status: string):string{
    switch(status){
      case 'approved':
        return 'checkmark-circle';
      case 'rejected':
        return 'close-circle';
      case 'pending':
        return 'cloud-circle';
    }
  }

  goTo(data) {
    console.log(data.id)
    let navigationExtras: NavigationExtras = {
      queryParams: {
          loan: data
      }
  };


    this.router.navigate(['/detail'], {queryParams: data})

  }

}
