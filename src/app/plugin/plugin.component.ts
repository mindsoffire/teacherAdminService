import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, IUsrKYC, IUsrKYCDisp } from '../services/auth.service';   // Show classes u can use but 'unused greyed-out'.

@Component({
  selector: 'app-plugin',                       // Can be tag with '', class w '.cls', or attr w '[attr]'.
  templateUrl: './plugin.component.html',       // Can be inline with <page-router-outlet></page-router-outlet>.
  styleUrls: ['./plugin.component.css']         // Is an array of styling rules.
})
export class PluginComponent implements OnInit {

  constructor(private router: Router, public tokenSvc: AuthService, private actdRouter: ActivatedRoute) { }

  hide = true;                                                            // Needed for pw privacy.
  signUpOrLogInOrRstPW: string = '';
  emailPHolder = 'Enter your email'; pwPHolder = 'Enter your password';
  keyPHolder = 'Enter your agentKey';                                     // Removed from HTML but kept here for turnkey 'extraCode needed' implementation ref.

  data: any;
  pwtries = 0; pwreset = this.tokenSvc.pwReset ? true : false; rstPW = null;        // On EVERY reload.

  ngOnInit() {  // Done ONCE after loading.
    if (localStorage.getItem('nexToken') && localStorage.getItem('kyc')) this.router.navigate(['/agent-kyc']);
    if (this.tokenSvc.loggedIn) {
      this.router.navigate(['/agent-kyc']);
    } else {
      this.tokenSvc.status = this.actdRouter.snapshot.params['email'] ? '..resetPW for ' + this.actdRouter.snapshot.params['email'] : '..hello there.';
      if (!this.actdRouter.snapshot.params['email']) {
        this.tokenSvc.pwReset = false; this.pwreset = false;
        this.tokenSvc.usrKYCDisp.emailID = '';
      }
    }
  }

  async plugin(signUpOrLogInOrRstPW: string, emailID: string, pw: string) {

    this.tokenSvc.pwReset = signUpOrLogInOrRstPW === 'resetPW' ? false : this.tokenSvc.pwReset;

    await this.tokenSvc.auth(
      {
        encEmailID: this.tokenSvc.f_rotajF(emailID),
        hshPW: pw === undefined ? pw : this.tokenSvc.sha256_digest(pw),
        rstPW: signUpOrLogInOrRstPW === 'resetPW' ? this.tokenSvc.sha256_digest(pw) : null
      })
      .then(authObj => {
        if (!authObj.nexToken && this.tokenSvc.status == '..please log in with the right password.' && !this.tokenSvc.pwReset) {
          this.pwtries++;
          this.pwPHolder = `..tried password ${this.pwtries == 1 ? 'once' : this.pwtries + ' times'}.`
          if (this.pwtries > 3) {
            this.pwreset = true;
            this.pwPHolder = "Enter your NEW password to RESET it, or try again"
          }
        }
        console.log({ authObj, status: this.tokenSvc.status });
        if (authObj.usrKYCDisp.emailID && authObj.nexToken === JSON.parse(localStorage.getItem('nexToken'))) this.router.navigate(['/agent-kyc']);
      })
  }
}




