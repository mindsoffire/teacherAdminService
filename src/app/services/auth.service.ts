import { Injectable } from '@angular/core';

import { Observable } from 'rxjs-compat/Observable';
// import { Subject } from 'rxjs-compat/Subject';
// import { map, catchError } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';   // to figure out why not 'firebase/app'
import { auth } from 'firebase-admin';

// import { f_encDecUsrName } from 'ajlearnjs';

interface AuthResponse {
  status: string;
  success: string;
  token: string;
}

interface JWTResponse {
  status: string;
  success: string;
  usr: any;
}




@Injectable()
export class AuthService {

  private authState: Observable<firebase.User>;
  private currentUsr: firebase.User = null;

  constructor(public afAuth: AngularFireAuth) {
    console.log('this.authState: ', this.authState);
    this.authState = this.afAuth.authState;
    this.authState.subscribe(usr => this.currentUsr = usr ? usr : null);
    localStorage.setItem('authstate', JSON.stringify(this.authState));
    localStorage.setItem('authuser', JSON.stringify(this.currentUsr));
  }

  // readonly SERVER = "https://ajafsnode.serveo.net";  
  readonly SERVER = "http://localhost:6707";

  data: any;
  status: string = ''; loggedIn: boolean = false; pwReset: boolean = false;

  usrKYC: IUsrKYC = {
    encEmailID: null, hshPW: null,
    subDate: null, clntCreatDate: null, clntValKYCDate: null,
    encLegalNameID: null, encLegalIDCred: null,
    photo: {
      photoIDFrontURL: null, photoIDBackURL: null, photoIDsURLsDated: null, recentFaceVerifiedIDURL: null, recentFaceVerifiedIDURLDated: null
    },
    gender: null, encDOB: null, nationality: null,
    address: {
      postCode: null, encPostStreet: null, postBlock: null, encPostUnit: null
    },
    encMobileNumID: null,
    bank: {
      encBankName: null, bankScanStatemtURL: null, bankScanStatemtURLDated: null, encBankScanStatemtBal: null, encBankAcct: null
    },
    textAnnotNotaryOthers: null, clntNotes: null,
    isDeleted: null
  };

  usrKYCDisp: IUsrKYCDisp = {
    emailID: null, legalNameID: null, legalIDCred: null, DOB: null,
    address: {
      postStreet: null, postUnit: null
    },
    mobileNumID: null,
    bank: {
      bankName: null, bankScanStatemtBal: null, bankAcct: null
    }
  };

  usrAst: any;

  auth = async (emailPWRstPWObj: object) => {
    return await fetch(`${this.SERVER}/api/plugin`,
      {
        method: 'post',
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(emailPWRstPWObj)
      })
      .then(result => result.json()).catch(err => console.log({ err }))
      .then(result => {
        this.data = result; console.log({ status: this.status = this.data.status });

        if (this.data.nexToken) localStorage.setItem('nexToken', JSON.stringify(this.data.nexToken));
        this.loggedIn = this.data.nexToken ? true : false;
        localStorage.setItem('loggedIn', JSON.stringify(this.loggedIn));

        console.log({ "this.data": this.data });

        if (this.data.usrKYC) {
          this.usrKYC = this.data.usrKYC;

          if (this.data.usrKYC.encEmailID) {
            [this.usrKYCDisp.legalNameID, this.usrKYCDisp.emailID] = [this.f_encDecUsrName(this.data.usrKYC.encLegalNameID || '', -1).fullName, this.f_rotjaF(this.usrKYC.encEmailID)];
          }
          if (this.data.usrKYC.encLegalIDCred) this.usrKYCDisp.legalIDCred = this.f_rotjaF(this.data.usrKYC.encLegalIDCred);
          if (this.data.usrKYC.encMobileNumID) this.usrKYCDisp.mobileNumID = this.f_rotjaF(this.data.usrKYC.encMobileNumID);
          if (this.data.usrKYC.address.encPostStreet) this.usrKYCDisp.address.postStreet = this.f_rotjaF(this.data.usrKYC.address.encPostStreet);
          if (this.data.usrKYC.address.encPostUnit) this.usrKYCDisp.address.postUnit = this.f_rotjaF(this.data.usrKYC.address.encPostUnit);
          if (this.data.usrKYC.bank.encBankName) this.usrKYCDisp.bank.bankName = this.f_rotjaF(this.data.usrKYC.bank.encBankName);
          if (this.data.usrKYC.bank.encBankAcct) this.usrKYCDisp.bank.bankAcct = this.f_rotjaF(this.data.usrKYC.bank.encBankAcct);
          console.log({ 'usrKYC @ signup or subscribe': this.usrKYC });
          localStorage.setItem('kyc', JSON.stringify(this.usrKYC));
          localStorage.setItem('kyc_display', JSON.stringify(this.usrKYCDisp));

        }

        if (this.data.usrAst) localStorage.setItem('assets', JSON.stringify(this.data.usrAstList));

        return { usrKYCDisp: this.usrKYCDisp, nexToken: this.data.nexToken }
      });
  }

