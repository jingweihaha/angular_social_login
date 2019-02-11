declare const gapi: any;
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit {

  public auth2: any;
  public email: any;
  public signed: any = false;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '49444869682-obpm2fgpfliq07rlubetpvv0ng5b1iet.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.signed = true;
        this.cdRef.detectChanges();
        this.email = profile.getEmail();
        sessionStorage.setItem("email", this.email);      
        console.log("User " + this.email + "Signed In");
        //YOUR CODE HERE
        let profile_string = JSON.stringify(profile);
        sessionStorage.setItem("profile_string", profile_string);
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  public googlelogout() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.getAuthInstance();
      this.auth2.signOut().then(function() {
        //let tmp = JSON.parse(sessionStorage.getItem("profile_string"));
        //console.log("User "+ tmp.getName() +" signed out");
        //debugger;
        console.log("User " + sessionStorage.getItem("email") + " Signed out");
        //sessionStorage.clear();
        //debugger;
      });
      this.signed = false;
      this.cdRef.detectChanges();
      //this.attachSignout(document.getElementById('googleBtn2'));
    });
  }

  // public attachSignout(element) {

  //   debugger;
  //   // this.auth2.attachClickHandler(element, {},
  //   //   (googleUser) => {

  //   //     let profile = googleUser.getBasicProfile();
  //   //     console.log('Token || ' + googleUser.getAuthResponse().id_token);
  //   //     console.log('ID: ' + profile.getId());
  //   //     console.log('Name: ' + profile.getName());
  //   //     console.log('Image URL: ' + profile.getImageUrl());
  //   //     console.log('Email: ' + profile.getEmail());
  //   //     //YOUR CODE HERE


  //   //   }, (error) => {
  //   //     alert(JSON.stringify(error, undefined, 2));
  //   //   });
  //   this.auth2.attachClickHandler(element, {},
  //     (googleUser) => {

  //       let profile = googleUser.getBasicProfile();
  //       console.log('Token || ' + googleUser.getAuthResponse().id_token);
  //       console.log('ID: ' + profile.getId());
  //       console.log('Name: ' + profile.getName());
  //       console.log('Image URL: ' + profile.getImageUrl());
  //       console.log('Email: ' + profile.getEmail());
  //       //YOUR CODE HERE


  //     }, (error) => {
  //       alert(JSON.stringify(error, undefined, 2));
  //     });
  // }

ngAfterViewInit(){
      this.googleInit();
}

}
