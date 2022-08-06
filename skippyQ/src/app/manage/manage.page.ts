import { Component } from '@angular/core';
import { Item } from '../shared/item';
import { Loan } from '../shared/loan';
import { LoanService } from '../shared/loan.service';
@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss']
})
export class ManagePage {
  loans: Loan[];
  constructor(private loanService: LoanService) { 
    this.loanService.getAllLoans().subscribe(data =>{
      console.log(data)
      this.loans = data;
    })
  }


approve(l:Loan){
  console.log(l)
  this.loanService.approve(l);
}

reject(l:Loan){
  this.loanService.reject(l);
}


}
