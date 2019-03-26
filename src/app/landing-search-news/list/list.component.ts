import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LibService } from '../../services/lib.service';

// import { Observable } from 'rxjs-compat';
// import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Propty } from '../../shared-models/propty';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  kycYes;
  waitGif = './assets/animatedGif_metallicRotor.gif'; listShow = false;

  constructor(private router: Router, public libSvc: LibService, private afs: AngularFirestore, public tokenSvc: AuthService) { }

  async ngOnInit() {
    console.log('ngOnInit in list.ts, loggedIn, browseAllFlag, specSearch: ', this.tokenSvc.loggedIn, this.libSvc.browseAllFlag, this.libSvc.specSearch);


    if (localStorage.getItem('kyc')) this.kycYes = true;
    if (this.libSvc.browseAllFlag) {
      // await this.getAllList();
      this.libSvc.listShow = false;
      this.libSvc.proptiesCol = this.afs.collection('teacher-student-master', ref => ref.orderBy('stName', 'asc').limit(100));
      // this.propties = this.proptiesCol.valueChanges()
      // this.libSvc.propties = this.libSvc.proptiesCol.snapshotChanges()
      //   .pipe(map(actions => {
      //     console.log({ actions });
      //     // this.libSvc.afslist.sort((a, b) => { return a.stName - b.stName });
      //     // console.log({ 'this.libSvc.afslist': this.libSvc.afslist });
      //     // localStorage.setItem('afslist', JSON.stringify(this.libSvc.afslist));
      //     return actions.map(action => {
      //       const data = action.payload.doc.data() as Propty
      //       const id = action.payload.doc.id;
      //       // this.libSvc.afslist.push(action.payload.doc.data());
      //       console.log({ data, id });
      //       return { id, ...data };
      //     });
      //   }));  
      this.libSvc.proptiesCol.ref.onSnapshot({ includeMetadataChanges: true }, snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') console.log({ 'change.doc.data()': change.doc.data() });
          var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
        });
      });
      this.libSvc.afslist = [];
      this.libSvc.proptiesCol.ref.get().then(filter => {
        filter.forEach(doc => { if (doc.data().is_deleted != true) this.libSvc.afslist.push(<Propty>doc.data()) });
        this.libSvc.afslist.sort((a, b) => { return a.stName - b.stName });
        localStorage.setItem('afslist', JSON.stringify(this.libSvc.afslist));
      });
      this.libSvc.listShow = true;
    }

  }

  showDetails(listId: number, usrCode) {
    // console.log('> listId: %d', listId);
    this.libSvc.listId = listId; this.libSvc.usrCode = usrCode;
    console.log('showDetails in list.ts');
    console.log({ 'listId': this.libSvc.listId, 'usrCode': this.libSvc.usrCode });
    this.router.navigate(['/details']);
  }

  async getAllList() {
    const res = await fetch(`${this.libSvc.SERVER}/api/search-list?crud=getAll`);
    const json = await res.json();
    this.libSvc.searchList = json.usrList;
    this.libSvc.searchList.sort((a, b) => { return a.stName - b.stName });
    localStorage.setItem('mylist', JSON.stringify(this.libSvc.searchList));
  }

  createList(listItem) {
    return `
    <div class="art">
        <a href = "${listItem.price}" target = "_blank" style="text-decoration: none">
            <h3><large><strong>${listItem.stName}</strong></large></h3>
            <img class="art-img" src = "{{this.libSvc.SERVER}}/public/images/{{listItem.listPhotoIcon}}">
            <p style="margin-top: 2px"><small>${listItem.district}</small></p>
        </a><hr>
    </div>
    `;
  }

}
