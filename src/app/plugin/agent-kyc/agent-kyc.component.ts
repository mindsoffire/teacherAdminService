import { Component, OnInit, ViewChild } from '@angular/core';

// import { VERSION } from '@angular/material';

import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LibService } from '../../services/lib.service';

import { MatSnackBar } from '@angular/material';

// import { f_encDecUsrName } from 'ajlearnjs';

export interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-agent-kyc',
  templateUrl: './agent-kyc.component.html',
  styleUrls: ['./agent-kyc.component.css']
})
export class AgentKycComponent implements OnInit {
  @ViewChild('proptyPic') proptyPic;

  constructor(
    private router: Router, public tokenSvc: AuthService, public libSvc: LibService, private snackbar: MatSnackBar
  ) { }

  kyc: any;
  names = [];
  listOwners; crudList; defaultOwner;
  myuser_listing = [];

  chgOnePicOnly = false;

  gender: Gender[] = [
    { value: 'M', viewValue: 'Male' },
    { value: 'F', viewValue: 'Female' }
  ];

  getUsrCMSListRet = '';

  async ngOnInit() {
    this.myuser_listing = [{ teacherName: '..readonly if offline.' }];
    this.chgOnePicOnly = false;
    this.listOwners = document.querySelector('#listOwners');
    this.crudList = document.querySelector('#crudList');

    (localStorage.getItem('kyc')) ? this.tokenSvc.loggedIn = true : this.tokenSvc.loggedIn = false;



    if (this.tokenSvc.loggedIn) {
      this.kyc = JSON.parse(localStorage.getItem('kyc'));
      console.log({ kyc: this.kyc });
      await this.libSvc.getList()
      console.log('getUsrCMSListRet: ', this.getUsrCMSListRet = await this.libSvc.getList());
      this.libSvc.myuserlist_owners = localStorage.getItem('myuserlist_owners') ? JSON.parse(localStorage.getItem('myuserlist_owners')) : this.libSvc.myuserlist_owners;
      console.log({ 'this.libSvc.myuserlist_owners[0].teacherName': this.libSvc.myuserlist_owners[0].teacherName });
      // this.defaultOwner = this.libSvc.myuserlist_owners[1].teacherName ? this.libSvc.myuserlist_owners[1].teacherName : this.libSvc.myuserlist_owners[0].teacherName;
      this.defaultOwner = this.libSvc.myuserlist_owners[0].teacherName ? this.libSvc.myuserlist_owners[0].teacherName : 'Pls wait..';
      console.log({ 'this.defaultOwner': this.defaultOwner });
      console.log(this.listOwners.value = this.defaultOwner);
      /* if (this.libSvc.libUsrCMSServerOn) */ this.updateCRUDList();
      await this.updateListOwners();
      if (this.kyc.clntCreatDate && this.kyc.clntValKYCDate == null) {
        // copy usrKYC into tokenSvc-services-model-storage from localStorage 'kyc' if already logged in & no ajax 'results'
        this.tokenSvc.usrKYC = this.kyc;
        if (this.kyc.encLegalNameID) {
          // this.names = this.tokenSvc.userNames(this.kyc.encLegalNameID);
          // for (let i = 1; i < this.names.length; i++) {
          //   this.names[0] = this.names[0] + ' ' + this.tokenSvc.f_rotjaF(this.names[i]);
          // }
          // this.tokenSvc.usrKYCDisp.legalNameID = this.names[0];
        }
        this.tokenSvc.usrKYCDisp.emailID = (this.kyc.encEmailID) ? this.tokenSvc.f_rotjaF(this.kyc.encEmailID) : "..no email.";
        this.libSvc.usrCode = `${this.tokenSvc.usrKYCDisp.emailID}@AJSchool`;
        this.kyc.usrCode = this.libSvc.usrCode;
        if (this.kyc.encEmailID) this.tokenSvc.usrKYCDisp.emailID = this.tokenSvc.f_rotjaF(this.kyc.encEmailID);
        if (this.kyc.encLegalIDCred) this.tokenSvc.usrKYCDisp.legalIDCred = this.tokenSvc.f_rotjaF(this.kyc.encLegalIDCred);
        if (this.kyc.encMobileNumID) this.tokenSvc.usrKYCDisp.mobileNumID = this.tokenSvc.f_rotjaF(this.kyc.encMobileNumID);
        if (this.kyc.encDOB) this.tokenSvc.usrKYCDisp.DOB = this.tokenSvc.f_rotjaF(this.kyc.encDOB);
        if (this.kyc.address.encPostStreet) this.tokenSvc.usrKYCDisp.address.postStreet = this.tokenSvc.f_rotjaF(this.kyc.address.encPostStreet);
        if (this.kyc.address.encPostUnit) this.tokenSvc.usrKYCDisp.address.postUnit = this.tokenSvc.f_rotjaF(this.kyc.address.encPostUnit);
        if (this.kyc.bank.encBankName) this.tokenSvc.usrKYCDisp.bank.bankName = this.tokenSvc.f_rotjaF(this.kyc.bank.encBankName);
        if (this.kyc.bank.encBankAcct) this.tokenSvc.usrKYCDisp.bank.bankAcct = this.tokenSvc.f_rotjaF(this.kyc.bank.encBankAcct);
        console.log({ 'tokenSvc.usrKYC @ agent-kyc': this.tokenSvc.usrKYC });
      }
    } else this.router.navigate(['/plugin']);   // route to /plugin compon if 'kyc' not exist in localStorage

  }

