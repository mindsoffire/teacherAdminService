import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AotCompiler } from '../../../node_modules/@angular/compiler';

// import { Observable } from 'rxjs-compat';
// import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Propty } from '../shared-models/propty';

@Injectable()
export class LibService {

    readonly SERVER = this.tokenSvc.SERVER;        // app and cms server

    showcaseTitle = 'SEARCHED LISTING RESULTS';
    usrSearch = {
        searchType: '', searchPrice: 0, typeOfProptySelected: 'none', districtSelected: 'none', bedrmsSelected: 'none'
    }
    searchList: any; myuserlist_owners: any;
    browseAllFlag = false; specSearch = false;
    listId = 0; usrCode = '';
    kyc: any;
    proptiesCol: AngularFirestoreCollection<Propty>;
    afslist: any[];
    listShow: boolean = false;
    libUsrCMSServerOn: boolean = true;
    usrCMSDataNotCached: boolean = false;

    constructor(public tokenSvc: AuthService, private afs: AngularFirestore) { }


    async getList() {
        if (this.tokenSvc.loggedIn) {
            if (localStorage.getItem('kyc')) {
                this.kyc = JSON.parse(localStorage.getItem('kyc'))
            } else {
                this.kyc.encEmailID = null;
                this.kyc.hshPW = null;
            }
            console.log('libSvc.usrList @ libSvc :');
            console.log({ 'this.usrSearch': this.usrSearch, 'this.tokenSvc.usrKYC': this.tokenSvc.usrKYC });
            return await fetch(`${this.SERVER}/api/search-list?searchType=${this.usrSearch.searchType}&searchPrice=${this.usrSearch.searchPrice}&typeOfProptySelected=${this.usrSearch.typeOfProptySelected}&districtSelected=${this.usrSearch.districtSelected}&bedrmsSelected=${this.usrSearch.bedrmsSelected}&key1=${this.kyc.encEmailID}&key2=${this.kyc.hshPW}`)
                .then(result => result.json())
                .catch(err => {
                    this.libUsrCMSServerOn = false;
                    console.log({ err, libUsrCMSServerOn: this.libUsrCMSServerOn });
                    return 'libUsrCMSServerOn is false';
                }).then(result => {
                    console.log({ result });
                    if (result == 'libUsrCMSServerOn is false') {
                        console.log({ 'libUsrCMSServerOn@noValidResultReturn': this.libUsrCMSServerOn });
                        return 'exitLibSvcDetectedUsrCMSServerNotReachable';
                    } else this.libUsrCMSServerOn = true;

                    if (result.usrList) {
                        this.searchList = result.usrList;
                        this.searchList.sort((a, b) => { return a.BUA - b.BUA });
                        localStorage.setItem('mylist', JSON.stringify(this.searchList));
                    }
                    if (result.myuserlist_owners) {
                        this.myuserlist_owners = result.myuserlist_owners;
                        this.myuserlist_owners.sort((a, b) => {
                            a.teacherName = a.teacherName.toUpperCase(); b.teacherName = b.teacherName.toUpperCase();
                            return (a.teacherName < b.teacherName) ? -1 : (a.teacherName > b.teacherName) ? 1 : 0;
                        });
                        console.log({ 'this.myuserlist_owners': this.myuserlist_owners });
                        localStorage.setItem('myuserlist_owners', JSON.stringify(this.myuserlist_owners));
                    }

                    return 'usrCMSServerGood';
                });
        };


    }
}