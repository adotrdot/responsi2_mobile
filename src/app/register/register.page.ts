import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {
  username: any;
  password: any;
  confirmPassword: any;

  constructor(public _apiService: ApiService, private route: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.username && this.password && this.confirmPassword) {
      if (this.username != "" && this.password != "" && this.confirmPassword != "") {
        if (this.password == this.confirmPassword) {
          let data = {
            username: this.username,
            password: this.password
          }
          this._apiService.post(data, "registrasi.php").subscribe({
            next: (hasil: any) => {
              if (hasil) {
                alert("Berhasil registrasi");
                this.route.navigate(['/login']);
              } else {
                alert("Gagal registrasi!");
              }
            },
            error: (err: any) => {
              alert("Gagal registrasi");
            }
          });
        } else {
          alert("Password Konfirmasi Tidak Sama!")
        }
      }
    }
  }
}