  step = 2;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
    this.step++;
  }
  prevStep() {
    this.step--;
    this.step--;
  }

  updateKYC() {
    if (this.tokenSvc.usrKYCDisp.legalNameID)
      this.tokenSvc.usrKYC.encLegalNameID = this.tokenSvc.f_encDecUsrName(this.tokenSvc.usrKYCDisp.legalNameID).encFullName;
    this.tokenSvc.usrKYC.encMobileNumID = this.tokenSvc.f_rotajF(this.tokenSvc.usrKYCDisp.mobileNumID);
    this.tokenSvc.usrKYC.encDOB = this.tokenSvc.f_rotajF(this.tokenSvc.usrKYCDisp.DOB);
    console.log({ 'tokenSvc.usrKYC @ agent-kyc-update': this.tokenSvc.usrKYC });
    fetch(`${this.tokenSvc.SERVER}/api/KYCupdate`, {
      method: 'post',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      // mode: 'cors',
      // cache: 'no-cache',
      body: JSON.stringify(this.tokenSvc.usrKYC)
    }).then(result => result.json()).catch(err => console.log({ err }))
      .then(result => {
        console.log({ result });
        if (result.usrKYC) {
          localStorage.setItem('kyc', JSON.stringify(result.usrKYC));
          this.tokenSvc.usrKYC = result.usrKYC;
          if (this.tokenSvc.usrKYC.encEmailID) {
            [this.tokenSvc.usrKYCDisp.legalNameID, this.tokenSvc.usrKYCDisp.emailID] = [this.tokenSvc.f_encDecUsrName(this.tokenSvc.usrKYC.encLegalNameID || '', -1).fullName, this.tokenSvc.f_rotjaF(this.tokenSvc.usrKYC.encEmailID)];
          }
          if (this.tokenSvc.usrKYC.encLegalIDCred) this.tokenSvc.usrKYCDisp.legalIDCred = this.tokenSvc.f_rotjaF(this.tokenSvc.usrKYC.encLegalIDCred);
          if (this.tokenSvc.usrKYC.encMobileNumID) this.tokenSvc.usrKYCDisp.mobileNumID = this.tokenSvc.f_rotjaF(this.tokenSvc.usrKYC.encMobileNumID);
          if (this.tokenSvc.usrKYC.address.encPostStreet) this.tokenSvc.usrKYCDisp.address.postStreet = this.tokenSvc.f_rotjaF(this.tokenSvc.usrKYC.address.encPostStreet);
          if (this.tokenSvc.usrKYC.address.encPostUnit) this.tokenSvc.usrKYCDisp.address.postUnit = this.tokenSvc.f_rotjaF(this.tokenSvc.usrKYC.address.encPostUnit);
          if (this.tokenSvc.usrKYC.bank.encBankName) this.tokenSvc.usrKYCDisp.bank.bankName = this.tokenSvc.f_rotjaF(this.tokenSvc.usrKYC.bank.encBankName);
          if (this.tokenSvc.usrKYC.bank.encBankAcct) this.tokenSvc.usrKYCDisp.bank.bankAcct = this.tokenSvc.f_rotjaF(this.tokenSvc.usrKYC.bank.encBankAcct);
          this.libSvc.getList();
        }
      });
  }

  logout = () => {
    localStorage.removeItem('kyc');
    if (localStorage.getItem('mylist')) localStorage.removeItem('mylist');
    if (localStorage.getItem('myuser_listing')) localStorage.removeItem('myuser_listing');
    if (localStorage.getItem('myuserlist_owners')) localStorage.removeItem('myuserlist_owners');
    this.tokenSvc.loggedIn = false;
    localStorage.setItem('loggedIn', JSON.stringify(this.tokenSvc.loggedIn));
    this.router.navigate(['/plugin']);
  }

  resetPW = () => {
    localStorage.removeItem('kyc');
    if (localStorage.getItem('mylist')) localStorage.removeItem('mylist');
    if (localStorage.getItem('myuser_listing')) localStorage.removeItem('myuser_listing');
    if (localStorage.getItem('myuserlist_owners')) localStorage.removeItem('myuserlist_owners');
    this.tokenSvc.pwReset = true;
    this.tokenSvc.loggedIn = false;
    localStorage.setItem('loggedIn', JSON.stringify(this.tokenSvc.loggedIn));
    this.router.navigate(['/plugin', this.tokenSvc.usrKYCDisp.emailID]);
  }

  async updateCRUDList(source = this.defaultOwner) {
    this.localUrl = '';
    this.chgOnePicOnly = false;
    console.log({ source, 'fetch': `${this.libSvc.SERVER}/api/search-list?crud=${source}` });
    // this.defaultOwner = source;
    const res = await fetch(`${this.libSvc.SERVER}/api/search-list?crud=${source}&key1=${this.kyc.encEmailID}&key2=${this.kyc.hshPW}`);
    console.log({ updateCRUDList: res, source });
    const json = res.ok == true ? await res.json() : { clientServer: 'unreachable' };
    console.log({ json });

    if (json.clientServer != 'unreachable') {
      this.libSvc.usrCMSDataNotCached = false;
      this.myuser_listing = json.usrAstList;
      this.myuser_listing.sort((a, b) => { return a.stName - b.stName });
      console.log({ updateCRUDList: json, 'myuser_listing': this.myuser_listing });
      localStorage.setItem(`myuser_listing`, JSON.stringify(this.myuser_listing));
    } else {
      this.libSvc.usrCMSDataNotCached = true;
      let snack = this.snackbar.open('try again when clientServer reachable', 'OK');
      snack.onAction().subscribe(() => snack.dismiss());
      setTimeout(() => snack.dismiss(), 3000);
    }

  }

  async updateListOwners() {
    // this.listOwners.innerHTML = 'Pls wait..';
    this.listOwners.innerHTML = this.libSvc.myuserlist_owners
      .map(owner => `<option value="${owner.teacherName}">${owner.teacherName}</option>`).join('\n');
  }

  localUrl;
  localUrlBack: any[];
  localUrlBank: any[];
  picSrc: string = '';

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0] && this.localUrl == '') {
      this.chgOnePicOnly = true;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async sendNewPic(propOwnerName, propID) {
    let fileBrowser = this.proptyPic.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let formData = new FormData();
      console.log(fileBrowser.files[0]);
      formData.append('proptyPic', fileBrowser.files[0], `${propOwnerName}-id${propID}`);
      formData.append('encEmailID', this.tokenSvc.usrKYC.encEmailID);
      formData.append('hshPW', this.tokenSvc.usrKYC.hshPW);
      formData.append('crud', propOwnerName);
      formData.append('propID', propID);
      console.log({ formData });
      console.log({ propOwnerName, 'thisLocalUrl': this.localUrl })
      const res = await fetch(`${this.libSvc.SERVER}/images`, {
        method: 'post',
        body: formData
      }).then(result => result.json())
        .catch(err => console.log({ err })).then(result => {
          console.log({ result });
          if (result.usrAstList) {
            this.myuser_listing = result.usrAstList;
            this.myuser_listing.sort((a, b) => { return a.stName - b.stName });
            localStorage.setItem('myuser_listing', JSON.stringify(this.myuser_listing));
          }

        });
    }
  }

  addToList() {
    for (let i = 0; i < this.libSvc.myuserlist_owners.length; i++) {
      if (this.libSvc.myuserlist_owners[i].teacherName == 'ADD NEW') this.updateCRUDList(this.libSvc.myuserlist_owners[i].teacherName);
    }
    this.updateListOwners();
    // this.updateCRUDList(this.libSvc.myuserlist_owners[0].teacherName);
  }

  async saveAll(teacherName, del?: boolean, propID?) {
    // this.libSvc.myuserlist_owners.length;   
    if (del && teacherName != 'ADD NEW') {
      console.log(`deleting property at propID: ${propID}`);
      for (let i = 0; i < this.myuser_listing.length; i++) {
        if (this.myuser_listing[i].id == propID) this.myuser_listing[i].is_deleted = true;
      }
    } else if (del && teacherName == 'ADD NEW') {
      return;
    }
    if (!del) this.myuser_listing[0].teacherName = this.myuser_listing[0].teacherName == 'ADD NEW' ? 'You didn\'t change me' : this.myuser_listing[0].teacherName;
    console.log({ teacherName, 'this.myuser_listing': this.myuser_listing });
    if (this.myuser_listing[0].teacherName == 'You didn\'t change me') {
      const snack = this.snackbar.open('Please change client teacherName', 'ok');
      snack
        .onAction()
        .subscribe(() => snack.dismiss());

      setTimeout(() => {
        snack.dismiss();
      }, 2000);
      return;
    }

    return await fetch(`${this.libSvc.SERVER}/api/register`, {
      method: 'post',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify({ 'myUsrUpdateList': this.myuser_listing, teacherName, 'encEmailID': this.tokenSvc.usrKYC.encEmailID, 'hshPW': this.tokenSvc.usrKYC.hshPW })
    }).then(result => result.json())
      .catch(err => console.log({ err })).then(async result => {
        console.log({ result });
        if (result.myUsrUpdateList) {
          this.myuser_listing = result.myUsrUpdateList;
          this.myuser_listing.sort((a, b) => { return a.stName - b.stName });
          console.log({ 'myuser_listing': this.myuser_listing });
          localStorage.setItem(`myuser_listing`, JSON.stringify(this.myuser_listing));
        }

        await this.libSvc.getList();
        await this.updateListOwners();
        localStorage.getItem('myuserlist_owners') ? this.libSvc.myuserlist_owners = JSON.parse(localStorage.getItem('myuserlist_owners')) : this.libSvc.myuserlist_owners;
        this.defaultOwner = this.libSvc.myuserlist_owners[1].teacherName ? this.libSvc.myuserlist_owners[1].teacherName : this.libSvc.myuserlist_owners[0].teacherName;
        console.log({ 'this.defaultOwner': this.defaultOwner });
        console.log(this.listOwners.value = this.defaultOwner);
        this.updateCRUDList();
        // await this.updateListOwners();
      });


  }


  /*   async previewFiles(event: any) {
      const preview = document.querySelector('#preview');
      const previewDesc = document.querySelector('#previewDesc');
      const files = event.target.files;
  
      function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          const reader = new FileReader();
  
          reader.addEventListener(
            'load',
            function () {
              const image = new Image();
              image.height = 100;
              image.title = file.name;
              image.src = this.result;
              preview.appendChild(image); // you can append only proper DOM nodes.
              previewDesc.innerHTML += file.name + '*'; // i added this. Next to try is appendChild(document.createTextNode(file.name))
              // and then appendChild as LI to UL.
            },
            false
          );
  
          reader.readAsDataURL(file);
        }
      }
  
      if (files) {
        [].forEach.call(files, readAndPreview); // to check out what's with the empty array calling func readAndPreview on files : file[].
      }
    } */



}





