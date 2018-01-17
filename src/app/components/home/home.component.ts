import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// import { Observable } from 'rxjs/Rx';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  customer: any;
  account: any;
  tables = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  table: number;
  selectedTable: number;
  isLogged = false;

  constructor(private zone: NgZone, private router: Router, private afAuth: AngularFireAuth,
    private menuService: MenuService) {
    // tslint:disable-next-line:no-trailing-whitespace
    
  }

  ngOnInit() {
  }


  FacebookLoginWeb() {
    this.selectedTable = null;
    this.account = {};

    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(result => {
        //console.log('isso ẽ o ress');
        console.log(result);
        this.customer = {
          username: result.user.displayName,
          email: result.user.email,
          OauthId: result.user.uid,
          kind: 'Customer'
        };
        console.log(this.customer);
        this.isLogged = true;

        this.menuService.getOrCreateCustomer(this.customer).subscribe((customerData) => {
          this.customer = customerData;
          console.log('customer getted or created');
          console.log(this.customer);
        });
      });

  }

  FacebookLoginWithFirebase() {
    this.account = {};
    this.selectedTable = null;

    const provider = new firebase.auth.FacebookAuthProvider();

    this.afAuth.auth.signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {
        //console.log('vem aqui?');
        this.isLogged = true;
        this.customer = {
          username: result.user.displayName,
          email: result.user.email,
          OauthId: result.user.uid,
          kind: 'Customer'
        };
        console.log(this.customer);

        this.menuService.getOrCreateCustomer(this.customer).subscribe((customerData) => {
          this.customer = customerData;
          console.log('customer getted or created');
          console.log(this.customer);
        });

      }).catch(function (error) {
        alert(JSON.stringify(error.message));
      });
    });
  }

  loginFirebaseWOAngular() {
    this.selectedTable = null;
    this.account = {};
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {

        this.customer = {
          username: result.user.displayName,
          email: result.usesr.email,
          OauthId: result.user.uid,
          kind: 'Customer'
        };

      setTimeout(() => {
        this.menuService.getOrCreateCustomer(this.customer).subscribe((customerData) => {
          this.isLogged = true;
          this.customer = customerData;
          console.log('customer getted or created');
          alert(JSON.stringify(this.customer));
        });
      }, 3000);

      }).catch(function(error) {
        const errorCode = error.name;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    });

  }

  signOutFirebase() {
    this.afAuth.auth.signOut();
    this.isLogged = false;
    this.selectedTable = null;
    this.account = {};
    this.router.navigate(['']);
  }

  createAccount() {
    this.account = {
      customer: this.customer,
      table: this.selectedTable,
      status: 'Opened'
    };
    console.log(this.account);
    this.menuService.createAccount(this.account).subscribe((data) => {
      console.log('response do create');
      this.account = {};
      console.log(data);
      this.account = data;
      console.log('account: ' + this.account);
      // return true;
    },
      error => {
        console.log('Error creating account');
      }
    );

  }

  accessMenu() {
    localStorage.setItem('accountId', this.account._id);
    this.router.navigate(['menu']);
  }

  navigateTest() {
    this.router.navigate(['menu']);
  }

}



/*



  onFacebookLoginClick() {
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        console.log('Logged in.');
        console.log(response);
        FB.api('/me', function (apires) {
          console.log(apires);
        });
      }
      // tslint:disable-next-line:one-line
      else {
        FB.login(function (loginres) {
          if (loginres.authResponse) {
            console.log('fetching data');
            FB.api('/me', function (apires) {
              console.log('Good to see you, ' + apires.name);
            });
          }
          // tslint:disable-next-line:one-line
          else {
            console.log('User cancelled login or did not fully authorize.');
          }
        });
      }
    });
  }

    FBLogin() {
    const _self = this;
    FB.login(function (response) {
      if (response.authResponse) {
        FB.api('/me', function (responseapi) {
          _self.zone.run(() => {
            _self.customer = responseapi;
            _self.isLogged = true;
          });
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email', []).then(profile => {
        this.customer = {email: profile['email'] , username: profile['name']};
        this.isLogged = true;
      });
    });
  }

  */
