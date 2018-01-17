import { Component, OnInit, NgZone } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public visible = false;
  private visibleAnimate = false;
  account: any;
  findId: any;
  cartItens: any[] = [];
  itensToOrder: any[] = [];
  kitchenItens: any[] = [];
  deliveredItens: any[] = [];
  confirmCloseAccountMessage = '';
  confirmOrderMessage = '';
  askedToClose = 'Asked To Close';


  constructor(private menuService: MenuService, private router: Router, zone: NgZone) { }

  ngOnInit() {
    this.findId = localStorage.getItem('accountId');
    console.log(this.findId);
    this.menuService.getAccountById(this.findId).subscribe((accountData) => {
      this.account = accountData;
      console.log(this.account);
      console.log(this.account.price);

      if (this.account.status === 'Closed') {
        this.account = {};
        this.router.navigate(['']);
      }

      this.account.orderedItens.forEach(item => {
        if (item.status === 'Cart') {
          this.cartItens.push(item);
        } else if (item.status === 'Delivered') {
          this.deliveredItens.push(item);
        } else {
          this.kitchenItens.push(item);
        }
      });
    });
  }

  backMenu() {
    this.router.navigate(['menu']);
  }

  removeItem(itemToRemove) {

    console.log(itemToRemove);
    console.log('removing item...');
    const removeData = {
      accountId: this.account._id,
      itemId: itemToRemove._id,
      item: itemToRemove
    };

    this.menuService.removeItemAccount(removeData).subscribe(
      (res) => {
        console.log(res);

        this.cartItens = [];
        this.kitchenItens = [];
        this.deliveredItens = [];
        this.findId = localStorage.getItem('accountId');
        console.log(this.findId);
        this.menuService.getAccountById(this.findId).subscribe((accountData) => {
          this.account = accountData;
          console.log(this.account);
          console.log(this.account.price);
          this.account.orderedItens.forEach(item => {
            if (item.status === 'Cart') {
              this.cartItens.push(item);
              console.log(this.cartItens);
            } else if (item.status === 'Ordered') {
              this.kitchenItens.push(item);
            }
          });
        });

      });
  }

  orderItens() {
    this.confirmOrderMessage = 'May we send your items to the kitchen?';
  }

  orderItensConfirm() {
    console.log(this.cartItens);
    this.itensToOrder = this.cartItens;
    this.itensToOrder.forEach(item => {
      item.status = 'Ordered';
    });
    const orderData = {
      accountId: this.account._id,
      orderedItens: this.itensToOrder
    };
    console.log(orderData);
    this.menuService.updateItensAccount(orderData)
      .subscribe((res => {
        //console.log('chegou aqui?');
        console.log(res);

        this.cartItens = [];
        this.kitchenItens = [];
        this.deliveredItens = [];
        this.findId = localStorage.getItem('accountId');
        console.log(this.findId);
        this.menuService.getAccountById(this.findId).subscribe((accountData) => {
          this.account = accountData;
          console.log(this.account);
          console.log(this.account.price);
          this.account.orderedItens.forEach(item => {
            if (item.status === 'Cart') {
              this.cartItens.push(item);
              console.log(this.cartItens);
            } else if (item.status === 'Ordered') {
              this.kitchenItens.push(item);
            }
          });
        });
        this.confirmOrderMessage = '';
      }));
  }

  askToClose() {
    this.confirmCloseAccountMessage = 'The waiter will come to close your account, ok?';
  }

  askToCloseConfirm() {
    this.account.status = 'Asked To Close';

    this.menuService.askToCloseAccount(this.account)
      .subscribe((res) => {
        console.log(res);
        this.confirmCloseAccountMessage = '';
      });
  }

  cancelConfirm() {
    this.confirmCloseAccountMessage = '';
    this.confirmOrderMessage = '';
  }

}
