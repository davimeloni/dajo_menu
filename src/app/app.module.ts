import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuService } from './services/menu.service';
import { HomeComponent } from './components/home/home.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// not using
import { Facebook } from '@ionic-native/facebook';
import { PipePipe } from './pipe/pipe.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ModalComponent } from './components/modal/modal.component';
import { AdditemComponent } from './components/additem/additem.component';
import { AccountComponent } from './components/account/account.component';


// Initialize Firebase
  export const firebaseConfig = {
    apiKey: "AIzaSyD1YE_BlGjaYcKBLRPFD-TTngGuscZtuNw",
    authDomain: "facebooklogin-c3cab.firebaseapp.com",
    databaseURL: "https://facebooklogin-c3cab.firebaseio.com",
    projectId: "facebooklogin-c3cab",
    storageBucket: "facebooklogin-c3cab.appspot.com",
    messagingSenderId: "284333780147"
  };

const appRoutes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    PipePipe,
    ModalComponent,
    AdditemComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
