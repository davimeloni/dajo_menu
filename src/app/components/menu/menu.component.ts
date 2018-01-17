import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  account: any;
  accountId: string;
  items: any[];
  displayItens: any[] = [];
  categories: any;
  selectedCategory: any;
  selectedCategoryType: string;
  selectedC = 0;
  selectedCT = 0;


  constructor(private menuService: MenuService, private router: Router, zone: NgZone) {

  }

  ngOnInit() {

    const findId = localStorage.getItem('accountId');
    console.log(findId);
    this.menuService.getAccountById(findId).subscribe((accountData) => {
      this.account = accountData;
      if (this.account.status === 'Closed') {
        this.account = {};
        this.router.navigate(['']);
      }
      console.log(this.account);
    });

    this.getData();
  }

  getData() {
    this.menuService.getItens().subscribe((itemsData) => {
      console.log(itemsData);
      this.items = itemsData;

      this.menuService.getCategories().subscribe((categoriesData) => {
        console.log(categoriesData);
        this.categories = categoriesData;
        this.selectedCategory = this.categories[0];
        this.selectedCategoryType = this.selectedCategory.categorytype[0];
        console.log(this.selectedCategoryType);

        this.items.forEach(item => {
          if (item.categorytype === this.selectedCategoryType) {
            this.displayItens.push(item);
          }
        });

      });
    });
  }

  // Open Account
  openAccount() {
    this.router.navigate(['account']);
  }
  // categories changes -----------------------------------------------------------------
  changeCategory(selectedCategory, index) {
    this.displayItens = [];

    this.selectedCategory = selectedCategory;
    this.selectedCategoryType = selectedCategory.categorytype[0];

    this.items.forEach(item => {
      if (item.categorytype === this.selectedCategoryType) {
        console.log(this.selectedCategoryType);
        this.displayItens.push(item);
      }
    });

    this.selectedC = index;
    this.selectedCT = 0;
    console.log(this.selectedCategoryType);
  }

  changeCategoryType(selectedCategoryType, index) {
    this.selectedCategoryType = selectedCategoryType;

    this.displayItens = [];

    this.items.forEach(item => {
      if (item.categorytype === this.selectedCategoryType) {
        console.log(this.selectedCategoryType);
        this.displayItens.push(item);
      }
    });

    this.selectedCT = index;
  }

}
