import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routedComponents } from './app-routing.module';

import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { LibService } from "./services/lib.service";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { A11yModule } from "@angular/cdk/a11y";
import { BidiModule } from "@angular/cdk/bidi";
import { ObserversModule } from "@angular/cdk/observers";
import { OverlayModule } from "@angular/cdk/overlay";
import { PlatformModule } from "@angular/cdk/platform";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
  MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSnackBar,
  MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule
} from "@angular/material";

import { SlideshowModule } from 'ng-simple-slideshow';

import  * as jwt from 'jwt-simple';
import { encode, decode } from 'jwt-simple';

@NgModule({
  exports: [
    // CDK
    A11yModule, BidiModule, ObserversModule, OverlayModule,
    PlatformModule, PortalModule, ScrollDispatchModule, CdkStepperModule,
    CdkTableModule,

    // Material
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
    MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
    MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
    MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
    MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    routedComponents
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule, MaterialModule, SlideshowModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  providers: [AuthService, LibService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(update: SwUpdate, push: SwPush, snackbar: MatSnackBar) {
    update.available.subscribe(update => {
      console.log('update available');

    });
    const snack = snackbar.open('Update Available', 'Reload');

    snack
      .onAction()
      .subscribe(() => window.location.reload());

    setTimeout(() => {
      snack.dismiss();
    }, 12000);

    push.messages.subscribe(msg => {
      console.log(msg);
      snackbar.open(JSON.stringify(msg));
    });

    const key = 'BM3HKGwU713mpPHTMie7tvENr4F-kBV21xx6FYlt2stEesL-hm9i18UoTJ0WC2rPIplmkRinSNZxO9M1u6d5eUw';
    push.requestSubscription({ serverPublicKey: key })
      .then(pushSubscription => console.log(pushSubscription.toJSON()));
  }
}
