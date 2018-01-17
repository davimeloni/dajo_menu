import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  public visible = false;
  public visibleAnimate = false;
  item: any;
  comments: string;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
  }

  public show(item: any): void {
    this.item = item;
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  addItem(item, comments) {
    let accountId = localStorage.getItem('accountId');

    let account = {
      _id: accountId,
      orderedItens: {
        orderedItem: item,
        status: 'Cart',
        comments: comments
      }
    };

    console.log(account);

    this.menuService.addItemAccount(account)
      .subscribe((res) => {
        console.log(res);
        this.comments = '';
      });

    this.hide();

  }

}
