import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileItem } from '../../models/file-item';
import { MemberService } from '../../services/member.service';
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

  constructor(public members:MemberService,
              private _route: Router) {
    
   }

  ngOnInit(): void {
    localStorage.removeItem('members');
  }

  uploadFile() {
    localStorage.clear();
    document.querySelector('input')?.click()
  }

  handleUpload(e: any) {
    this.file = new FileItem(e.target.files[0]);
  }

  sendFile() {
    this.members.readFile(this.file?.file)
      .then(() => {
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
    this.file = undefined;
  }

}