  // google Login.
  getAuthState() {
    return this.authState;
  }
  logOut() {
    this.afAuth.auth.signOut();
  }
  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // my fns inside ajlearnjs NPM to be importable here later.

  f_rotajF = str => str.replace(/[A-Za-z0-9]/g, (ch) => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".charAt(
    "MNBVCXZasdfghjklPOIUYTREWQASDFGHJKLmnbvcxzpoiuytrewq6172839405".indexOf(ch)));

  f_rotjaF = str => str.replace(/[A-Za-z0-9]/g, (ch) => "MNBVCXZasdfghjklPOIUYTREWQASDFGHJKLmnbvcxzpoiuytrewq6172839405".charAt(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".indexOf(ch)));

  f_rotajG = str => str.replace(/[A-Za-z0-9]/g, (ch) => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".charAt(
    "HJKLmnbvcxzpoiuytrewq6172839405MNBVCXZasdfghjklPOIUYTREWQASDFG".indexOf(ch)));

  f_rotjaG = str => str.replace(/[A-Za-z0-9]/g, (ch) => "HJKLmnbvcxzpoiuytrewq6172839405MNBVCXZasdfghjklPOIUYTREWQASDFG".charAt(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".indexOf(ch)));

  userNames(fullName: string): string {
    let name = fullName.trim().split(/[@ ,]+/).map((word, idx) => idx != 0 ? this.f_rotjaF(word) : word).join(' ');
    return name;
  }

  f_capitalize = (str, type = 'none') =>
    type == 'words' ?
      str.trim().split(' ').filter(word => word).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
      :
      type == 'sentences' ?
        this.f_capitalize(str.trim().split('. ').map(sentence => sentence.trim()).map(sentence => sentence[0].toUpperCase() + sentence.substring(1)).join('. '))
        :
        type == 'allCaps' ?
          str.trim().split(' ').filter(word => word).join(' ').toUpperCase() : str.trim().split(' ').filter(word => word).join(' ');

  f_encDecUsrName = (str, pos = 0) => {
    return pos == 0 ?

      str.indexOf('@') != -1 ?
        str.trim().replace(/@/, '⌡⌠').split('⌡⌠')
          .map(
            (word, idx, src,
              usrName = src[0],
              domain = src[1] ? this.f_rotajF(src[1]) : ''
            ) =>
              ({ usrName, domain, encEmail: usrName + '@' + domain }))[0]
        :
        str.indexOf(' ') != -1 ?
          this.f_capitalize(str.trim(), 'words')
            .replace(/ /, '⌡⌠').split('⌡⌠')
            .map(
              (word, idx, src,
                firstName = src[0],
                otherName = src[1] ? this.f_rotajF(src[1]) : ''
              ) =>
                ({ firstName, otherName, encFullName: firstName + (otherName ? ' ' : '') + otherName }))[0]
          :
          str
      :
      str.indexOf('@') != -1 ?
        str.trim().split('@')
          .map(
            (word, idx, src,
              usrName = src[0],
              domain = src[1] ? this.f_rotjaF(src[1]) : ''
            ) =>
              ({ usrName, domain, encEmail: usrName + '@' + domain }))[0]
        :
        str.indexOf(' ') != -1 ?
          str.trim().replace(/ /, '⌡⌠').split('⌡⌠')
            .map(
              (word, idx, src,
                firstName = src[0],
                otherName = src[1] ? this.f_rotjaF(src[1]) : ''
              ) =>
                ({ firstName, otherName, fullName: firstName + (otherName ? ' ' : '') + otherName }))[0]
          :
          str
  }

  /*
   * A JavaScript implementation of the SHA256 hash function.
   *
   * FILE:	sha256.js
   * VERSION:	0.8
   * AUTHOR:	Christoph Bichlmeier <informatik@zombiearena.de>
   *
   * NOTE: This version is not tested thoroughly!
   *
   * Copyright (c) 2003, Christoph Bichlmeier
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions
   * are met:
   * 1. Redistributions of source code must retain the above copyright
   *    notice, this list of conditions and the following disclaimer.
   * 2. Redistributions in binary form must reproduce the above copyright
   *    notice, this list of conditions and the following disclaimer in the
   *    documentation and/or other materials provided with the distribution.
   * 3. Neither the legalName of the copyright holder nor the names of contributors
   *    may be used to endorse or promote products derived from this software
   *    without specific prior written permission.
   *
   * ======================================================================
   *
   * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ''AS IS'' AND ANY EXPRESS
   * OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHORS OR CONTRIBUTORS BE
   * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
   * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
   * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
   * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
   * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

  /* SHA256 logical functions */
  rotateRight(n, x) {
    return ((x >>> n) | (x << (32 - n)));
  }
  choice(x, y, z) {
    return ((x & y) ^ (~x & z));
  }
  majority(x, y, z) {
    return ((x & y) ^ (x & z) ^ (y & z));
  }
  sha256_Sigma0(x) {
    return (this.rotateRight(2, x) ^ this.rotateRight(13, x) ^ this.rotateRight(22, x));
  }
  sha256_Sigma1(x) {
    return (this.rotateRight(6, x) ^ this.rotateRight(11, x) ^ this.rotateRight(25, x));
  }
  sha256_sigma0(x) {
    return (this.rotateRight(7, x) ^ this.rotateRight(18, x) ^ (x >>> 3));
  }
  sha256_sigma1(x) {
    return (this.rotateRight(17, x) ^ this.rotateRight(19, x) ^ (x >>> 10));
  }
  sha256_expand(W, j) {
    return (W[j & 0x0f] += this.sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
      this.sha256_sigma0(W[(j + 1) & 0x0f]));
  }

  /* Hash constant words K: */
  K256 = new Array(
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  );

  /* global arrays */
  ihash; count; buffer;
  sha256_hex_digits = "0123456789abcdef";

  /* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters:
  overflow) */
  safe_add(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  /* Initialise the SHA256 computation */
  sha256_init() {
    this.ihash = new Array(8);
    this.count = new Array(2);
    this.buffer = new Array(64);
    this.count[0] = this.count[1] = 0;
    this.ihash[0] = 0x6a09e667;
    this.ihash[1] = 0xbb67ae85;
    this.ihash[2] = 0x3c6ef372;
    this.ihash[3] = 0xa54ff53a;
    this.ihash[4] = 0x510e527f;
    this.ihash[5] = 0x9b05688c;
    this.ihash[6] = 0x1f83d9ab;
    this.ihash[7] = 0x5be0cd19;
  }

  /* Transform a 512-bit message block */
  sha256_transform() {
    var a, b, c, d, e, f, g, h, T1, T2;
    var W = new Array(16);

    /* Initialize registers with the previous intermediate value */
    a = this.ihash[0];
    b = this.ihash[1];
    c = this.ihash[2];
    d = this.ihash[3];
    e = this.ihash[4];
    f = this.ihash[5];
    g = this.ihash[6];
    h = this.ihash[7];

    /* make 32-bit words */
    for (var i = 0; i < 16; i++)
      W[i] = ((this.buffer[(i << 2) + 3]) | (this.buffer[(i << 2) + 2] << 8) | (this.buffer[(i << 2) + 1]
        << 16) | (this.buffer[i << 2] << 24));

    for (var j = 0; j < 64; j++) {
      T1 = h + this.sha256_Sigma1(e) + this.choice(e, f, g) + this.K256[j];
      if (j < 16) T1 += W[j];
      else T1 += this.sha256_expand(W, j);
      T2 = this.sha256_Sigma0(a) + this.majority(a, b, c);
      h = g;
      g = f;
      f = e;
      e = this.safe_add(d, T1);
      d = c;
      c = b;
      b = a;
      a = this.safe_add(T1, T2);
    }

    /* Compute the current intermediate hash value */
    this.ihash[0] += a;
    this.ihash[1] += b;
    this.ihash[2] += c;
    this.ihash[3] += d;
    this.ihash[4] += e;
    this.ihash[5] += f;
    this.ihash[6] += g;
    this.ihash[7] += h;
  }

  /* Read the next chunk of data and update the SHA256 computation */
  sha256_update(data, inputLen) {
    var i, index, curpos = 0;
    /* Compute number of bytes mod 64 */
    index = ((this.count[0] >> 3) & 0x3f);
    var remainder = (inputLen & 0x3f);

    /* Update number of bits */
    if ((this.count[0] += (inputLen << 3)) < (inputLen << 3)) this.count[1]++;
    this.count[1] += (inputLen >> 29);

    /* Transform as many times as possible */
    for (i = 0; i + 63 < inputLen; i += 64) {
      for (var j = index; j < 64; j++)
        this.buffer[j] = data.charCodeAt(curpos++);
      this.sha256_transform();
      index = 0;
    }

    /* Buffer remaining input */
    for (j = 0; j < remainder; j++)
      this.buffer[j] = data.charCodeAt(curpos++);
  }

  /* Finish the computation by operations such as padding */
  sha256_final() {
    var index = ((this.count[0] >> 3) & 0x3f);
    this.buffer[index++] = 0x80;
    if (index <= 56) {
      for (var i = index; i < 56; i++)
        this.buffer[i] = 0;
    } else {
      for (var i = index; i < 64; i++)
        this.buffer[i] = 0;
      this.sha256_transform();
      for (var i = 0; i < 56; i++)
        this.buffer[i] = 0;
    }
    this.buffer[56] = (this.count[1] >>> 24) & 0xff;
    this.buffer[57] = (this.count[1] >>> 16) & 0xff;
    this.buffer[58] = (this.count[1] >>> 8) & 0xff;
    this.buffer[59] = this.count[1] & 0xff;
    this.buffer[60] = (this.count[0] >>> 24) & 0xff;
    this.buffer[61] = (this.count[0] >>> 16) & 0xff;
    this.buffer[62] = (this.count[0] >>> 8) & 0xff;
    this.buffer[63] = this.count[0] & 0xff;
    this.sha256_transform();
  }

  /* Split the internal hash values into an array of bytes */
  sha256_encode_bytes() {
    var j = 0;
    var output = new Array(32);
    for (var i = 0; i < 8; i++) {
      output[j++] = ((this.ihash[i] >>> 24) & 0xff);
      output[j++] = ((this.ihash[i] >>> 16) & 0xff);
      output[j++] = ((this.ihash[i] >>> 8) & 0xff);
      output[j++] = (this.ihash[i] & 0xff);
    }
    return output;
  }

  /* Get the internal hash as a hex string */
  sha256_encode_hex() {
    var output = new String();
    for (var i = 0; i < 8; i++) {
      for (var j = 28; j >= 0; j -= 4)
        output += this.sha256_hex_digits.charAt((this.ihash[i] >>> j) & 0x0f);
    }
    return output;
  }

  /* Main function: returns a hex string representing the SHA256 value of the
  given data */
  sha256_digest(data) {
    this.sha256_init();
    this.sha256_update(data, data.length);
    this.sha256_final();
    return this.sha256_encode_hex();
  }

  /* test if the JS-interpreter is working properly */
  sha256_self_test() {
    return this.sha256_digest("message digest") ==
      "f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
  }


}

export interface IUsrKYC {
  encEmailID: null | string,
  hshPW: null | string,
  subDate?: null | string,
  clntCreatDate: null | string,
  clntValKYCDate?: null | string,
  encLegalNameID: null | string,
  encLegalIDCred?: null | string
  photo?: {
    photoIDFrontURL?: null | string,
    photoIDBackURL?: null | string,
    photoIDsURLsDated?: null | string,
    recentFaceVerifiedIDURL?: null | string,
    recentFaceVerifiedIDURLDated?: null | string
  },
  gender?: null | string,
  encDOB?: null | string,
  nationality?: null | string,
  address?: {
    postCode?: null | string,
    encPostStreet?: null | string,
    postBlock?: null | string,
    encPostUnit?: null | string
  },
  encMobileNumID?: null | string,
  bank?: {
    encBankName?: null | string,
    bankScanStatemtURL?: null | string,
    bankScanStatemtURLDated?: null | string,
    encBankScanStatemtBal?: null | string,
    encBankAcct?: null | string
  },
  textAnnotNotaryOthers?: null | string,
  clntNotes?: null | string,
  isDeleted?: null | string,
  isLoggedIn?: null | string
};

export interface IUsrKYCDisp {
  emailID: null | string,
  legalNameID: null | string,
  legalIDCred?: null | string,
  DOB: null | string
  address?: {
    postStreet?: null | string,
    postUnit?: null | string
  },
  mobileNumID: null | string,
  bank?: {
    bankName?: null | string,
    bankScanStatemtBal?: null | string,
    bankAcct?: null | string
  },
}
