import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MenuService {

  baseUrl: string;

  constructor(public http: Http) {
    console.log('Menu Serivce connected');
    this.baseUrl = 'https://restaurant-webapp.herokuapp.com/';
  }


  // -------------------- ACCOUNT SERVICES ---------------------------------
  createAccount(account) {
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(account);

    console.log('account before JSON.strngify');
    console.log(account);
    console.log('body after JSON.stringify');
    console.log(body);
    return this.http.post(this.baseUrl + 'account', account).map((res: Response) => res.json());
  }

  addItemAccount(account) {
    console.log('chegou aqui?' + account._id);
    // headers

    return this.http.put(this.baseUrl + 'account/' + account._id + '/additem', account)
      .map(res => res.json());
  }

  getAccountById(accountId) {
    return this.http.get(this.baseUrl + 'account/' + accountId)
      .map(res => res.json());
  }

  removeItemAccount(removeData) {
    return this.http.put(this.baseUrl + 'account/' + removeData.accountId + '/deleteitem/' + removeData.itemId, removeData)
      .map(res => res.json());
  }

  updateItensAccount(orderData) {
    return this.http.put(this.baseUrl + 'account/' + orderData.accountId + '/updateitens', orderData)
      .map(res => res.json());
  }

  askToCloseAccount(account) {
    return this.http.put(this.baseUrl + 'account/' + account._id, account)
      .map(res => res.json());
  }

  // ------------------- ITEM SERVICES ----------------------------------
  getItens() {
    return this.http.get(this.baseUrl + 'activeitens')
      .map(res => res.json());
  }

  getCategories() {
    return this.http.get(this.baseUrl + 'category')
      .map(res => res.json());
  }

  // ------------------ USER SERVICES -------------------------

  getOrCreateCustomer(customer) {
    // headers

    return this.http.post(this.baseUrl + 'user', customer)
      .map(res => res.json());
  }

}
