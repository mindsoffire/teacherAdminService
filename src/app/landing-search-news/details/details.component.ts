import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LibService } from '../../services/lib.service';
import { AuthService } from '../../services/auth.service';

// import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  listId = 0; usrCode = '';
  item = [];
  // private listId$: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public libSvc: LibService,
    private tokenSvc: AuthService) { }

  async ngOnInit() {

    this.item = [];

    this.listId = this.activatedRoute.snapshot.params['listId'];
    this.usrCode = this.activatedRoute.snapshot.params['usrCode'];
    console.log({ 'params': this.activatedRoute.snapshot.params });
    console.log({ 'params/listId': this.activatedRoute.snapshot.params['listId'] });
    console.log({ 'params/usrCode': this.activatedRoute.snapshot.params['usrCode'] });


    this.libSvc.listId = this.activatedRoute.snapshot.params['listId'] ? this.listId : this.libSvc.listId;
    this.libSvc.usrCode = this.activatedRoute.snapshot.params['usrCode'] ? this.usrCode : this.libSvc.usrCode;

    console.log({ 'listId': this.libSvc.listId, 'usrCode': this.libSvc.usrCode });
    console.log({ 'this.libSvc.searchList': this.libSvc.searchList })

    // if (this.tokenSvc.loggedIn) {
    //   for (let i = 0; i < this.libSvc.searchList.length; i++) {
    //     if (this.libSvc.searchList[i].id == this.libSvc.listId && this.libSvc.searchList[i].usrCode == this.libSvc.usrCode) {
    //       console.log({ 'searchlist index': i });
    //       this.item.push(this.libSvc.searchList[i]);
    //     }
    //   }
    // } else {
    for (let i = 0; i < this.libSvc.afslist.length; i++) {
      if (this.libSvc.afslist[i].id == this.libSvc.listId && this.libSvc.afslist[i].usrCode == this.libSvc.usrCode) {
        console.log({ 'afslist index': i });
        this.item.push(this.libSvc.afslist[i]);
      }
    }
    // }

    console.log({ 'item': this.item[0] });

  }




  ngOnDestory() {

  }


}
