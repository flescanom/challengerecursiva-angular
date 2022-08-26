import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileItem } from 'src/app/models/file-item';
import { SociosService } from 'src/app/services/socios.service';
import { faPlusCircle, faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file?: FileItem;
  isOnDropZone = false;
  faPlusCircle = faPlusCircle;
  faBan = faBan;

  constructor(public socios:SociosService,
              private _route: Router) {
    
   }

  ngOnInit(): void {
    localStorage.removeItem('socios');
  }

  uploadFile() {
    localStorage.clear();
    console.log('Se presionó el boton');
    document.querySelector('input')?.click()
  }

  handleUpload(e: any) {
    this.file = new FileItem(e.target.files[0]);
  }

  sendFile() {
    this.socios.readFile(this.file?.file)
      .then(() => {
        console.log('Arhivo Cargado');
        this._route.navigate(['/information']);
      }).catch((error) => {
        console.log(error);
      })
  }

  showData() {
    this._route.navigate(['/information']);
  }

  cargaDeArchivo(file: FileItem) {
    this.file = file;
  }

  removeFile() {
    console.log('borrar archivo');
    this.file = undefined;
  }

}
