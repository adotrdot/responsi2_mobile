import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  dataKontak: any = [];
  modal_tambah = false;
  modal_edit = false;
  username: any;
  id_kontak: any;
  nama: any;
  nomor_hp: any;

  constructor(public _apiService: ApiService, private modal: ModalController, private route: Router) {}

  ngOnInit() {
    this.isLogin();
  }

  isLogin = async () => {
    const { value } = await Preferences.get({ key: 'username' });
    if (value == null) {
      this.route.navigate(['/login']);
    } else {
      this.username = value;
    }
    this.getKontak();
  };

  logout = async () => {
    await Preferences.remove({ key: 'username' });
    this.isLogin();
  };

  getKontak() {
    let data = {
      username: this.username
    }
    this._apiService.tampil(data, "tampil.php").subscribe({
      next: (res: any) => {
        console.log("sukses", res);
        this.dataKontak = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  reset_model() {
    this.id_kontak = null;
    this.nomor_hp = "";
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id_kontak = idget;
    console.log(this.id_kontak);
    this.ambilKontak(this.id_kontak);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  ambilKontak(id: any) {
    this._apiService.lihat(id, "/lihat.php?id=").subscribe({
      next: (hasil: any) => {
        console.log("sukses", hasil);
        let kontak = hasil;
        this.id_kontak = kontak.id;
        this.nama = kontak.nama;
        this.nomor_hp = kontak.nomor_hp;
      },
      error: (error: any) => {
        console.log("Gagal ambil data");
      }
    })
  }

  tambahKontak() {
    if (this.nama != "" && this.nomor_hp != "") {
      let data = {
        username: this.username,
        nama: this.nama,
        nomor_hp: this.nomor_hp,
      }
      this._apiService.post(data, "tambah.php").subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log("Berhasil tambah kontak");
          this.getKontak();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log("Gagal tambah kontak");
        }
      });
    } else {
      console.log("Gagal tambah kontak");
    }
  }

  editKontak() {
    let data = {
      id: this.id_kontak,
      nama: this.nama,
      nomor_hp: this.nomor_hp
    }
    this._apiService.edit(data, "/edit.php").subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getKontak();
        console.log("Berhasil edit kontak");
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log("Gagal edit kontak");
      }
    })
  }

  hapusKontak(id: any) {
    this._apiService.hapus(id, "/hapus.php?id=").subscribe({
      next: (res: any) => {
        console.log("sukses", res);
        this.getKontak();
        console.log("Berhasil hapus data");
      },
      error: (error: any) => {
        console.log("Gagal");
      }
    })
  }
}
