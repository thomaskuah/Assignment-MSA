import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Loan } from '../shared/loan';
import { LoanService } from '../shared/loan.service';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-loans',
  templateUrl: 'loans.page.html',
  styleUrls: ['loans.page.scss'],
})
export class LoansPage {
  sortDate = 'earliest';
  sortStatus = 'all';

  loans = [];
  email = '';
  constructor(
    private loanService: LoanService,
    public navCtrl: NavController,
    private storage: Storage,
    private router: Router
  ) {
    // this.email = firebase.auth().currentUser.email

    this.storage.create();
    this.storage.get('email').then((e) => {
      this.email = e;
      this.getData(e);
    });
  }

  getData(email) {
    if (this.sortStatus != 'all') {
      this.loanService
        .getStatusLoansbyEmail(email, this.sortStatus)
        .subscribe((data) => {
          if (this.sortDate === 'earliest') {
            this.loans = data;
            console.log(this.loans);

          } else {
            this.loans = data.reverse();
            console.log(this.loans);
          }
        });
    } else {
      this.loanService.getAllLoansbyEmail(email).subscribe((data) => {
        if (this.sortDate === 'earliest') {
          this.loans = data;
          console.log(this.loans);
        } else {
          this.loans = data.reverse();
          console.log(this.loans);
        }
      });
    }
  }

  statusSorting() {}

  getIconName(status: string): string {
    switch (status) {
      case 'approved':
        return 'checkmark-circle';
      case 'rejected':
        return 'close-circle';
      case 'pending':
        return 'cloud-circle';
    }
  }

  getColor(color) {

    switch (color) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
    }
  }


  handleDate(e) {
    this.sortDate = e.detail.value;
    this.getData(this.email);
  }

  handleStatus(e) {
    this.sortStatus = e.detail.value;
    this.getData(this.email);
  }

  goTo(data) {
    console.log(data.id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        loan: data,
      },
    };

    this.router.navigate(['/detail'], { queryParams: data });
  }
}
