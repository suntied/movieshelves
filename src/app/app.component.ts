import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyBfYRhAl7GLHl1BImIw2Fr_c1QHU23oxi0",
      authDomain: "movieshelves-832d4.firebaseapp.com",
      databaseURL: "https://movieshelves-832d4.firebaseio.com",
      projectId: "movieshelves-832d4",
      storageBucket: "movieshelves-832d4.appspot.com",
      messagingSenderId: "603727669035",
      appId: "1:603727669035:web:7de72ea8fed211ab6b876e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
