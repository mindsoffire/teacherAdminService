import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LibService } from '../services/lib.service';

// import { Observable } from 'rxjs-compat';
// import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Propty } from '../shared-models/propty';

import { MatDialog, MatDialogRef } from '@angular/material';

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-search-news',
  templateUrl: './landing-search-news.component.html',
  styleUrls: ['./landing-search-news.component.css']
})
export class LandingSearchNewsComponent implements OnInit {

  name = 'AJ\'s AnyObject Library Search';
  searchType = 'buy'; searchPrice = '';
  typeOfProptySelected = 'landed'; districtSelected = 'none'; bedrmsSelected = 'none';

  usrname: string = undefined;

  constructor(private router: Router, public tokenSvc: AuthService, public libSvc: LibService, private afs: AngularFirestore) { }
  async ngOnInit() {

    this.tokenSvc.getAuthState()
      .subscribe((usr) => {
        if (usr) {
          // User is signed in.
          console.log('Logged In ', usr.email);
          console.log({ usr });
          this.usrname = usr.displayName ? usr.displayName : usr.email;
        } else {
          console.log('Not Logged In');
          this.usrname = undefined;
        }
      });

    if(!localStorage.getItem('kyc')) this.router.navigate(['/plugin']);

  }

  async searchAll() {
    this.libSvc.browseAllFlag = false; this.libSvc.specSearch = true;

    if (this.libSvc.specSearch) {
      console.log('in specSearch searchAll(): offerType, price, proptyType, district, numBedRms -- ', this.searchType, this.searchPrice, this.typeOfProptySelected, this.districtSelected, this.bedrmsSelected)
      this.libSvc.proptiesCol = this.afs.collection('teacher-student-master');

      this.libSvc.listShow = await false; this.libSvc.afslist = [];
      if (localStorage.getItem('afslist')) await localStorage.removeItem('afslist');

      await this.libSvc.proptiesCol.ref.where('offerType', '==', this.searchType).where('proptyType', '==', this.typeOfProptySelected)/* .where('district', '==', this.districtSelected).where('numBedRms', '==', this.bedrmsSelected) */.where('price', '<=', this.searchPrice).orderBy('price').get().then(filter => {
        filter.forEach(doc => { if ((doc.data().district == this.districtSelected) && (doc.data().numBedRms == this.bedrmsSelected) && (doc.data().is_deleted != true)) this.libSvc.afslist.push(<Propty>doc.data()) });
        this.libSvc.afslist.sort((a, b) => { return a.BUA - b.BUA });
        localStorage.setItem('afslist', JSON.stringify(this.libSvc.afslist));
      });
      this.libSvc.listShow = true;
    }
    this.router.navigate(['/list']);
  }

  logout() {
    this.tokenSvc.loggedIn = false;
    // this.tokenSvc.usrKYC = {};
    // localStorage.removeItem('kyc');
    // if (localStorage.getItem('mylist')) localStorage.removeItem('mylist');
    // if (localStorage.getItem('myuser_listing')) localStorage.removeItem('myuser_listing');
    // if (localStorage.getItem('myuserlist_owners')) localStorage.removeItem('myuserlist_owners');
    this.router.navigate(['/']);
  }

  googleLogin() {
    // const loginRef = this.dialog.open(LandingSearchNewsComponent, {width: '350px', height: '500px'});
    this.tokenSvc.googleLogin();
    // this.dialogRef.close();
  }

}
