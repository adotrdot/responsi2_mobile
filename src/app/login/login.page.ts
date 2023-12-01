import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  username: any;
  password: any;

  constructor(public _apiService: ApiService, private route: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
      if (this.username != "" && this.password != "") {
        let data = {
          username: this.username,
          password: this.password
        }

        this._apiService.post(data, "login.php").subscribe({
          next: (hasil: any) => {
            if (hasil) {
              this.setUsername();
              console.log("Berhasil login");
              this.route.navigate(['/home']);
            } else {
              alert("Gagal login");
            }
          },
          error: (err: any) => {
            console.log("Gagal login");
          }
        });
      } else {
        console.log("Gagal login");
      }
    }
  }

  goToRegister() {
    this.route.navigate(['/register'])
  }

  setUsername = async () => {
    await Preferences.set({
      key: 'username',
      value: this.username,
    });
  };
}
