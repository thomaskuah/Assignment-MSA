import { Component } from '@angular/core';
import { Item } from '../shared/item';
import { Loan } from '../shared/loan';
import { LoanService } from '../shared/loan.service';
@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss'],
})
export class ManagePage {

  currentSort = "earliest" // initialized first time value
  loans: Loan[];
  constructor(private loanService: LoanService) {
  
    this.loadData(this.currentSort) // run function when upon first enter
  }


  loadData(sort) {

    this.loanService.getAllLoans().subscribe((data) => {
      
      // get all loans by default sort by duedate early to later

      if (sort === "earliest") {
        console.log(data);
        this.loans = data; // no need reverse array
      } else {
        this.loans = data.reverse(); // reverse data latest to earliest
      }
    });
  }



  approve(l: Loan) {
    console.log(l);
    this.loanService.approve(l);
  }

  reject(l: Loan) {
    this.loanService.reject(l);
  }

  // detect changes in filter whn on selection
  handleChange(e) {
    console.log(e.detail.value);
    this.currentSort = e.detail.value // retrieve value and replace
    this.loadData(e.detail.value)

  }
}
