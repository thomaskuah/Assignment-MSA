import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Item } from '../shared/item';
import { Loan } from '../shared/loan';
import { LoanService } from '../shared/loan.service';
@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss'],
})
export class ManagePage {
  private myToast: any;
  assets= []
  currentSort = "earliest" // initialized first time value
  loans: Loan[];
  constructor(private loanService: LoanService,  public toast: ToastController) {
  
    this.loadData(this.currentSort) // run function when upon first enter
    this.loadAssets();
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



  approve(l) {
    var dataToUpdate = [] 
    var itemNot = []
    let isPass = true;
    l.items.forEach(e => { // loop item

      // check current asset is avail
      let check = this.assets.find(({ item }) => item === e.id)
    
      dataToUpdate.push()
      if (e.quantity <= check.count) {
        let calculate = check.count - e.quantity

        let obj = {item: check.id, count: calculate}  // create obj to store id of asset and count left for updating on firebase

        dataToUpdate.push(obj)
        console.log('got asset')
      } else {
        itemNot.push(check.item)
        // if one or more item no not avail / not enough
        isPass = false;
      }
    });

  
    var msg = ""
    if (isPass) {
      // if all item pass and avail update count item and approve
      dataToUpdate.map(e => {
        this.loanService.updateAssetCount(e.item, e.count)

      })
      this.loanService.approve(l)

    } else {
      // if not enough dun approve and throw a toast msg
      // concat item that are lower or eql thn 4
      console.log(itemNot)
      itemNot.map(e => {
        console.log(e )
        msg = msg.concat(e + " ")
      })
      console.log(msg)
      this.showToast("Not enough " +msg.toLowerCase() )
    }
  }

  reject(l: Loan) {
    console.log(l.items);
    this.loanService.reject(l);
  }

  // detect changes in filter whn on selection
  handleChange(e) {
    console.log(e.detail.value);
    this.currentSort = e.detail.value // retrieve value and replace
    this.loadData(e.detail.value)
  }


  loadAssets() {
    // load all items
    this.loanService.getCurrentAssets().subscribe((data) => {
      var lowItem = ""
      console.log(data)
      this.assets = data 

      // to concat string with item that are low in invt
      data.map(e => {
        if (e.count <= 4) {
          lowItem = lowItem.concat(e.item + " ")
        }
      })
   
      this.showToast("Please restock inventory for " + lowItem)
    });
  }


  getColor(color) {
    if (color <= 4) {
      return 'danger'
    } else if (color <= 10) {
      return "warning"
    } else {
      return "success"
    }
  }


  showToast(msg) {
    this.myToast = this.toast.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    }).then((toastData) => {
      toastData.present();
    });
  }
}
