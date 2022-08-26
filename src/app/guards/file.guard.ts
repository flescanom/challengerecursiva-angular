import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MemberService } from '../services/member.service';


@Injectable({
  providedIn: 'root'
})
export class FileGuard implements CanActivate {
  
  constructor( private _member: MemberService) {}

  canActivate(): boolean {
    if( this._member.getLocalStorage()) {
      return true;
    } else {
      return false;
    }
  }
  
}
